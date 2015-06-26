/** @jsx React.DOM */

module.exports = function(React) {
  return React.createClass({

    componentDidMount: function () {
      this.props.setTitle('Not Found');
    },

    render: function() {
      var self = this;

      return (
        <div class="container-fluid">
          <div className="jumbotron">
            <h1>Not Found</h1>
            <p>Sorry, the page you requested is not found.</p>
            <p><a className="btn btn-primary btn-lg" role="button" href="#">Go Home</a></p>
          </div>
        </div>
      );

    }
  });
};