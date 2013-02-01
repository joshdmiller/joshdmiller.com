module.exports = function ( grunt ) {
  
  // Load required Grunt tasks
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('build');

  // Project Configuration
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },
    src: {
      js: [ 'src/**/*.js', '!src/**/*.spec.js', '<%= distdir %>/tmp/**/*.js' ],
      tpl: [ 'src/app/**/*.tpl.html' ],
      html: [ 'src/index.html' ],
      less: 'src/less/main.less'
    },
    clean: [ '<%= distdir %>' ],
    copy: {
      assets: {
        files: [{ 
          src: [ '**' ],
          dest: '<%= distdir %>/assets/',
          cwd: 'src/assets',
          expand: true
        }]
      },
      data: {
        files: [
          { src: [ 'config.json' ], dest: '<%= distdir %>/data/' }
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [ '<%= src.js %>' ],
        dest: '<%= distdir %>/assets/<%= pkg.name %>.js'
      },
      angular: {
        src: [ 'vendor/angular/angular.js' ],
        dest: '<%= distdir %>/assets/angular.js'
      }
    },
    recess: {
      build:  {
        src: [ '<%= src.less %>' ],
        dest: '<%= distdir %>/assets/<%= pkg.name %>.css',
        options: {
          compile: true
        }
      }
    },
    jshint: {
      all: [ 'Gruntfile.js', '<%= src.js %>' ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    },
    html2js: {
      src: [ '<%= src.tpl %>' ],
      base: 'src/app',
      dest: 'dist/tmp'
    },
    watch: {
      files: [ '<%= src.tpl %>', '<%= src.js %>', '<%= src.html %>', 'src/**/*.less' ],
      tasks: [ 'default', 'timestamp' ]
    }
  });

  // The default task
  grunt.registerTask( 'default', [ 'build' ] );
  grunt.registerTask( 'build', ['clean', 'html2js', 'jshint', 'concat', 'recess:build', 'index', 'copy'] );

  // Compile the index.html template
  grunt.registerTask( 'index', 'Process index.html template', function () {
    grunt.file.copy('src/index.html', 'dist/index.html', {process:grunt.template.process});
  });

  // Print a timestamp (useful for when watching)
  grunt.registerTask( 'timestamp', function() {
    grunt.log.subhead(Date());
  });
  
};
