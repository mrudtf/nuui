/** @jsx React.DOM */

module.exports = function(Hub, React, _, Page) {

  var DropdownBtn = require('./components/dropdownBtn.jsx')(React, _, Hub);
  var MixboardInline = require('./components/mixboard/mixboardInline.jsx')(React, _, Hub);

  return React.createClass({

    getInitialState: function(){
      return { 
        pageTitle: '',
        isAuthenticated: true,
        session: {
          name: 'Justin Long',
          email: 'justinlong@outlook.com'
        }
      };
    },

    componentDidMount: function () {
      var self = this;
      setTimeout(function() {
        $(self.refs.mixboardInlineContainer.getDOMNode()).slideToggle();
      }, 2000);
    },

    authenticateUser: function() {
      this.setState({isAuthenticated: true});
    },

    setTitle: function(title) {
      this.setState({pageTitle: title});
      document.title = title + ' | ' + this.props.titleBase;
    },

    toggleMenu: function(){
      $('body').toggleClass('sy-sidebar-open');

      $(document).on('click', function(){
        $('body').removeClass('sy-sidebar-open');
        $(document).off('click');
      });
    },

    toggleMixboard: function() {
      var self = this,
        $element = $(self.refs.mixboardInlineContainer.getDOMNode());

      $element.slideToggle();
    },

    render: function() {
      var self = this;

      return (
        <div className="sy-scaffold">
          {/* top navigation */}
          <nav className="navbar navbar-default navbar-primary navbar-fixed-top">
            <div className="container-fluid">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <a href="#/home"><img src={self.props.staticImage("logo-square.png")} /></a>
                </li>
                <li className="nav-btn">
                  <button type="button" className="btn btn-sy-blue" onClick={self.toggleMixboard}><i className="fa fa-sliders"></i> Mixboard</button>
                </li>
              </ul>
              <div className="navbar-header">
                <button className="navbar-toggle" type="button" onClick={self.toggleMenu}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
            </div>
          </nav>

          {/* side navigation */}
          <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
              <ul className="nav metismenu" id="side-menu">
                <li className="active">
                  <a href="index.html">
                    <i className="fa fa-th-large"></i> <span className="nav-label">My Feed</span> <span className="fa arrow"></span>
                  </a>
                </li>
                <li className="">
                  <a href="index.html">
                    <i className="fa fa-comments"></i> <span className="nav-label">Messages</span> <span className="fa arrow"></span>
                  </a>
                </li>
                <li className="">
                  <a href="index.html">
                    <i className="fa fa-bell"></i> <span className="nav-label">Notifications</span> <span className="fa arrow"></span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* main page */}
          <div className="sy-page" id="sy-page" ref="syPage">

            {/* mini mixboard */}
            <div ref="mixboardInlineContainer">
            {MixboardInline(_.extend({}, self.props))}
            </div>

            {/* main routing component */}
            {Page(_.extend({}, self.props, {
              setTitle: self.setTitle, 
              isAuthenticated: self.state.isAuthenticated,
              authenticateUser: self.authenticateUser, 
              session: self.state.session
            }))}
          </div>

        </div>
      );

    }
  });
};