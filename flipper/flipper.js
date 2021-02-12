var path = require('path')
var exec = require('child_process').exec,
  child
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')
autoUpdater.logger = log


// function javaversion(callback) {
//   var spawn = require('child_process').spawn('java', ['--version']);
//   spawn.on('error', (err)=>{
//       return callback(err, null);
//   })
//   spawn.stderr.on('data', (data) =>{
//       data = data.toString().split('\n')[0];
//       var javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
//       if (javaVersion != false) {
//           // TODO: We have Java installed , do nothing continue running
//           return callback(null, javaVersion);
//       } else {
//           // TODO: No Java installed send response back to electron with a link to download java
//           return callback(null, null);
//       }
//   });
// }

// javaversion((err,version)=>{
//   log.info(`${version}${err}`)
//   console.log("Version is " + version);
// })

var server = path.join(__dirname + '/../server/', 'flipper-1.20.3-client.jar')

var dd = server.replace(/\app.asar/g, '')
var final = dd.replace(/\\\\/g, '\\')
log.info(`"${final}"`)
child = exec(`java -jar  "${final}"`, (error, stdout, stderr) =>{
  log.info('stdout: ' + stdout)
  log.info('stderr: ' + stderr)
  if (error !== null) {
    log.info('exec error: ' + error)
  }
})
