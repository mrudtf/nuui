module.exports = function(){
  return {

    getInitialState: function () {
      return {
        routeComponent: null
      };
    },

    runRoute: function(component){
      this.setState({routeComponent: component});
      $('html,body').scrollTop(0);
    },

    runSecureRoute: function(session, component, unauthorizedComponent){
      var self = this;

      // temporarily, we will authenticate for demo purposes
      //self.props.authenticateUser();

      // if the user is authenticated, run the standard component
      // otherwise, display an unauthorized component
      if(self.props.isAuthenticated) {
        self.runRoute(component);
      } else {
        self.runRoute(unauthorizedComponent);
      }
    },

    componentWillMount: function() {
      var self = this;
      self.router = Router(self.routes).configure({
        resource: self, 
        notFound: self.notFound
      });
      self.router.init(); 
    }
  };
}