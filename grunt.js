module.exports = function(grunt) {

var spawn = require('child_process').spawn;

grunt.initConfig({
  deps: {
    'git.submodule': true
  },
  concat: {
    'dist/aqua.js': '<config:lint.files>'
  },
  min: {
    'dist/aqua.min.js': ['dist/aqua.js']
  },
  qunit: {
    index: ['test/index.html']
  },
  test: {
    files: ['test/tests/*.js']
  },
  lint: {
    files: ['lib/base.js', 'lib/object.js']
  }
});

grunt.registerTask('deps', 'download dependencies', function(data, name) {
  var done = this.async();

  spawn('git', ['submodule', 'init']).on('exit', function() {
    spawn('git', ['submodule', 'update']).on('exit', function() {
      grunt.log.writeln('git submodule updated.');
      done();
    });
  });
});

// Default task.
grunt.registerTask('default', 'deps lint qunit concat min');

};
