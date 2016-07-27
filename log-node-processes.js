#!/usr/bin/env node
var sw = require('spawn-wrap')
if (process.env.SPAWN_LOGGER) {
  var fs = require('fs')
  var logDir = process.env.SPAWN_LOGGER_DIR
  var log = logDir + '/' + process.pid
  var fs = require('fs')
  while (fs.existsSync(log)) {
    log += '-'
  }
  log += '.json'
  fs.writeFileSync(log, JSON.stringify({
    argv: process.argv,
    cwd: process.cwd()
  }) + '\n')
  sw.runMain()
} else {
  if (process.argv.length < 3) {
    console.error('usage: spawn-log <command>')
    process.exit(1)
  }
  var mkdirp = require('mkdirp')
  var rimraf = require('rimraf')
  var logDir = process.cwd() + '/node-process-log/'
  rimraf.sync(logDir)
  mkdirp.sync(logDir)

  sw([__filename], {
    SPAWN_LOGGER: 1,
    SPAWN_LOGGER_DIR: logDir
  })

  // this spawn gets wrapped, if it's node
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
