// mixin for supporting Isotope layout library
module.exports = function(){
  return {

    isotope: false,

    // note the below function requires a
    // .isotopeOptions object to be attached
    // to the component
    setupIsotope: function() {
      var self = this;

      self.isotope = new Isotope(
        self.refs.isotopeContainer.getDOMNode(),
        self.isotopeOptions
      )

      // ensure the grid is working
      self.isotope.reloadItems();
      self.isotope.layout();
      self.isotope.arrange();
      
      console.log("Grid instantiated.")
    },

    componentDidMount: function() {
      var self = this;

      try {
        if(!self.isotope && typeof self.refs.isotopeContainer !== 'undefined') {
          self.setupIsotope();
        }
          
      } catch(e) {
        console.log("Problem occured while setting up Isotope layout. Details:", e)
      }
    },

    componentDidUpdate: function() {
      var self = this;

      if(self.isotope) {
        self.isotope.reloadItems();
        self.isotope.layout();
        self.isotope.arrange();

      } else if(!self.isotope) {
        self.setupIsotope();
      }
    },

    componentWillUnmount: function() {
      if(self.isotope) {
        self.isotope.destroy();
      }
    }

  }
}