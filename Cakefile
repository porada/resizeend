{exec} = require 'child_process'

task 'compile', ->
  exec 'coffee --bare --print src/ > lib/resizeend.js', (error) ->
    throw error if error
