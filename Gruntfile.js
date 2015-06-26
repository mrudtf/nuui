module.exports = function (grunt) {
    // if dev mode, specify your target build name
    var target = grunt.option('target') || 'default';

    if(target=="img") {
      throw new Error("A build target cannot be named 'img' to prevent conflicts with static image folders. Please choose a different name.")
    }

    // if production, include production keys here
    var productionKey = grunt.option('productionKey') || 'default';
    var productionSecret = grunt.option('productionSecret') || 'default';

    if(target!="default" && productionKey!="default") {
      throw new Error("It looks like you are attempting to use production keys while specifying a development target. This could indicate you are accidentally pushing to production. Please check your environment variables.")
    }

    console.log("\n\n 🙌 Synereo Web Client 🙌 \n\n");

    grunt.initConfig({
      browserify: {
        options: {
	        // use grunt-react to transform JSX content on the fly when building
          transform: [require('grunt-react').browserify],
          // create source maps
          debug: false
        },
        app: {
	        // main entry point for application
          src: './js/src/main.js',
	          // destination output file for build
          dest: './js/build/app.js'
        }
      },
      concat: {
        js: {
          src: [
            './js/lib/fingerprint.js',
            './js/lib/director.min.js',
            './js/lib/masonry.pkgd.min.js',
            './js/lib/imagesloaded.pkgd.min.js',
            './js/lib/charactercounter.min.js',
            './node_modules/bootstrap/js/modal.js',
            './node_modules/bootbox/bootbox.js',
            './js/build/app.js'
          ],
          dest: 'dist/synereo.js'
        },
        css: {
            src: 'css/*.css',
            dest: 'dist/synereo.css'
        }
      },
      uglify: {
        dist: {
          options: {
            compression: {
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              join_vars: true
            }
          },
          files: {
            'dist/synereo.min.js': ['dist/synereo.js']
          }
        }
      },
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'dist/synereo.min.css': ['dist/synereo.css']
          }
        }
      },
      copy: {
        main: {
          files: [
            // copy javascript to sandbox cartridge
            {expand: true, flatten: true, src: ['dist/*.min.js'], dest: '../cartridge/static/default/js', filter: 'isFile'},
            // copy css to sandbox cartridge
            {expand: true, flatten: true, src: ['dist/*.min.css'], dest: '../cartridge/static/default/css', filter: 'isFile'}
          ],
        },
      },
      aws_s3: {
        options: {
          region: 'us-west-2',
          uploadConcurrency: 4, // 5 simultaneous uploads
          downloadConcurrency: 4 // 5 simultaneous downloads
        },
        // development s3 uploads
        development: {
          options: {
            accessKeyId: '', // Use the variables
            secretAccessKey: '', // You can also use env variables
            bucket: '',
            differential: false // Only uploads the files that have changed
          },
          files: [
            {expand: true, cwd: 'dist/', src: ['**'], dest: 'development/synereo/'+target, params: {CacheControl: '0'}}
          ]
        },
        development_assets: {
          options: {
            accessKeyId: '', // Use the variables
            secretAccessKey: '', // You can also use env variables
            bucket: '',
            differential: false // Only uploads the files that have changed
          },
          files: [
            {expand: true, cwd: 'img/dist/', src: ['**'], dest: 'development/synereo/img', params: {CacheControl: '0'}},
            {expand: true, cwd: 'fonts/build/', src: ['**'], dest: 'development/synereo/fonts/build', params: {CacheControl: '0'}}
          ]
        },
        // production s3 uploads
        production: {
          options: {
            accessKeyId: productionKey, // Use the variables
            secretAccessKey: productionSecret, // You can also use env variables
            bucket: '',
            differential: false
          },
          files: [
            {expand: true, cwd: 'dist/', src: ['**'], dest: 'production/synereo/default', params: {CacheControl: '2000'}}
            // CacheControl only applied to the assets folder
          ]
        },
        production_assets: {
          options: {
            accessKeyId: productionKey, // Use the variables
            secretAccessKey: productionSecret, // You can also use env variables
            bucket: '',
            differential: false
          },
          files: [
            {expand: true, cwd: 'img/dist/', src: ['**'], dest: 'production/synereo/img', params: {CacheControl: '0'}},
            {expand: true, cwd: 'fonts/build/', src: ['**'], dest: 'production/synereo/fonts/build', params: {CacheControl: '0'}}
          ]
        },
      },
      less: {
        development: {
          files: {
            "./css/compiled-lib.css": "./less/main.less"
          }
        }
      },
      play: {
        notify_ready: {
          file: './media/notify_ready.mp3'
        },
        notify_compiled: {
          file: './media/notify_compiled.mp3'
        }
      },
      watch: {
        development: {
          files: [
            './js/src/*',
            './js/src/**/*',
            './js/lib/*',
            './css/*',
            './less/*',
            './less/**/*'
          ],
          tasks: ['development-watch']
        },
        sandbox: {
          files: [
            './js/src/*',
            './js/src/**/*',
            './js/lib/*',
            './css/style.css',
            './less/*',
            './less/**/*'
          ],
          tasks: ['sandbox-watch']
        }
      },
      connect: {
        server: {
          options: {
            port: 3000
          }
        }
      }
    });

    // grunt plugins
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-play');

    // grunt tasks
    grunt.registerTask('default', ['browserify:app','less','concat','play:notify_ready','watch:sandbox']);

    grunt.registerTask('sandbox', ['browserify:app','less','concat','play:notify_ready','watch:sandbox']);
    grunt.registerTask('sandbox-watch', ['browserify:app','less','concat','play:notify_compiled']);

    grunt.registerTask('development-watch', ['browserify:app','less','concat','aws_s3:development','play:notify_compiled']);
    grunt.registerTask('development', ['browserify:app','less','concat','uglify','cssmin','aws_s3:development']);
    grunt.registerTask('development-assets', ['aws_s3:development_assets']);

    grunt.registerTask('production', ['browserify:app','less','concat','uglify','cssmin','aws_s3:production']);
    grunt.registerTask('production-assets', ['aws_s3:production_assets']);

    grunt.registerTask('serve', ['connect:server']);
};