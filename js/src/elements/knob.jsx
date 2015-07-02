/** @jsx React.DOM */

module.exports = function(React, _) {

  return React.createClass({

    knobOptions: {
      min: 0,
      max: 100,
      step: 1,
      angleArc: 250,
      angleOffset: -125,
      fgColor: '#66CC66',
      displayInput: false
    },

    getInitialState: function () {
      var self = this;

      return {
        value: self.props.value  
      };
    },

    componentDidMount: function () {
      var self = this;
      var $knob = $(self.refs.knobInput.getDOMNode());

      if(typeof self.props.knobOptions !== 'undefined') {
        _.extend(self.knobOptions, self.props.knobOptions);
      }

      // if the value changes, register it in state
      self.knobOptions.release = function(value) {
        // update local state
        self.setState({ value: value });

        // update parent component if function was provided
        if(typeof self.props.onChange !== 'undefined') {
          self.props.onChange(value);
        }
      }

      $knob.knob(self.knobOptions);  
    },

    render: function() {
      var self = this;

      return (
        <div className="knob-container">
          <input type="text" value={self.state.value} ref="knobInput" />
          <div className="knob-label">{self.props.label}</div>
        </div>
      );
    }
  });
};