/** @jsx React.DOM */

module.exports = function(React, _, Hub) {

  // States
  var LoadingState = require('./pages/states/loading.jsx')(React, _);
  var LoadMoreBtn = require('./pages/elements/loadMoreBtn.jsx')(React, _);

  // Mixins
  var RouterMixin = require('./util/routerMixin.js')();
  var PageMixin = require('./util/pageMixin.js')();
  var ApiMixin = require('./util/apiMixin.js')(_, LoadingState, LoadMoreBtn);
  var MasonryMixin = require('./util/masonryMixin.js')();
  var PromptMixin = require('./util/promptMixin.jsx')(_);
  var DragDropMixin = require('./util/dragDropMixin.js')(_);
  var DateFormatMixin = require('./util/DateFormatMixin.jsx')();

  // Utilities

  // Re-usable Cards

  // Logged Out
  var LoggedOut = require('./pages/loggedout/loggedOut.jsx')(React, _, PageMixin, PromptMixin)

  // Trending

  // Testing
  var TestPrompts = require('./pages/testing/testPrompts.jsx')(React, _, PageMixin);

  // Errors
  var NotFound = require('./pages/404.jsx')(React);
  var NotAuthorized = require('./pages/401.jsx')(React);


  // The Class Itself
  return React.createClass({

    mixins: [RouterMixin],

    render: function() {
      return this.state.routeComponent;
    },

    /*
      Remaining functions are routes and corresponding functions
     */
    routes: {
      '/': 'login',

      // testing routes
      '/_/test/prompts': 'testPrompts'
    },

    login: function() {
      this.runRoute(
        LoggedOut(_.extend({}, this.props, { title: 'Sign Up' }))
      );
    },

    testPrompts: function() {
      this.runRoute(
        TestPrompts(_.extend({}, this.props, { title: 'Test Prompts' }))
      )
    },

    notFound: function () {
      this.runRoute(
        <NotFound setTitle={this.props.setTitle} />
      );
    },

    // note that this function returns a component, since it is passed
    // into the `runSecureRoute` function
    notAuthorized: function() {
      return NotAuthorized(_.extend({}, this.props, { title: 'Please Login' }));
    }

  });
};