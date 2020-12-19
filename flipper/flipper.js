var exec = require('child_process').exec,
  child
// the bellow line only work on windows
// NOTE:Our support team will help user to setup this.
child = exec('java -jar D:\\demos\\desktop\\flipper\\flipper-0.0.1-SNAPSHOT.jar', function (error, stdout, stderr) {
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
