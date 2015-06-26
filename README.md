# Synereo Web Client

The `build_src` directory contains all source code for the Synereo web client single-page application (SPA). Grunt is used to compile the app into its production files. Use `grunt build` to compile the app and copy files to the `static` folder for local sandbox testing. `grunt stage` will compile the source code into the `dist` folder which can be used to upload to a production environment.

#### ReactJS Application Template with Grunt/NPM/Bootstrap/Browserify

This application template uses Bootstrap for CSS, Director for routes, and Browserify to build React components as CommonJS modules.

#### Install required node modules:

`npm install`

#### Run the default Grunt task

`grunt`

The default Grunt task will build everything in your `/src` folder starting with `/src/main.js` as the entry point.

You can then open the single page app using `file://your/path/to/sandbox.html`.

Finally it will watch for any file changes in the `src` folder and rebuild.

#### CommonJS structure

Simply create a file for each module and assign the value of the module to the `module.exports` value within the file.

Require the modules from another file with `var myModule = require('./myModule.js')`.

Don't forget to use the full relative path notation, starting with a `./` and ending with `.js`. You can use subfolders if needed.

#### JSX files

While not mandatory, it's best to name your files containing JSX markup with `.jsx`. This will help you identify which files actually contain JSX markup and which files are just plain JavaScript.

You will also need to have the following comment on the first line of every JSX file, otherwise you will have errors:

    /** @jsx React.DOM */
    
    // your code starts here...
    module.exports = React.createClass({
        render: function() {
            return (
                <div>{this.props.children}</div>
            );
        }
    });

Here are a few tips when working with JSX:

- Always return a single root element from your render function. The root element may contain child elements but you can only return a single element from the render function.
- Use the `className` attribute and not `class` for defining CSS on elements. This is because `class` is a reserved JavaScript keyword, and JSX gets converted to real JavaScript.
- You must always use an object with key value pairs for setting the `style` attribute. Do this via the binding syntax `style={this.someFunctionToGetStyle()}` or `style={someObjectInScope}`
- To render child components, use the `{this.props.children}` expression within the area of your component you wish to render children into. Any children you declare inside an instance of your component will not render if you don't do this.

#### IDE Support

IDE editors with strong code object models and inspections (such as WebStorm, Visual Studio) have as of yet limited JSX support. Therefore I recommend using Sublime to get a good build development experience with JSX.