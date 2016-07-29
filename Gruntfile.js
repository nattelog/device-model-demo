module.exports = function(grunt) {
  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist.js': ['js/ui.js']
        }
      }
    },

    watch: {
      browserify: {
        files: ['Gruntfile.js', 'js/*.js', 'index.html'],
        tasks: ['browserify']
      },
      options: {
        atBegin: true,
        livereload: true
      }
    }
  });

  grunt.registerTask('default', ['watch']);
};
