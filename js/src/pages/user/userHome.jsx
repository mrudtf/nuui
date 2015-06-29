/** @jsx React.DOM */

module.exports = function(React, _, PageMixin, IsotopeMixin, PromptMixin, PostCard) {
  return React.createClass({

    mixins: [PageMixin, IsotopeMixin, PromptMixin],

    isotopeOptions: {
      selector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    },

    getInitialState: function () {
      return {
        posts: [
          {
            postId: 'asd8fuj3',
            postTitle: 'SpaceX Launches Manned Mission',
            postThumb: 'http://i.imgur.com/bUDJIGY.png',
            postType: 'link',
            coloring: 'rgb(255,0,0)',
            shares: 143,
            importance: 6
          },
          {
            postId: 'ca93jrfaks',
            postTitle: 'Synereo Launches New Feature',
            postThumb: 'http://cointelegraph.com/images/725_aHR0cDovL2NvaW50ZWxlZ3JhcGguY29tL3N0b3JhZ2UvdXBsb2Fkcy92aWV3LzQ2NjczMTQ5MjZmODMxNWU5MjAwMTAwYjg2M2ZlNmZkLnBuZw==.jpg',
            postType: 'link',
            coloring: 'rgb(255,0,0)',
            shares: 121,
            importance: 4
          },
          {
            postId: '23fc9g4hs',
            postTitle: 'Baby Photos 2015',
            postType: 'album',
            coloring: 'rgb(255,0,0)',
            shares: 48,
            importance: 3
          },
          {
            postId: 'lw9rjacb4',
            postTitle: 'Waiting in line these days...third world problems.',
            postType: 'status',
            coloring: 'rgb(255,0,0)',
            shares: 143,
            importance: 1
          },
          {
            postId: 'nS8rj4fg',
            postTitle: 'Study shows promise for Alzheimer\'s prevention',
            postType: 'status',
            coloring: 'rgb(255,0,0)',
            shares: 143,
            importance: 2
          },
          {
            postId: 's8jj3kasd',
            postTitle: 'U2 launches new record album',
            postThumb: 'http://i.imgur.com/oU33oNy.jpg',
            postType: 'link',
            coloring: 'rgb(255,0,255)',
            shares: 143,
            importance: 2
          },
          {
            postId: 'b8q3kenfaj',
            postTitle: 'Cheese pizza is the bomb.',
            postType: 'status',
            coloring: 'rgb(0,0,255)',
            shares: 143,
            importance: 1
          },
        ]  
      };
    },

    render: function() {
      var self = this;

      return (
        <div>
          {/* Masonry container */}
          <div className="container-fluid sy-page sy-bg-white">
            <div ref="isotopeContainer" id="isotopeContainer" className="sy-grid sy-feed-grid">
              <div className="grid-sizer"></div>
            { _.map(self.state.posts, function(item) {

              return PostCard(_.extend({}, self.props, {
                post: item, 
                key: item.postId
              }))

            }) }

            <div className="clearfix"></div>
            </div>
          </div>
        </div>
      );

    }
  });
};