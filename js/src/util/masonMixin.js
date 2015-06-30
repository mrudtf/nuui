// layouts requiring a fluid, responsive "board" layout can
// benefit from this Mason Mix-in
module.exports = function(){
  return {

    mason: false,

    componentDidUpdate: function() {
      var self = this;

      try {
        if(self.mason) {
          // mason already exists, so reset it
          self.mason.destroy()
          self.setMason();

        } else {
          // mason doesn't exist, so create it
          self.setMason();
        }
      } catch(e) {
        console.log("Waititng to set Masonry layout since it appears the DOM is not yet ready. Details:", e)
      }
    },

    // sets up the masonry layout
    setMason: function() {
      var self = this;
      var options = self.masonOptions;
      var masonDOM = self.refs.masonContainer.getDOMNode();

      setTimeout(function() {
        // if you wish to perform a function before initialization
        if(typeof options.beforeInit!=='undefined') { options.beforeInit(self); }

        // instantiate mason
        self.mason = $(masonDOM).mason(options, function() { console.log("Grid set.") });

        // if you wish to perform a function post-initialization
        if(typeof options.onInit!=='undefined') { options.onInit(self); }
      }, 500);
    }

  }
}