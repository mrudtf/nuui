/** @jsx React.DOM */

module.exports = function(React, _) {
  return React.createClass({

    render: function() {
      var self = this;

      return (
        <div className="container-fluid sy-page sy-bg-prompt text-center">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <img src={self.props.staticImage("loader-page.gif")} alt="Loading..." />
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      );

    }
  });
};