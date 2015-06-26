/** @jsx React.DOM */

module.exports = function(React) {
  return React.createClass({

    componentDidMount: function () {
      this.props.setTitle('Please Login');
    },

    render: function() {
      var self = this;

      return (
        <div className="container-fluid sy-page sy-bg-white">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 text-center">
              <h1>Have an account?</h1>
              <p><em>Your</em> social network.</p>
              <p><a className="btn btn-pink btn-md" role="button" href="#">Login / Create Account</a></p>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="clearfix"></div>
        </div>
      );

    }
  });
};