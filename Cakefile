{exec} = require 'child_process'

task 'compile', ->
  execute 'coffee --bare --compile --output lib/ src/resizeend.coffee'

execute = (command) ->
  exec command, (error) ->
    throw error if error
