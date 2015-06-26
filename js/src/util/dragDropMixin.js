// layouts requiring a "board" layout can
// benefit from this Masonry Mix-in
module.exports = function(_){
  return {

    canvas: false,
    stage: false,
    update: true,
    highlighter: false,
    activeChild: false,

    createCanvas: function() {
      var self = this;

      // create stage and point it to the canvas:
      self.canvas = self.refs.dragDropContainer.getDOMNode();

      setTimeout(function() {
        // make sure canvas dimensions are square
        var dimension = $('.thumb-holder').width();
        $(self.canvas).width(dimension);
        $(self.canvas).height(dimension);
        self.canvas.width = dimension;
        self.canvas.height = dimension;

        // create the stage
        self.stage = new createjs.Stage(self.canvas);

        // enable touch interactions if supported on the current device:
        createjs.Touch.enable(self.stage);

        // enabled mouse over / out events
        self.stage.enableMouseOver(10);
        self.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
      }, 700);
    },

    imageLoad: function(imageUrl, imageId, imageLimit) {
      var self = this;
      var limitExceeded = false;
      
      // first we need to check if there's an image limit, and if we've exceeded it
      if(imageLimit) {
        var children = _.map(self.stage.children, function(child1) {
          var children2 = _.map(child1.children, function(child2) {
            return {isChild: true}
          });
          return children2[0];
        })
        children = _.filter(children, function(item){ 
          return typeof item !== "undefined"; 
        });

        limitExceeded = children.length >= imageLimit;
      }

      // since IE and older Safari versions don't support CORS in canvas,
      // we need to resort to AJAX to handle image loading
      if(!limitExceeded) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var url = URL.createObjectURL(this.response), img = new Image();
          img.crossOrigin = "anonymous";
          img.crossorigin = "anonymous";
          img.imageId = imageId;
          img.originalSrc = imageUrl;
          img.onload = self.handleImageLoad;
          img.src = url;
        };
        xhr.open('GET', imageUrl, true);
        xhr.responseType = 'blob';
        xhr.send();

      } else {
        // throw error if limit was exceeded
        // note: this is meant to be handled in a try/catch
        throw new Error("Drag/drop image limit of "+imageLimit+" was exceeded.");
      }  
    },

    renderHighlighter: function(coords) {
      var myGraphics = new createjs.Graphics().beginFill("#ed248e").drawRect(0, 0, 25, 25);
      var highlighter = this.stage.addChild(new createjs.Shape()).set({graphics:myGraphics, x: coords.x, y: coords.y, alpha:0.2, name: "highlighter"});
      this.highlighter = this.stage.getChildByName("highlighter");
    },

    // move the highlighter to the active item
    // note that this needs to be a bitmap's container parent
    moveHighlighter: function(targetContainer) {
      var target = targetContainer.children[0];
      var highlighter = this.stage.getChildByName("highlighter");
      highlighter.x = target.x;
      highlighter.y = target.y;
      highlighter.graphics.command.w = (target.image.width*target.scale);
      highlighter.graphics.command.h = (target.image.height*target.scale);

      // update the reference point to its center
      //highlighter.regX = highlighter.graphics.command.w / 2 | 0;
      //highlighter.regY = highlighter.graphics.command.h / 2 | 0;

      var isFlipped = target.scaleX < 0;
      if(isFlipped && highlighter.scaleX > 0) {
        highlighter.scaleX = highlighter.scaleX * -1;

      } else if (!isFlipped && highlighter.scaleX < 0) {
        highlighter.scaleX = highlighter.scaleX * -1;
      }

      // make sure it matches rotation
      highlighter.rotation = targetContainer.children[0].rotation;

      // make sure it is always on top
      this.stage.setChildIndex(highlighter, this.stage.numChildren-1);

      // make sure that whatever is being moved is the active child
      this.activeChild = targetContainer;

      this.update = true;
    },

    showHighlighter: function() {
      if(!this.highlighter) {
        // make sure the highlighter is present
        this.renderHighlighter({x: 0, y: 0});
      }
    },

    hideHighlighter: function() {
      this.stage.removeChild(this.highlighter);
      this.highlighter = false;
      this.update = true;
    },

    handleImageLoad: function(event) {
      var self = this;
      var image = event.target;

      setTimeout(function(){
        var bitmap;
        var container = new createjs.Container();
        self.stage.addChild(container);

        // create and populate the screen with the image:
        bitmap = new createjs.Bitmap(image);
        container.addChild(bitmap);
        bitmap.x = self.canvas.width * (Math.random()*0.6) | 0;
        bitmap.y = self.canvas.height * (Math.random()*0.6) | 0;
        //bitmap.regX = bitmap.image.width / 2 | 0;
        //bitmap.regY = bitmap.image.height / 2 | 0;

        // determine if the scale needs to be shrunk
        var scaleFactor = (self.canvas.width * 0.3) / image.width;
        bitmap.scaleX = bitmap.scaleY = bitmap.scale = scaleFactor;
        bitmap.name = image.imageId;
        bitmap.originalSrc = image.originalSrc;
        bitmap.cursor = "pointer";

        // ensure the highlighter is present
        self.showHighlighter();

        // move the highlighter to the most recent bitmap rendered
        self.moveHighlighter(container);

        // using "on" binds the listener to the scope of the currentTarget by default
        // in this case that means it executes in the scope of the button.
        bitmap.on("mousedown", function (evt) {
          this.parent.addChild(this);
          this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};

          // change the position of the highlighter
          self.moveHighlighter(this.parent);

          var highlighterCoords = {x: this.x, y: this.y};
        });

        // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
        bitmap.on("pressmove", function (evt) {
          this.x = evt.stageX + this.offset.x;
          this.y = evt.stageY + this.offset.y;
          var highlighterCoords = {x: this.x, y: this.y};

          // change the position of the highlighter
          self.moveHighlighter(this.parent);

          // indicate that the stage should be updated on the next tick:
          self.update = true;
        });

        bitmap.on("rollover", function (evt) {
          //self.update = true;
        });

        bitmap.on("rollout", function (evt) {
          var isFlipped = this.scaleX < 0;
          this.scaleX = this.scaleY = this.scale;
          if(isFlipped) {
            this.scaleX = this.scaleX * -1;
          }
          self.update = true;
        });

        createjs.Ticker.addEventListener("tick", self.tick);
      }, 500)
    },

    stop: function() {
      createjs.Ticker.removeEventListener("tick", self.tick);
    },

    tick: function(event) {
      // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
      if (this.update) {
        this.update = false; // only update once
        this.stage.update(event);
      }
    },

    // the following wrapper function allows for EaselJS 
    // manipulation of the activeChild
    // in JSX this looks like onClick={self.activeChildFn.bind(this, 'remove', {})}
    activeChildFn: function(command, params, event) {
      event.preventDefault();

      var self = this;
      this.activeChildFunctions[command](self, params);
      self.update = true;
    },

    activeChildFunctions: {
      remove: function(self) {
        self.stage.removeChild(self.activeChild);
        if(self.stage.numChildren > 1) {
          self.activeChild = self.stage.getChildAt(0);
          self.moveHighlighter(self.activeChild);
        } else {
          self.hideHighlighter();
        }
      },
      flip: function(self) {
        var child = self.activeChild.children[0];
        child.scaleX *= -1;
        self.moveHighlighter(self.activeChild);
      },
      forward: function(self) {
        var index = self.stage.getChildIndex(self.activeChild);
        self.stage.setChildIndex(self.activeChild, index+1); // note that EaselJS fails silently if index is out of range
      },
      backward: function(self) {
        var index = self.stage.getChildIndex(self.activeChild);
        self.stage.setChildIndex(self.activeChild, index-1);
      },
      larger: function(self) {
        var child = self.activeChild.children[0];
        child.scale = child.scale+0.06;
        child.dispatchEvent("rollout");
        self.moveHighlighter(self.activeChild);
      },
      smaller: function(self) {
        var child = self.activeChild.children[0];
        child.scale = child.scale-0.06;
        child.dispatchEvent("rollout");
        self.moveHighlighter(self.activeChild);
      },
      rotateLeft: function(self) {
        var child = self.activeChild.children[0];
        child.rotation = child.rotation-30;
        child.dispatchEvent("rollout");
        self.moveHighlighter(self.activeChild);
      },
      rotateRight: function(self) {
        var child = self.activeChild.children[0];
        child.rotation = child.rotation+30;
        child.dispatchEvent("rollout");
        self.moveHighlighter(self.activeChild);
      }
    }

  }
}