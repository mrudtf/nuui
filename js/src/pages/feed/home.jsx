/** @jsx React.DOM */

module.exports = function(React, _, PageMixin, MasonMixin, PromptMixin, PostCard) {
  return React.createClass({

    mixins: [PageMixin, MasonMixin, PromptMixin],

    masonOptions: {
      itemSelector: ".grid-item",
      ratio: 1.1,
      sizes: [
          [1,1]
      ],
      columns: [
          [0,480,1],
          [480,728,2],
          [728,900,3],
          [900,1050,4],
          [1050,1200,5],
          [1200,1350,6],
          [1350,1400,7],
          [1400,1550,8],
          [1550,2000,10]
      ],
      promoted: [
          ['2x1', 2, 1],
          ['2x2', 2, 2]
      ],
      layout: 'fluid',
      gutter: 1
    },

    getInitialState: function () {
      return {
        posts: [
          {
            postId: 'asd8fuj3',
            postTitle: 'SpaceX Launches Manned Mission',
            postThumb: 'http://i.imgur.com/bUDJIGY.png',
            postType: 'link',
            shares: 143,
            importance: 3
          },
          {
            postId: 'n9W4UFJS',
            postTitle: 'Posting another status of the day...',
            postType: 'status',
            coloring: 'rgba(255,0,140,0.5)',
            shares: 1,
            importance: 1
          },
          {
            postId: '0a8sjx8erjf',
            postTitle: '',
            postThumb: 'http://i.giphy.com/108Y1SMrGePEDC.gif',
            postType: 'image',
            shares: 143,
            importance: 1
          },
          {
            postId: 'v7sf94jkad',
            postTitle: 'Happy holidays everyone! I just wanted to say I\'m so proud of all of you!',
            postType: 'status',
            coloring: 'rgb(0,255,0,1)',
            shares: 12,
            importance: 1
          },
          {
            postId: 'ca93jrfaks',
            postTitle: 'Synereo Launches New Feature',
            postThumb: 'http://cointelegraph.com/images/725_aHR0cDovL2NvaW50ZWxlZ3JhcGguY29tL3N0b3JhZ2UvdXBsb2Fkcy92aWV3LzQ2NjczMTQ5MjZmODMxNWU5MjAwMTAwYjg2M2ZlNmZkLnBuZw==.jpg',
            postType: 'link',
            coloring: 'rgb(255,0,0)',
            shares: 121,
            importance: 3
          },
          {
            postId: 'z80rfjsj',
            postTitle: 'New study shows turtles have consistent speed for last 2000 years',
            postThumb: 'http://i.imgur.com/Jv8tD7m.jpg',
            postType: 'link',
            shares: 143,
            importance: 1
          },
          {
            postId: '23fc9g4hs',
            postTitle: 'Baby Photos 2015',
            postThumb: 'http://i.imgur.com/S3PnkCN.png',
            postType: 'album',
            shares: 48,
            importance: 2
          },
          {
            postId: 'b8q3kenfaj',
            postTitle: 'Cheese pizza is the bomb.',
            postType: 'status',
            coloring: 'rgba(0,0,255,0.3)',
            shares: 143,
            importance: 1
          },
          {
            postId: 'jg359sdffaj',
            postTitle: 'And you have it...',
            postThumb: 'http://31.media.tumblr.com/33c664a4bddea9acbc0ea5a2e8b1f543/tumblr_nfrqp8DbmW1rlapeio3_500.gif',
            postType: 'image',
            coloring: 'rgb(0,0,255)',
            shares: 143,
            importance: 1
          },
          {
            postId: 'lw9rjacb4',
            postTitle: 'Waiting in line these days...third world problems.',
            postType: 'status',
            coloring: 'rgba(40,0,0,1)',
            shares: 143,
            importance: 1
          },
          {
            postId: 'nS8rj4fg',
            postTitle: 'Study shows promise for Alzheimer\'s prevention',
            postThumb: 'http://i.imgur.com/Oq6Phhm.jpg',
            postType: 'status',
            coloring: 'rgba(34,41,0,0.5)',
            shares: 143,
            importance: 2
          },
          {
            postId: 's8jj3kasd',
            postTitle: 'U2 launches new record album',
            postThumb: 'http://i.imgur.com/oU33oNy.jpg',
            postType: 'link',
            shares: 143,
            importance: 2
          }
        ]  
      };
    },

    render: function() {
      var self = this;

      return (
        <div>
          {/* Masonry container */}
          <div className="">
            <div ref="masonContainer" id="masonContainer" className="sy-grid sy-feed-grid">
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