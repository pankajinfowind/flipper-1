var path = require('path')
var exec = require('child_process').exec,
  child
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')

autoUpdater.logger = log

var server = path.join(__dirname + '/../server/', 'flipper-1.20.0-client.jar')

var dd = server.replace(/\app.asar/g, '')
var final = dd.replace(/\\\\/g, '\\')
log.info(`"${final}"`)
child = exec(`java -jar  "${final}"`, function (error, stdout, stderr) {
  log.info('stdout: ' + stdout)
  log.info('stderr: ' + stderr)
  if (error !== null) {
    log.info('exec error: ' + error)
  }
})
