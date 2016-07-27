console.log('hi', process.argv)
if (process.argv[2] !== 'child') {
  require('child_process').spawn(process.execPath, [__filename, 'child'], {
    stdio: 'inherit'
  }).on('close', function (code, signal) {
    console.error(code, signal)
  })
}
