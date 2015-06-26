// provides functionality required by
// components to access sy API
module.exports = function(_, LoadingState, LoadMoreBtn){

  return {

    // note that a sySession object must be in scope in 
    // order for this method to function properly
    syGet: function(request, callbackFn) {
      this.syRequest(request, callbackFn, "GET")
    },

    // note that a sySession object must be in scope in 
    // order for this method to function properly
    syPost: function(request, callbackFn) {
      this.syRequest(request, callbackFn, "POST")
    },

    // note that a sySession object must be in scope in 
    // order for this method to function properly
    syPut: function(request, callbackFn) {
      this.syRequest(request, callbackFn, "PUT")
    },

    // note that a sySession object must be in scope in 
    // order for this method to function properly
    syDelete: function(request, callbackFn) {
      this.syRequest(request, callbackFn, "DELETE")
    },

    apiError: function(error, request) {
      var self = this;
      if((error.ecode=="401" || error.ecode==401) && request.userRequest) {
        alert("You were logged out. Press OK to log back in.");
        window.location = self.props.getLoginPath();
      } else {
        console.log("An error was returned from the Synereo API for request: ", request);
        console.error(error);
      } 
    },

    invokerError: function(error, request) {
      console.log("Error communicating with Synereo endpoint for request: ", request);
      console.error("Error msg: ", error);
    },

    // note that a sySession object must be in scope in 
    // order for this method to function properly
    syRequest: function(request, callbackFn, method) {
      var self = this;

      request.serviceReqMethod = method;
      request.fingerprint = window.sy_fp;

      // check if in sandbox mode, and access sy API directly
      // otherwise, return the default request object
      switch(self.props.devContext) {
        case "sandbox":
          var url = self.props.urls+request.serviceReqUrl+"?api_token="+self.props.urls;
          if(request.serviceParams) {
            var serialize = function(obj) {
              var str = [];
              for(var p in obj)
                if (obj.hasOwnProperty(p)) {
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
              return str.join("&");
            }
            url = url+"&"+serialize(request.serviceParams);
          }
          if(request.userRequest) {
            url = url+"&user_id="+sySession.session.userId;
          }
          return $.ajax({
            url: url,
            type: request.serviceReqMethod,
            data: (request.serviceReqBody ? JSON.stringify(request.serviceReqBody) : ''),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
              // if using pagination
              if(self.usePagination) {
                self.currentPage = data.pagination.page;
                self.willHaveNextPage(data, request.serviceParams.size);
              }

              callbackFn({response: data});
            },
            error: function(data) {
              self.invokerError(data, request);
            }
          });
          break;
      }
    },

    /**
      Extended Functionality
      the functions below provide functionality
      higher-level than simple API access
      **/

    // the following method exposes a simple "load more"
    // button that allows for pagination; pass the fn
    // used to initiate the paginated request
    //
    // you can then include this function inside render()
    renderLoadMoreBtn: function(requestFn) {
      var self = this;
      return LoadMoreBtn(_.extend({}, self.props, {requestFn: requestFn}));
    },

    // this function doesn't need to be here, but serves
    // as a reminder that pagination is calculated automatically
    willHaveNextPage: function(response, requestSize) {
      var self = this;
      var totalPages = (response.count!==0 ? Math.ceil(response.count / requestSize) : 0);

      // should we show the load more button?
      if(self.currentPage >= totalPages) {
        $('.btn-loadmore').hide();
      } else {
        $('.btn-loadmore').show();
      }
      // hide the loader
      $('.loader-pagination').hide();
    },

    // the following functions wrap the render() method
    // and provide a loading state if an isLoaded state
    // variable is present and is a boolean
    //
    // note: you will need to provide an isLoading state
    // variable in order for it to work
    renderLoading: function() {
      var self = this;
      var load = LoadingState(_.extend({}, self.props));
      return load;
    },

    // some tips: make sure to handle the isLoading state
    // in functions using API calls
    componentWillMount: function() {
      var self = this;

      if(self.usePagination) {
        self.currentPage = 0;
      }

      if(self.useLoadingState) {
        var renderFn = self.render.bind(self);
        self.render = function() {
          if(typeof self.state.isLoading=="undefined") {
            throw new Error("A mixed-in loading state has not been set up properly. Please ensure 'isLoading : boolean' is defined in your state.")
          }
          if(self.state.isLoading) {
            return self.renderLoading();
          } else {
            return renderFn();
          }
        }
      }
    }

  }
}