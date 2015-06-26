module.exports = function(_){
  return {

    // helper function for displaying bootbox.js
    // yes/no prompts
    promptConfirm: function(props) {
      // a special callback function, before the prompt initializes
      if(props.beforeInit) {
        props.beforeInit();
      }

      var box = bootbox.dialog({
        title: props.title,
        message: props.message,
        buttons: {
          yes: {
            label: (typeof props.yesLabel==="undefined" || props.yesLabel==null ? "Yes" : props.yesLabel),
            className: "btn-pink btn-lg",
            callback: (typeof props.yesFn==="undefined" || props.yesFn==null ? function() {} : props.yesFn)
          },
          cancel: {
            label: (typeof props.cancelLabel==="undefined" || props.cancelLabel==null ? "No" : props.cancelLabel),
            className: "btn-default btn-lg",
            callback: (typeof props.cancelFn==="undefined" || props.cancelFn==null ? function() {} : props.cancelFn)
          }
        },
        show: false // manually trigger 'show' to take advantage of life cycle events
      });

      if(props.beforeShow) {
        props.beforeShow();
      }

      if(props.onShow) {
        box.on("shown.bs.modal", props.onShow);
      }

      if(props.beforeHide) {
        box.on("hide.bs.modal", props.afterHide);
      }

      if(props.afterHide) {
        box.on("hidden.bs.modal", props.afterHide);
      }

      box.modal('show');
    },

    // helper function for displaying bootbox.js
    // input and form prompts
    // fields are an array of regular objects
    // a field must have an id, label, placeholder, and a default value
    // a callback function will be passed serialized values of the form
    promptInput: function(props) {
      var self = this;

      // a special callback function, before the prompt initializes
      if(props.beforeInit) {
        props.beforeInit();
      }

      var fieldsHtml = _.map(props.fields, function(item) {
        var inputType = (item.textarea ?
          '<textarea id="'+ item.id +'" name="'+ item.id +'" type="text" placeholder="'+ item.placeholder +'" rows="3" class="form-control input-md">'+ item.value +'</textarea>'
        :
          '<input id="'+ item.id +'" name="'+ item.id +'" type="' + (item.inputType ? item.inputType : "text") + '" placeholder="'+ item.placeholder +'" value="'+ item.value +'" class="form-control input-md" /> '
        )
        return '<div class="form-group"> ' +
                  '<label class="control-label" for="'+ item.id +'">'+ item.label +'</label> ' +
                  inputType +
                '</div>';
      }).join("");

      // sometimes we want to add additional 
      // widgets, like picking a cover page
      var extraHtml = (props.extraHtml ? 
                        '<div class="row">  ' +
                          '<div class="col-md-12"> ' +
                            props.extraHtml +
                          '</div>' +
                        '</div>'
                      : '' );

      var box = bootbox.dialog({
        title: props.title,
        message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                      '<form id="'+ props.formId +'"> ' +
                        fieldsHtml +
                      '</form>' +
                    '</div>' +
                  '</div>' +
                  extraHtml +
                  '<div class="clearfix"></div>',
        buttons: {
          submit: {
            label: (typeof props.submitLabel==="undefined" || props.submitLabel==null ? "Submit" : props.submitLabel),
            className: "btn-pink btn-lg",
            callback: function() {
              // messy, but for some reason we can't access this later in scope
              var serializer = function(element) {
                var o = {};
                var a = $(element).serializeArray();
                $.each(a, function() {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
              }
              var formData = serializer('#'+props.formId);
              (typeof props.submitFn==="undefined" || props.submitFn==null ? function() {} : props.submitFn(formData))
            }
          },
          cancel: {
            label: (typeof props.cancelLabel==="undefined" || props.cancelLabel==null ? "Cancel" : props.cancelLabel),
            className: "btn-default btn-lg",
            callback: (typeof props.cancelFn==="undefined" || props.cancelFn==null ? function() {} : props.cancelFn)
          }
        },
        show: false // manually trigger 'show' to take advantage of life cycle events
      });

      if(props.beforeShow) {
        props.beforeShow();
      }

      box.on("shown.bs.modal", function() {
        // if a callback is defined, put it here
        if(props.onShow) {
          props.onShow()
        }

        // prevent enter key on form
        $("#"+props.formId).keydown(function(event){
          if(event.keyCode == 13) {
            event.preventDefault();
            return false;
          }
        });
      });

      if(props.beforeHide) {
        box.on("hide.bs.modal", props.beforeHide);
      }

      if(props.afterHide) {
        box.on("hidden.bs.modal", props.afterHide);
      }

      box.modal('show');
    },

    // helper function for displaying bootbox.js
    // visual picker using images + cancel button
    // images are provided as an array consisting of
    // an object defining src and id
    promptImgPicker: function(props) {
      // a special callback function, before the prompt initializes
      if(props.beforeInit) {
        props.beforeInit();
      }

      var images = _.groupBy(props.images, function(item, index) {
        return Math.floor(index/2);
      });
      images = _.map(images, function(item) {
        var innerHtml = _.map(item, function(img) {
          return '<div class="col-md-6">' +
                  '<button onclick="imgPickerCallback(this, \'' + img.id + '\'); return false" class="btn-picker"><img src="' + img.src + '" id="' + img.id + '" class="img-responsive" /></button>' +
                  '</div>'
        }).join("");
        
        return '<div class="row">' + innerHtml + '</div>';
      }).join("") + '<div class="clearfix"></div>';

      var box = bootbox.dialog({
        title: props.title,
        message: images,
        buttons: {
          cancel: {
            label: (typeof props.cancelLabel==="undefined" || props.cancelLabel==null ? "Cancel" : props.cancelLabel),
            className: "btn-default btn-lg",
            callback: (typeof props.cancelFn==="undefined" || props.cancelFn==null ? function() {} : props.cancelFn)
          }
        },
        show: false // manually trigger 'show' to take advantage of life cycle events
      });
      
      // set up callback function for image picks
      window.imgPickerCallback = function(target, imgId) {
        $(box).modal('hide');
        $(box).remove();
        props.pickFn(imgId)
      }

      if(props.beforeShow) {
        props.beforeShow();
      }

      if(props.onShow) {
        box.on("shown.bs.modal", props.onShow);
      }

      if(props.beforeHide) {
        box.on("hide.bs.modal", props.afterHide);
      }

      if(props.afterHide) {
        box.on("hidden.bs.modal", props.afterHide);
      }

      box.modal('show');
    }
  }
}