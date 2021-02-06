"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var setupPushReceiver = require('electron-push-receiver').setup;
// reference on notification: https://ourcodeworld.com/articles/read/204/using-native-desktop-notification-with-electron-framework
// const notifier = require('node-notifier')
var menu = require('./menu').menu;
var onError = function (err, response) {
    console.error(err, response);
};
var isWindows = process.platform === 'win32';
var win;
var serve;
var args = process.argv.slice(1);
var log = require('electron-log');
var autoUpdater = require('electron-updater').autoUpdater;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
var nativeImage = require('electron').nativeImage;
var isDev = require('electron-is-dev');
var AutoLaunch = require('auto-launch');
var autoLauncher = new AutoLaunch({
    name: 'flipper',
    path: '/Applications/flipper.app',
});
autoLauncher.enable();
// Checking if autoLaunch is enabled, if not then enabling it.
autoLauncher
    .isEnabled()
    .then(function (isEnabled) {
    if (isEnabled)
        return;
    autoLauncher.enable();
})
    .catch(function (err) {
    throw err;
});
var server = require('./flipper/flipper');
serve = args.some(function (val) { return val === '--serve'; });
electron_1.ipcMain.on('sent-login-message', function (event, url) {
    var authUrl = url;
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    var authWindow = new electron_1.BrowserWindow({
        width: 700,
        height: 500,
        show: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    authWindow.show();
    // const menus = Menu.buildFromTemplate([])
    // authWindow.setMenu(menus)
    var handleRedirect = function (e, uri) {
        electron_1.shell.openExternal(uri);
    };
    authWindow.webContents.on('will-navigate', handleRedirect);
    authWindow.loadURL(authUrl + 'login');
    var ses = authWindow.webContents.session;
    authWindow.webContents.openDevTools();
    ses.clearCache();
    ses.cookies
        .get({})
        .then(function (cookies) {
        cookies.forEach(function (cookie) {
            var uRl = '';
            // get prefix, like https://www.
            uRl += cookie.secure ? 'https://' : 'http://';
            uRl += cookie.domain.charAt(0) === '.' ? 'www' : '';
            // append domain and path
            uRl += cookie.domain;
            uRl += cookie.path;
            ses.cookies.remove(uRl, cookie.name);
        });
    })
        .catch(function (error) {
        console.log(error);
    });
    function handleCallback() {
        var currentURL = authWindow.webContents.getURL();
        var raw = null;
        var token = null;
        var email = null;
        var name = null;
        var avatar = null;
        var id = null;
        var subscription = null;
        var expiresAt = null;
        var params = currentURL.split('?');
        if (params && params.length === 2) {
            if (params[0] === authUrl + 'authorized') {
                try {
                    raw = params[1];
                    token = raw.split('&')[0];
                    token = token.split('=')[1];
                    email = raw.split('&')[1];
                    email = email.split('=')[1];
                    name = raw.split('&')[2];
                    name = name.split('=')[1];
                    avatar = raw.split('&')[3];
                    avatar = avatar.split('=')[1];
                    id = raw.split('&')[4];
                    id = id.split('=')[1];
                    subscription = raw.split('&')[5];
                    subscription = subscription.split('=')[1];
                    expiresAt = raw.split('&')[6];
                    expiresAt = expiresAt.split('=')[1];
                    event.sender.send('received-login-message', [email, name, avatar, token, id, subscription, expiresAt]);
                    authWindow.destroy();
                }
                catch (e) {
                    log.info(e);
                }
            }
        }
    }
    authWindow.webContents.on('did-finish-load', function (e, urls) {
        handleCallback();
    });
    authWindow.on('closed', function () {
        authWindow = null;
    });
});
///////////////////// AUTO UPDATED  /////////////////////////////
// this is just to test autoUpdater feature.
var icon = nativeImage.createFromPath(path.join(__dirname, '../assets/icon/linux/icon.png'));
// function showMessage(message, title) {
//   notifier.notify(
//     {
//       message,
//       title,
//       // Special sound
//       // Case Sensitive string for location of sound file, or use one of OS X's native sounds
//       // Only Notification Center or Windows Toasters
//       sound: true, // "Bottle",
//       // The absolute path to the icon of the message
//       // (doesn't work on balloons)
//       // If not found, a system icon will be shown
//       icon: icon,
//       // Wait with callback (onClick event of the toast), until user action is taken against notification
//       wait: true,
//     },
//     onError
//   )
//   notifier.on('click', (notifierObject, options) => {
//     //  TODO: implement when a user click on notification.
//   })
// }
// function sendStatusToWindow(text: string, title) {
//   showMessage(text, title)
// }
if (!isDev) {
    autoUpdater.on('checking-for-update', function () {
        // sendStatusToWindow('Checking for update...', 'check updates');
        // tag
    });
    autoUpdater.on('update-available', function () {
        // sendStatusToWindow('Update available.', 'update available');
    });
    autoUpdater.on('update-not-available', function () {
        // sendStatusToWindow('Update not available.', 'No Update available');
    });
    autoUpdater.on('error', function (err) {
        // sendStatusToWindow('Error in auto-updater. ' + err, '');
    });
    autoUpdater.on('download-progress', function (progressObj) {
        var logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
        logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
        logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
    });
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName) {
        autoUpdater.quitAndInstall(true, true);
    });
}
var iconName;
if (process.platform === 'win32') {
    iconName = nativeImage.createFromPath(path.join(__dirname, '../assets/icon/win/icon.png'));
}
else if (process.platform === 'darwin') {
    iconName = nativeImage.createFromPath(path.join(__dirname, '../assets/icon/mac/icon.png'));
}
else {
    iconName = nativeImage.createFromPath(path.join(__dirname, '../assets/icon/linux/icon.png'));
}
function createWindow() {
    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'yegobox',
        repo: 'flipper',
        token: process.env.GH_TOKEN,
    });
    autoUpdater.allowPrerelease = true;
    if (!isDev) {
        try {
            setInterval(function () {
                autoUpdater.checkForUpdatesAndNotify();
            }, 600000); // set the timer to run every 10 min. to check for update
        }
        catch (e) { }
    }
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        frame: isWindows ? false : true,
        width: size.width,
        height: size.height,
        // webPreferences: {
        //   preload: path.join(__dirname, 'preload.js'),
        //   nodeIntegration: true,
        // },
        icon: iconName,
    });
    // win.setMenu(null)
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron"),
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '/dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
    if (serve) {
        // win.webContents.openDevTools();
    }
    setupPushReceiver(win.webContents);
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        if (win === null) {
            createWindow();
        }
    });
    // Register an event listener. When ipcRenderer sends mouse click co-ordinates, show menu at that point.
    /*eslint no-shadow: ["error", { "allow": ["args"] }]*/
    /*eslint-env es6*/
    electron_1.ipcMain.on("display-app-menu", function (e, args) {
        if (isWindows && win) {
            menu.popup({
                window: win,
                x: args.x,
                y: args.y,
            });
        }
    });
}
catch (e) {
    // Catch Error // throw e;
}
// https://www.electron.build/auto-update#appupdatersetfeedurloptions
// for knowing the downloaded progress will use bellow code.
// TODO: https://gist.github.com/the3moon/0e9325228f6334dabac6dadd7a3fc0b9
// TODO: integrate analytics https://kilianvalkhof.com/2018/apps/using-google-analytics-to-gather-usage-statistics-in-electron/
// docs:
// http://muldersoft.com/docs/stdutils_readme.html
// https://github.com/electron-userland/electron-builder/issues/1084
// https://stackoverflow.com/questions/24326685/pin-icons-to-taskbar
// https://www.electron.build/configuration/nsis
// cd C:\Program Files\Couchbase\Sync Gateway
// sync_gateway.exe serviceconfig.json
// https://forums.couchbase.com/t/admin-api-localhost-website-cors/10965/3
// removed:  --browsers=ChromeHeadless from test travis
// https://github.com/PatrickJS/angular-hmr
// https://webpack.js.org/guides/hot-module-replacement/
//https://dev.to/koscheyscrag/fix-of-angular-cli-javascript-heap-out-of-memory-error-while-running-ng-serve--1jjh
// sed -i 's/name/R/g' .env
//# sourceMappingURL=main.js.map