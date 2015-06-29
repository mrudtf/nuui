module.exports = function(){
  return {

    urls: {
      postUrl: function(postId) {
        return '#/post/'+postId;
      }
    }
  };
}