// layouts requiring a "board" layout can
// benefit from this Masonry Mix-in
module.exports = function(){
  return {

    masonry: false,

    componentDidUpdate: function() {
      var self = this;

      try {
        if(self.masonry) {
          self.updateMasonry();

          // sometimes mobile is tough, so we delay masonry
          setTimeout(function() {
            try {
              self.updateMasonry();
            } catch(e) {
              // wrap a try/catch around the error. This kills the error.
            }
          }, 2000);
        } else {
          self.setMasonry();

          // sometimes mobile is tough, so we delay masonry
          setTimeout(function() {
            try {
              self.updateMasonry();
            } catch(e) {
              // wrap a try/catch around the error. This kills the error.
            }
          }, 2000);
        }
      } catch(e) {
        console.log("Waititng to set Masonry layout since it appears the DOM is not yet ready. Details:", e)
      }
    },

    // sets up the masonry layout
    setMasonry: function() {
      var self = this;
      var options = self.masonryOptions;
      var masonryDOM = self.refs.masonryContainer.getDOMNode();

      // if you wish to perform a function before initialization
      if(options.beforeInit) { options.beforeInit(self); }

      $(masonryDOM).show();
      self.masonry = new Masonry(masonryDOM, options);

      this.imagesLoaded();

      // if you wish to perform a function post-initialization
      if(options.onInit) { options.onInit(self); }
    },

    // update the masonry ref
    updateMasonry: function() {
      this.masonry.reloadItems();
      this.masonry.layout();
      this.imagesLoaded();
    },

    imagesLoaded: function() {
      imagesLoaded(this.refs.masonryContainer.getDOMNode(), function(instance) {
        this.masonry.layout();
      }.bind(this));
    }

  }
}