/** @jsx React.DOM */

module.exports = function(React, _) {
  
  return React.createClass({

    slider: false,

    propTypes: {
      key: React.PropTypes.string,
      min: React.PropTypes.number,
      max: React.PropTypes.number,
      step: React.PropTypes.number,
      value: React.PropTypes.number.isRequired,
      toolTip: React.PropTypes.bool,
      orientation: React.PropTypes.string,
      onSlide: React.PropTypes.func
    },

    getDefaultProps: function() {
      return {
        min: 0,
        max: 100,
        step: 1,
        value: 50,
        toolTip: true,
        orientation: 'vertical',
        onChange: function() {}
      };
    },

    componentWillUpdate: function(nextProps, nextState) {
      this.slider.setValue(nextProps.value);
    },

    componentDidMount: function() {
      var self = this;

      var toolTip = self.props.toolTip ? 'show' : 'hide';
      self.slider = $(self.refs.sliderContainer.getDOMNode()).slider({
        id: self.props.key,
        min: self.props.min,
        max: self.props.max,
        step: self.props.step,
        value: self.props.value,
        orientation: self.props.orientation,
        tooltip: toolTip
      });
      
      self.slider.on('slide', function(event) {
        self.props.onChange(event);
      }.bind(self));

      self.slider.on('slideStop', function(event) {
        self.props.onChange(event);
      }.bind(self));
    },

    render: function() {
      var self = this;
      
      return (
        <div className="slider-container">
          <div className="knob-label">{self.props.label}</div>
          <input type="text" ref="sliderContainer" />
        </div>
      );
    }
  });
};