// provides functionality required by
// all pages, including setTitle
module.exports = function(){
  return {

    componentDidMount: function() {
      var self = this;

      // make sure a new title is set every time the page loads
      self.props.setTitle(self.props.title);
    },

    componentWillReceiveProps: function(props) {
      this.setState({title: props.title});
    }

  };
}