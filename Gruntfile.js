/*jshint indent:2*/
/*global module:false grunt:true*/
module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    connect: {
      reports: {
        options: {
          port: 8080,
          hostname: '127.0.0.1',
          base: ['reports'],
          directory: 'reports',
          debug: false,
          livereload: 8081,
          open: true,
          keepalive:true
        }
      }
    },

    karma: {
      options: {
        files:[
          'components/jquery/dist/jquery.js',
          'lib/{,**/}*.js',
          'spec/{,**/}*.js'
        ],
        exclude: [
          '{,**/}*.example.js'
        ],
        port: 9876,
        singleRun: true,
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        logLevel: 'INFO',
        frameworks: ['jasmine-ajax', 'jasmine'],
        preprocessors: {
          'lib/{,**/}*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'reports/coverage/'
        },
        colors: true
      },
      unit: {
        browsers: ['PhantomJS'],
        singleRun: false,
        autoWatch: true
      },
      coverage: {
        reporters: ['spec', 'coverage'],
        //browsers: ['PhantomJS', 'Chrome', 'Safari']
        browsers: ['PhantomJS']
      }
    },

    watch: {
      unit: {
        files: [
          '{lib,spec}/{,**/}*.js'
        ],
        tasks: ['karma:unit', 'karma:coverage']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['test', 'watch']);

  grunt.registerTask('test', ['karma:unit', 'karma:coverage']);

  grunt.registerTask('report', ['connect:reports']);

};
