/** @jsx React.DOM */

module.exports = function(React, _, Hub) {
  
  var Slider = require('../../components/mixboard/slider.jsx')(React, _);

  return React.createClass({

    getInitialState: function () {
      return {
        knobs: [
          {
            channelId: 'asd8fuj3',
            channel: '#news',
            value: 74
          },
          {
            channelId: 'kasd908g3u5',
            channel: '#family',
            value: 80
          },
          {
            channelId: '8asudfjw4',
            channel: '#science',
            value: 35
          },
          {
            channelId: '0asfn5j3q',
            channel: '#space',
            value: 99
          },
          {
            channelId: 'bdaf97u4j',
            channel: '#worldnews',
            value: 22
          },
          {
            channelId: 'x60s9fi4',
            channel: '#synereo',
            value: 27
          },
          {
            channelId: 'z09ihrgsad',
            channel: '#friends',
            value: 85
          },
          {
            channelId: 'c8a0s9rit',
            channel: '#videos',
            value: 15
          },
          {
            channelId: 'y8098sik4',
            channel: '#hiking',
            value: 78
          },
          {
            channelId: '4ijpasdf9g',
            channel: '#celebrities',
            value: 15
          },
          {
            channelId: 'n0sd8fhg4',
            channel: '#gaming',
            value: 30
          }
        ]  
      };
    },

    openLink: function(link) {
      window.location.hash = link;
    },

    componentDidMount: function () {
      // ensure the container is page height for style purposes
      var el = this.refs.mixboardContainer.getDOMNode(),
        $el = $(el),
        $syPage = $('#sy-page');

      $el.height($syPage.height()-20);
    },

    render: function() {
      var self = this;

      return (
        <div>
          {/* knob scrolling container */}
          <div className="scroller-horizontal" ref="mixboardContainer">

            { _.map(self.state.knobs, function(item) {

              return Slider(_.extend({}, self.props, {
                key: item.channelId,
                channelId: item.channelId,
                value: item.value, 
                label: item.channel,
                onChange: function(e) {
                  if(e.type==='slideStop') {
                    console.log('Channel '+item.channel+': '+e.value)
                  }
                },
              }))

            }) }

          <div className="clearfix"></div>
          </div>
        </div>
      );

    }
  });
};