// main.js entry point for Synereo Web Client

// composition root - top level place for creating app objects and composition
// use this notation to inject dependencies:
// var module1 = require('./path/to/module1.js')();
// var module2 = require('./path/to/module2.js')(module1);
// This way we never use "require" calls inside modules, only at this level and pass in dependencies

// Check if syConfig is defined, if not we leave
// an undefined placeholder to prevent future errors
if(typeof window.syConfig==="undefined") {
  window.syConfig = undefined;
}

// Global state variables
window.syGlobal = {
  visible: false,
  instance: null, // here we store the rendered instance of "React.render(App(..))"
  devTarget: (typeof window.devTarget!="undefined" ? window.devTarget : undefined) // this can either be manually or dynamically set
};

// kill switch
if(typeof (syConfig || {}).killSwitch==="undefined") {

  // Application components
  var _ = require('../../node_modules/underscore');
  var Hub = require('./hub.js')();
  var React = require('../../node_modules/react/addons');

  // App
  var Page = require('./page.jsx')(React, _, Hub);
  var App = require('./app.jsx')(Hub, React, _, Page);

  /**
    Here we need to set up the fingerprint so unregistered users can access functionality
    **/
  var f = new Fingerprint({
    screen_resolution: true,
    canvas: true,
    flash: false
  });
  window.sy_fp = f.get();


  /**
    Continue initialization of Synereo web components
    **/

  // Set up contextual variables by using an idiom to
  // check the existence of different configuration keys
  var clientContext = (typeof (syConfig || {}).clientContext=="undefined" ? "production" : syConfig.clientContext);
  var devTarget = (typeof (syConfig || {}).devTarget=="undefined" ? "" : syConfig.devTarget);
  var staticImgPath = (typeof (syConfig || {}).staticImgPath=="undefined" ? 'https://sy-assets.global.ssl.fastly.net/production/synereo/img/' : syConfig.staticImgPath);

  // append stylesheets according to context
  switch(clientContext) {
    case 'sandbox':
      $('head').append('<link href="dist/synereo.css" type="text/css" rel="stylesheet" />');
      break;

    case 'development':
      $('head').append('<link href="https://sy-assets-dev.global.ssl.fastly.net/development/synereo/'+devTarget+'/synereo.css" type="text/css" rel="stylesheet" />');
      break;

    default:
      $('head').append('<link href="https://sy-assets.global.ssl.fastly.net/production/synereo/default/synereo.min.css" type="text/css" rel="stylesheet" />');
  }
  $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">');

  /**
   Render app components
   The following React.render() functions render both the
   SPA web app container and supporting inline elements
   **/
  console.log("\n\n 🙌 Synereo Web Client 🙌 \n\n");

  // ensure the hash is present
  if(window.location.hash=='') {
    window.location.hash = '/';
  }

  // shared component props
  var componentProps = {
    clientContext: clientContext,         // specifies either production, development, or sandbox
    staticImage: function(imageName) {    // base path to static images used in app, function returns file name + base path
      return staticImgPath+imageName;
    },
    Hub: Hub,
    fp: window.sy_fp,                     // fingerprint of the browser session
    titleBase: 'Synereo'                  // default title used for browser bar
  }

  // render SPA component
  syGlobal.instance = React.render(
    React.createElement(
      App, 
      componentProps
    ),
    document.getElementById('sy-container')
  );

}
