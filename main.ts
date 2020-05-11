import { app, BrowserWindow, screen, dialog, nativeImage, ipcMain, shell,Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';
const { menu } = require('./menu');

const isWindows = process.platform === 'win32';


let win;
let serve: boolean;
const args = process.argv.slice(1);
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const isDev = require('electron-is-dev');
serve = args.some(val => val === '--serve');

ipcMain.on('sent-login-message', (event) => {
  console.log('handle login new....');
  const authUrl = 'https://test.flipper.rw/login';
  const size = screen.getPrimaryDisplay().workAreaSize;

  let authWindow = new BrowserWindow({

    width: 700,
    height: 500,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    },
  });

  authWindow.show();
  const menus = Menu.buildFromTemplate([]);
  authWindow.setMenu(menus);

  const handleRedirect = (e, uri) => {
    shell.openExternal(uri);
  };

  authWindow.webContents.on('will-navigate', handleRedirect);
  authWindow.loadURL(authUrl);

  const ses = authWindow.webContents.session;
  ses.clearCache();

  ses.cookies.get({})
    .then((cookies) => {
      cookies.forEach(cookie => {
        let uRl = '';
        // get prefix, like https://www.
        uRl += cookie.secure ? 'https://' : 'http://';
        uRl += cookie.domain.charAt(0) === '.' ? 'www' : '';
        // append domain and path
        uRl += cookie.domain;
        uRl += cookie.path;
        ses.cookies.remove(uRl, cookie.name);
      });
    }).catch((error) => {
      console.log(error);
    });


  // 'will-navigate' is an event emitted when the window.location changes
  // newUrl should contain the tokens you need

  // Handle the response from YEGOBOX - See Update from 17/02/2020

  function handleCallback() {
    const currentURL = authWindow.webContents.getURL();
    let raw = null;
    let token = null;
    let email = null;
    let name = null;
    let avatar = null;
    let id = null;
    let subscription = null;

    const params = currentURL.split('?');
    // console.log(params);
    if (params && params.length === 2) {
      if (params[0] === 'https://test.flipper.rw/authorized') {

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

        event.sender.send('received-login-message', [email, name, avatar, token, id, subscription]);
        authWindow.destroy();
      }
    }
  }
  authWindow.webContents.on('did-finish-load', (e: any, urls: string) => {
    console.log('did finish log');
    handleCallback();
  });
  authWindow.on('closed', () => {
    authWindow = null;
  });
});

///////////////////// AUTO UPDATED  /////////////////////////////


function sendStatusToWindow(text: string) {
  log.info(app.getVersion() + '::' + text);
  win.webContents.send('message', text);

  const dialogOpt = {
    type: 'info',
    buttons: ['Cancel'],
    title: 'Flipper Update',
    message: 'Updated the Flipper version(' + app.getVersion() + ')',
    detail: text,
  };

  showMessage(dialogOpt);
}

if (!isDev) {

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
    // tag
  });
  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available.');
  });
  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available.');
  });
  autoUpdater.on('error', (err: string) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  });
  autoUpdater.on('download-progress', (progressObj: { bytesPerSecond: string; percent: string; transferred: string; total: string; }) => {
    let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
    logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
    logMessage =
      logMessage +
      ' (' +
      progressObj.transferred +
      '/' +
      progressObj.total +
      ')';
    sendStatusToWindow(logMessage);
  });

  autoUpdater.on('update-downloaded', () => {
    const iconImage = nativeImage.createFromPath(path.join(__dirname, '../assets/logo.png'));
    const dialogOpt = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Flipper Update',
      message: 'Updated the Flipper version(' + app.getVersion() + ')',
      detail: 'A new version has been downloaded. Restart the application to apply the updates.',
      icon: iconImage
    };

    showMessage(dialogOpt);
    sendStatusToWindow('Update downloaded');

  });
}

function showMessage(dialogOpt: Electron.MessageBoxOptions) {
  const window = BrowserWindow.getFocusedWindow();
  dialog.showMessageBox(window, dialogOpt).then(response => {
    if (response) {
      autoUpdater.quitAndInstall();
    }
  }, error => {
    return dialog.showMessageBox(window, {
      type: 'error',
      message: error,
    });
  });
}

let iconName: string;

if (process.platform === 'win32') {
  iconName = path.join(__dirname, '../assets/win/icon.ico');
} else
  if (process.platform === 'darwin') {
    iconName = path.join(__dirname, '../assets/mac/icon.icns');
  } else {
    iconName = path.join(__dirname, '../assets/png/icon.png');
  }


function createWindow() {


  if (!isDev) {
    autoUpdater.checkForUpdates();
  }

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.

  win = new BrowserWindow({
    // kiosk:true, //support touch for enabled devices.
    x: 0,
    y: 0,
    frame: isWindows ? false : true, // Remove frame to hide default menu,
    width: size.width,
    height: size.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    icon: iconName
  });

  win.setMenu(null);

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    // win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
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
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') { app.quit(); }
  });


  app.on('activate', ()=> {
  if (win === null) { createWindow(); }
});


// Register an event listener. When ipcRenderer sends mouse click co-ordinates, show menu at that point.

/*eslint no-shadow: ["error", { "allow": ["args"] }]*/
/*eslint-env es6*/
  ipcMain.on(`display-app-menu`, (e, args)=> {
  if (isWindows && win) {
    menu.popup({
      window: win,
      x: args.x,
      y: args.y
    });
  }
});

} catch (e) {
  // Catch Error // throw e;
}
