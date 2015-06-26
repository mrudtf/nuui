/** @jsx React.DOM */

module.exports = function(React, Hub, _) {

  return React.createClass({

    makeRequest: function() {
      $('.btn-loadmore').hide();
      $('.loader-pagination').show();

      this.props.requestFn();
    },

    render: function() {
      var self = this;

      return (
        <div className="text-center" style={{margin: '20px 0'}}>
          <button type="button" onClick={self.makeRequest}
           className="btn btn-pink btn-loadmore">
            Load More
          </button> 

          <img src={self.props.staticImage("loader-pagination.gif")} className="loader-pagination" style={{display: 'none'}} />
        </div>
      );
    }
  });
};