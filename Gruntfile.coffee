module.exports = (grunt)->
  # Project config
  grunt.initConfig 
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      compile:
        files:
          'source/javascripts/modules/site.js':'source/coffee-script/site.coffee'
          'source/javascripts/modules/map.js':'source/coffee-script/map.coffee'
          'source/javascripts/main.js':'source/coffee-script/require/*.coffee'

    stylus:
      compile:
        files:
          'public/stylesheets/main.css':['source/stylus/main.styl']
          
    uglify:
      main:
        options:
          banner: "/* Connor Collins made this. */"
          mangle: false
            # except: ['jQuery', '$'] # When true this could be useful
          beautify: true
          drop_console: true
        files: [
          expand: true
          flatten: true
          cwd: 'source/javascripts'
          src: '*.js'
          dest:'public/javascripts'
          ext: '.min.js'
        ]
      modules:
        options:
          mangle: false
          beautify: true
          drop_console: true
        files: [
          expand: true
          flatten: true
          cwd: 'source/javascripts/modules'
          src: '*.js'
          dest:'public/javascripts/modules'
          ext: '.min.js'
        ]
      libs:
        options:
          mangle: true
          beautify: false
          drop_console: true
        files: [
          expand: true
          flatten: true
          cwd: 'source/javascripts/libs'
          src: '*.js'
          dest:'public/javascripts/libs'
          ext: '.min.js'
        ]
  #   nodemon:
  #     dev:
  #       script: 'app.js'
  #       options: 
  #         args: ['dev']
  #         nodeArgs: ['--debug']
  #         callback: (nodemon)->
  #           nodemon.on 'log', (event) ->
  #             console.log event.colour
  #         env:
  #           PORT: '8181'
  #         cwd: __dirname
  #         ignore: ['node_modules/**', 'source/**']
  #         ext: 'coffee'
  #         # watch: ['.'], # Default is ['.']
  #         # delay: 1000, # Default is 1000
  #         # legacyWatch: true

  # grunt.loadNpmTasks 'grunt-nodemon'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['coffee', 'stylus', 'uglify']