module.exports = function ( grunt ) {
  var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
  
  // TODO migrate this entirely to Grunt
  function runTestacular( testConfigFile, options ) {
    var args = [ 'start', testConfigFile, '--reporters=dots', '--colors' ].concat( options ),
        done = grunt.task.current.async(),
        child = grunt.util.spawn({
          cmd: testacularCmd,
          args: args
        }, function testacularError( err, result, code ) {
          grunt.log.writeln("Running cmd");
          if ( code ) {
            done( false );
          } else {
            done();
          }
        });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  };

  grunt.registerTask( 'test-watch', 'watch file changes and test', function gruntTestWatchTask() {
    var options = [ '--auto-watch', '--no-single-run' ];
    runTestacular( 'config/testacular-unit.js', options );
  });

  grunt.registerTask( 'test', 'run testacular unit tests', function gruntUnitTestTask() {
    var options = [ '--single-run', '--no-auto-watch' ];
    runTestacular( 'config/testacular-unit.js', options );
  });

  grunt.registerTask( 'e2e', 'run testacular E2E tests', function gruntE2eTestTask() {
    var options = [ '--single-run', '--no-auto-watch' ];
    runTestacular( 'config/testacular-e2e.js', options );
  });
};

