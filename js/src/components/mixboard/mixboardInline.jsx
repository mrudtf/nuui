/** @jsx React.DOM */

module.exports = function(React, _, Hub) {
  
  var Knob = require('./knob.jsx')(React, _);

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

    render: function() {
      var self = this;

      return (
        <div>
          {/* knob scrolling container */}
          <div className="scroller-horizontal" style={{maxHeight: 200}}>

            <div className="knob-placeholder">
              <ul>
                <li><button type="button" className="btn btn-default"><i className="fa fa-plus"></i> New Channel</button></li>
                <li><button type="button" className="btn btn-default" onClick={self.openLink.bind(self, "/mixboard")}><i className="fa fa-sliders"></i> Advanced Mixing</button></li>
                <li><button type="button" className="btn btn-default"><i className="fa fa-question-circle"></i> How-To</button></li>
              </ul>
            </div>

            { _.map(self.state.knobs, function(item) {

              return Knob(_.extend({}, self.props, {
                key: item.channelId,
                value: item.value, 
                label: item.channel,
                knobOptions: {
                  width: 90,
                  height: 90
                },
                onChange: function(v) {
                  console.log('Channel '+item.channel+': '+v)
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