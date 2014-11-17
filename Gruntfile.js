module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist']
    },

    copy: {
      images: {
        files: [{
          expand: true,
          cwd: 'template',
          src: ['img/*'], 
          dest: 'dist', 
        }]
      }
    },

    less: {
      dist: {
        options: {
          compress: true
        },
        files: {
          'dist/css/style.css': 'template/less/main.less'
        }
      }
    },

    markdown: {
      dist: {
        options: {
          markdownOptions: {
            smartypants: true,
          },
          template: 'template/template.html',
          templateContext: {
            title: 'My Documentation Title',
            description: 'Documentation descrition',
            date: new Date().toJSON().slice(0, 10),
            author: {
              name: 'Author Name',
              email: 'author_email@some_mail.com'
            }
          }
        },
        files: [{
          expand: true,
          cwd: 'md/',
          src: ['*.md'],
          dest: 'dist/',
          ext: '.html'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: 'template/less/*.less',
        tasks: ['less:dist']
      },
      template: {
        files: 'template/template.html',
        tasks: ['markdown:dist']
      },
      markdown: {
        files: 'md/*.md',
        tasks: ['markdown:dist']
      }
    },

    connect: {
      server: {
        options: {
          open: true,
          port: 3000,
          // change to 0.0.0.0 to access from outside
          hostname: 'localhost',
          livereload: 35729,
          base: 'dist'
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-markdown');

  grunt.registerTask('build', [
    'clean:dist',
    'copy:images',
    'less:dist', 
    'markdown:dist'
  ]);

  grunt.registerTask('default', [
    'build',
    'connect',
    'watch'
  ]);

};
