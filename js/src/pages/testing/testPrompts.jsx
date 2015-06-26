/** @jsx React.DOM */

module.exports = function(React, _, PageMixin) {

  var PromptMixin = require('../../util/promptMixin.jsx')(_);

  return React.createClass({

    mixins: [PageMixin, PromptMixin],

    render: function() {
      var self = this;

      var confirmProps = {
        title: "Share", 
        message: "Are you sure you want to share this?",
        yesLabel: "Yes, Share",
        yesFn: function() { console.log("Confirm success.") },
        cancelLabel: "No, Cancel",
        cancelFn: function() { console.log("Confirm cancellation.") }
      }

      var inputProps = {
        formId: "outfit_form",
        title: "Edit Outfit", 
        fields: [
          {id: 'outfitName', label: 'Outfit Name', placeholder: 'Enter an outfit name', value: ''},
          {id: 'outfitDescription', label: 'Outfit Description', placeholder: 'Enter an outfit description', value: '', textarea: true}
        ],
        submitLabel: "Save Outfit",
        submitFn: function(formData) { console.log(formData) },
        cancelLabel: "Cancel",
        cancelFn: function() { console.log("Confirm cancellation.") }
      };

      var pickerProps = {
        title: "Select Product", 
        images: [
          {id: 'product1', src: 'https://s-media-cache-ak0.pinimg.com/736x/8f/2c/69/8f2c69a16940c2fca8384a5b7f70819d.jpg'},
          {id: 'product2', src: 'https://s-media-cache-ak0.pinimg.com/736x/9a/d5/4e/9ad54ec6a0ac8341944e56eb7492b7b0.jpg'}
        ],
        pickFn: function(imgId) { console.log(imgId) },
        cancelLabel: "Cancel",
        cancelFn: function() { console.log("Confirm cancellation.") }
      }

      return (
        <div className="container-fluid sy-page sy-bg-white">
          <div className="row text-center">
            <button className="btn btn-default btn-md" type="button" onClick={self.promptConfirm.bind(this, confirmProps)}>
              Test Confirmation Prompt
            </button>
          </div>
          <div className="row text-center">
            <button className="btn btn-default btn-md" type="button" onClick={self.promptInput.bind(this, inputProps)}>
              Test Input Prompt
            </button>
          </div>
          <div className="row text-center">
            <button className="btn btn-default btn-md" type="button" onClick={self.promptImgPicker.bind(this, pickerProps)}>
              Test Picker Prompt
            </button>
          </div>
        </div>
      );

    }
  });
};