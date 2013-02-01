/**
 * Based on html2js by the AngularUI team: https://angular-uigithub.com
 *
 * Updated to Grunt ~0.4.0 by Josh David Miller
 */
module.exports = function (grunt) {

  // HTML-2-JS Templates
  var path = require('path'),
      TPL = 'angular.module("<%= id %>", []).run(["$templateCache", function($templateCache) {\n  $templateCache.put("<%= id %>",\n    "<%= content %>");\n}]);\n',
      templateModule = "angular.module('templates', [<%= templates %>]);\n",
      escapeContent = function(content) {
        return content.replace(/"/g, '\\"').replace(/\r?\n/g, '" +\n    "');
      },
      normalizePath = function(p) {
        if ( path.sep !== '/' ) {
          p = p.replace(/\\/g, '/');
        }
        return p;
      };

  grunt.registerTask('html2js', 'Generate js version of html template.', function() {
    this.requiresConfig('html2js.src');
    var files = grunt.file.expand( grunt.config('html2js.src') ),
        base = grunt.config('html2js.base') || '.',
        dest = grunt.config('html2js.dest') || '.',
        templates = [];

    files.forEach(function(file) {
      var id = normalizePath( path.relative(base, file) );
      
      templates.push("'" + id + "'");
      
      grunt.file.write( path.resolve( dest, id + '.js' ), grunt.template.process( TPL, {
        data: {
          id: id,
          content: escapeContent( grunt.file.read( file ) )
        }
      }));
    });

    grunt.file.write( path.resolve( dest,'templates.js' ), grunt.template.process( templateModule, {
      data: {
        templates: templates.join(', ')
      }
    }));
  });
};
