module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      default: ['watch', 'connect']
    },
    connect: {
      server: {
        options: {
          port: 3030,
          keepalive: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'static/css/app.css' : 'static/css/app.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    copy: {
      bootstrapIn: {
        files: [
          {expand: true, src: ['_variables.scss'], dest: 'node_modules/bootstrap/scss/', filter: 'isFile'}
        ]
      },
      bootstrapOut: {
        files: [
          {expand: true, cwd:'node_modules/bootstrap/dist/css/', src: ['*'], dest: 'lib/bootstrap/dist/css/', filter: 'isFile'}
        ]
      },
    },
    auto_install: {
      bootstrap: {
        options: {
          cwd: 'node_modules/bootstrap',
          stdout: true,
          stderr: true,
          failOnError: true,
          npm: ''
        }
      }
    },
    grunt: {
      bootstrap: {
        gruntfile: 'node_modules/bootstrap/Gruntfile.js',
        task: 'dist-css'
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('compileBootstrap',['auto_install:bootstrap','copy:bootstrapIn','grunt:bootstrap','copy:bootstrapOut'])
  grunt.registerTask('default',['concurrent:default']);
}