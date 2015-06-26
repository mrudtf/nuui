/** @jsx React.DOM */

module.exports = function(React, _, PageMixin, BoardCard) {

  var masonryOptions = {
    itemSelector : '.thumb',
    isFitWidth: true,
    transitionDuration: 0
  }

  return React.createClass({

    mixins: [PageMixin, React.addons.LinkedStateMixin],

    setMasonry: function() {
      setTimeout(function(){
        $('#masonry').show();
        $('#masonry').masonry(masonryOptions);
      },1500);
    },

    getInitialState: function () {
      return {
        selectedCategory: "Sort by Category",
        search: ''
      };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      return nextState.selectedCategory !== this.state.selectedCategory || nextProps.title !== this.props.title;;
    },

    componentWillMount: function () {
      $('#masonry').hide();
    },

    componentDidMount: function () {
      this.setMasonry();
    },

    componentWillUpdate: function (nextProps, nextState) {
      nextProps.setTitle(nextProps.title)
      $('#masonry').hide();
      if(nextProps.title !== this.props.title) {
        this.setState({selectedCategory: "All"});
      }
    },

    componentDidUpdate: function (prevProps, prevState) {
      this.setMasonry();
    },

    toggleDropdown: function() {
      $('#category-dropdown').toggleClass('open');
    },

    setCategory: function(item) {
      this.setState({selectedCategory: item});
      this.toggleDropdown();
    },

    render: function() {
      var self = this;

      var selectedCategory = (self.state.selectedCategory=="All" ? "Sort by Category" : self.state.selectedCategory);

      return (
        <div>
          {/* Top navigation for categories, search, etc. */}
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li className="dropdown" id="category-dropdown">
                  <a href="javascript:;" className="dropdown-toggle" role="button" onClick={self.toggleDropdown}>{selectedCategory} <i className="fa fa-caret-down"></i></a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="javascript:;" onClick={self.setCategory.bind(null, "All")}>All</a></li>
                    { self.props.productCategories.map(function(item) {

                      return <li><a href="javascript:;" onClick={self.setCategory.bind(null, item)}>{item}</a></li>

                    }) }
                  </ul>
                </li>
              </ul>
              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="style # or name" valueLink={this.linkState('search')} />
                </div>
              </form>
            </div>
          </nav>

          {/* Masonry container */}
          <div className="container-fluid sy-page sy-bg-white">
            <div ref="masonryContainer" id="masonry" style={{visibility: 'visible', display: 'none'}}>
            { self.props.items.map(function(item) {

              return BoardCard(_.extend({}, self.props, {thumbImg: item.thumbImg, actions: {}))

            }) }
            </div>
            <div className="clearfix"></div>
          </div>

        </div>
      );

    }
  });
};