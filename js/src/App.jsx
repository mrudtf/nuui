/** @jsx React.DOM */

module.exports = function(Hub, React, _, Page) {

  var DropdownBtn = require('./pages/elements/dropdownBtn.jsx')(React, _, Hub);
  var ApiMixin = require('./util/apiMixin.js')();
  var PromptMixin = require('./util/promptMixin.jsx')(_);

  return React.createClass({

    mixins: [ApiMixin, PromptMixin],

    getInitialState: function(){
      return { 
        pageTitle: ''
      };
    },

    setTitle: function(title) {
      this.setState({pageTitle: title});
    },

    toggleMenu: function(){
      $('#sy-menu').toggleClass('in');

      $(document).on('click', function(){
        $('#sy-menu').removeClass('in');
        $(document).off('click');
      });
    },

    render: function() {
      var self = this;

      return (
          <div className="sy-scaffold">
            <nav className="navbar navbar-default navbar-inverse navbar-primary navbar-fixed-top">
              <div className="container-fluid">
                  <div className="center-block">
                    {self.state.pageTitle}
                  </div>
                <div className="navbar-header">
                  <button className="navbar-toggle" type="button" onClick={self.toggleMenu}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="sy-menu">
                  <ul className="nav navbar-nav" onClick={self.toggleMenu}>
                    <li className=""><a href="#/link"><i className="sy-trending"></i> Link</a></li>
                  </ul>
                </div>
              </div>
            </nav>

            {Page(_.extend({}, self.props, {setTitle: self.setTitle}))}

          </div>
        </div>
      );

    }
  });
};