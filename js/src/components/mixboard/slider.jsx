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
      reversed: React.PropTypes.bool,
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
        reversed: true,
        onChange: function() {}
      };
    },

    componentWillUpdate: function(nextProps, nextState) {
      this.slider.setValue(nextProps.value);
    },

    componentDidMount: function() {
      var self = this;

      // set up variables
      var toolTip = self.props.toolTip ? 'show' : 'hide',
        sliderDOM = self.refs.slider.getDOMNode(),
        sliderContainerDOM = self.refs.sliderContainer.getDOMNode();

      // set up the slider
      self.slider = new Slider(sliderDOM, {
        id: self.props.key,
        min: self.props.min,
        max: self.props.max,
        step: self.props.step,
        value: self.props.value,
        orientation: self.props.orientation,
        reversed: self.props.reversed,
        tooltip: toolTip
      });
      
      self.slider.on('slide', function(event) {
        self.props.onChange(event);
      }.bind(self));

      self.slider.on('slideStop', function(event) {
        self.props.onChange(event);
      }.bind(self));
    },

    toggleValue: function() {
      var self = this;

      if(self.slider.getValue()===0) {
        self.slider.setValue(self.props.value);
      } else {
        self.slider.setValue(0);
      }
    },

    advancedEdit: function() {
      var self = this;
      window.location.hash = '#/mixboard/channel/'+self.props.channelId;
    },

    render: function() {
      var self = this;

      return (
        <div className="slider-container" ref="sliderContainer">
          <div className="slider-label">{self.props.label}</div>
          <input type="text" ref="slider" />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={self.advancedEdit}><i className="fa fa-pencil"></i></button>
            <button type="button" className="btn btn-default" onClick={self.toggleValue}><i className="fa fa-power-off"></i></button>
          </div>
        </div>
      );
    }
  });
};