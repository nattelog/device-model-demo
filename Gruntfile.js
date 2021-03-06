module.exports = function(grunt) {
  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist.js': ['lib/ui.js']
        }
      },
      options: {
        exclude: ['jquery']
      }
    },

    watch: {
      browserify: {
        files: ['Gruntfile.js', 'lib/*.js', 'index.html'],
        tasks: ['browserify']
      },
      options: {
        atBegin: true,
        livereload: true
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', 'browserify');
};
