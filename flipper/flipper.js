var exec = require('child_process').exec,
  child
// the bellow line only work on windows
// NOTE:Our support team will help user to setup this.
let path = process.env.Flipper
child = exec('java -jar ' + path, function (error, stdout, stderr) {
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
