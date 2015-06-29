/** @jsx React.DOM */

module.exports = function(React, _, Hub) {

  return React.createClass({

    componentDidMount: function () {
      // here we hook into a global click to check if
      // we need to close any share buttons
      Hub.subscribe('globalClick', function(event){
      });  
    },

    toggleDropdown: function(event) {
      // first grab parent of 
      var $btn = $(event.currentTarget);
      $btn.addClass('open');

      $(document).on('click', function(){
        $btn.removeClass('open');
        $(document).off('click');
      });
    },

    promptCallback: function(){
      console.log("confirm")
    },

    render: function() {
      var self = this;

      var dropdownClass = "btn-group "+self.props.dropdownClass;
      var btnClass = "btn dropdown-toggle "+self.props.btnClass;
      var ulClass = "dropdown-menu "+self.props.ulClass;
      
      return (
        <div className={dropdownClass} onClick={self.toggleDropdown}>
          <button type="button" className={btnClass}>
            {self.props.children}
          </button>
          <ul className={ulClass} role="menu">
            {
              self.props.items.map(function(item) {
                return <li><a href={item.href}><i className={item.icon}></i> {item.text}</a></li>
              })
            }
          </ul>
        </div>
      );

    }
  });
};