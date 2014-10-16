module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          require:['should'],
        },
        src: './test/*',
      },
    },
  });

  grunt.registerTask('test', ['mochaTest:test']);
};
