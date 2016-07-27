#!/usr/bin/env node
var sw = require('spawn-wrap')
if (process.env.SPAWN_LOGGER) {
  var fs = require('fs')
  var log = __dirname + '/process-log/' + process.pid
  var fs = require('fs')
  while (fs.existsSync(log)) {
    log += '-'
  }
  log += '.json'
  fs.writeFileSync(log, JSON.stringify({
    argv: process.argv.slice(2),
    cwd: process.cwd()
  }) + '\n')
  sw.runMain()
} else {
  if (process.argv.length < 3) {
    console.error('usage: log-node-processes <command>')
    process.exit(1)
  }
  var mkdirp = require('mkdirp')
  var rimraf = require('rimraf')
  rimraf.sync(__dirname + '/process-log')
  mkdirp.sync(__dirname + '/process-log')

  sw([__filename], {SPAWN_LOGGER:1})

  // this spawn gets wrapped
  var child = require('child_process').spawn(
    process.argv[2],
    process.argv.slice(3),
    { stdio: 'inherit' }
  )

  child.on('close', function (code, signal) {
    if (signal) {
      process.kill(process.pid, signal)
    } else {
      process.exit(code)
    }
  })
}
