/** @jsx React.DOM */

module.exports = function(React, Hub, _, DateFormatMixin, UrlsMixin) {

  return React.createClass({
    mixins: [DateFormatMixin, UrlsMixin],

    getInitialState: function () {
      var self = this;
      return {
        title: self.props.post.postTitle,
        shares: self.props.post.shares,
        coloring: self.props.post.coloring
      };
    },

    getPostWidth: function() {
      var self = this;
      return (self.props.post.importance * 10).toString()+'%';
    },

    getPostHeight: function() {
      var importance = this.props.post.importance;

      if(importance < 2) {
        return 50;
      } else if (5 > importance >= 2) {
        return 80;
      } else if (8 > importance >= 5) {
        return 120;
      } else {
        return 200;
      }
    },

    renderBackgroundImg: function() {
      var self = this;
      if(self.props.post.postThumb) {
        return "url('"+self.props.post.postThumb+"')";
      }
    },

    render: function() {
      var self = this;

      var postLink = self.urls.postUrl(self.props.post.postId);

      var formattedTime = self.timeAgo(self.props.post.createdDate);
      
      return (
        <div className="grid-item" style={{'background-image': self.renderBackgroundImg(), width: self.getPostWidth(), height: self.getPostHeight()}}>
          <div className="text-overlay">
            {self.props.post.postTitle}
          </div>
        </div>
      );

    }
  });
};