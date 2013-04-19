{exec} = require 'child_process'

task 'compile', ->
  compile()
  minify()

task 'minify', ->
  minify()

execute = (command) ->
  exec command, (error) ->
    throw error if error

compile = ->
  execute 'coffee --bare --compile --output lib/ src/resizeend.coffee'

minify = ->
  execute 'uglifyjs lib/resizeend.js --mangle --compress --output lib/resizeend.min.js'
