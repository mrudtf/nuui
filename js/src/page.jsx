/** @jsx React.DOM */

module.exports = function(React, _, Hub) {

  // States
  var LoadingState = require('./states/loading.jsx')(React, _);
  var LoadMoreBtn = require('./components/loadMoreBtn.jsx')(React, _);

  // Mixins
  var RouterMixin = require('./util/routerMixin.js')();
  var PageMixin = require('./util/pageMixin.js')();
  var ApiMixin = require('./util/apiMixin.js')(_, LoadingState, LoadMoreBtn);
  var MasonryMixin = require('./util/masonryMixin.js')();
  var MasonMixin = require('./util/masonMixin.js')();
  var PromptMixin = require('./util/promptMixin.jsx')(_);
  var DragDropMixin = require('./util/dragDropMixin.js')(_);
  var DateFormatMixin = require('./util/dateFormatMixin.jsx')();
  var UrlsMixin = require('./util/urlsMixin.js')();

  // Cards
  var PostCard = require('./cards/postCard.jsx')(React, Hub, _, DateFormatMixin, UrlsMixin);

  // Feed
  var FeedHome = require('./pages/feed/home.jsx')(React, _, PageMixin, MasonMixin, PromptMixin, PostCard);
  var FeedMixboard = require('./pages/feed/mixboard.jsx')(React, _, Hub);

  // Logged Out
  var LoggedOut = require('./pages/loggedout/loggedOut.jsx')(React, _, PageMixin, PromptMixin);

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
      '/':                'loggedout',

      // feed
      '/home':            'feedHome', 
      '/mixboard':        'feedMixboard', 

      // testing routes
      '/_/test/prompts': 'testPrompts'
    },

    loggedout: function() {
      this.runRoute(
        LoggedOut(_.extend({}, this.props, { title: 'Sign Up' }))
      );
    },

    feedHome: function() {
      this.runSecureRoute(
        this.props.session,
        FeedHome(_.extend({}, this.props, { title: 'My Feed' })),
        this.notAuthorized()
      );
    },

    feedMixboard: function() {
      this.runSecureRoute(
        this.props.session,
        FeedMixboard(_.extend({}, this.props, { title: 'Mixboard' })),
        this.notAuthorized()
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