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

    getDimensions: function() {
      var self= this,
          d = 0;
      switch(self.props.post.importance) {
        case 1:
          d = "1x1";
          break;
        case 2:
          d = "2x1";
          break;
        case 3:
          d = "2x2";
          break;
        case 4:
          d = "*x1";
          break;
        case 5:
          d = "*x2";
          break;
        default:
          d = "1x1";
          break;
      }
      return d;
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

      var className = "grid-item post-card "+self.getDimensions();
      var style = {'background-image': self.renderBackgroundImg()};
      var coloring = self.props.post.coloring;
      if(typeof coloring!=='undefined') {
        _.extend(style, {'background-color': coloring})
      }
      
      return (
        <div className={className} style={style}>
          <a>
            <h2>
              <span className="height-ellipsis">
                <span className="post-title">{self.props.post.postTitle}</span>
              </span>
            </h2>
          </a>
          <span className="stats">
            <span className="channel">In {self.props.post.postType}s</span>
            <span className="shares"><i className="fa fa-code-fork"></i> {self.props.post.shares}</span>
          </span>
        </div>
      );

    }
  });
};