import { app, BrowserWindow, Tray, Menu, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";

//const WindowStateManager = require('electron-window-state-manager');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");
if (process.mas) app.setName("Flipper");
const debug = /--debug/.test(process.argv[2]);
makeSingleInstance();

// Create a new instance of the WindowStateManager
// and pass it the name and the default properties
// const mainWindowState = new WindowStateManager('win', {
//   defaultWidth: 1080,
//   defaultHeight: 840
// });


function createWindow() {
  //const electronScreen = screen;
  //const size = electronScreen.getPrimaryDisplay().workAreaSize;

  const windowOptions = {
    width:1080,
    height: 840,
    title: app.getName(),
    icon: null,
    show: false
  };

if(serve){
  if (process.platform === "linux") {
    windowOptions.icon = path.join(__dirname, "src/assets/app-icon/png/512.png");
  } else if (process.platform === "win32") {
    windowOptions.icon = path.join(__dirname, "src/assets/app-icon/win/app.ico");
  } else {
    windowOptions.icon = path.join(__dirname, "src/assets/app-icon/mac/app.icns");
  }
}else{
  if (process.platform === "linux") {
    windowOptions.icon = path.join(__dirname, "dist/assets/app-icon/png/512.png");
  } else if (process.platform === "win32") {
    windowOptions.icon = path.join(__dirname, "dist/assets/app-icon/win/app.ico");
  } else {
    windowOptions.icon = path.join(__dirname, "dist/assets/app-icon/mac/app.icns");
  }
}
  // Create the browser window.
  win = new BrowserWindow(windowOptions);

  if (serve) {
    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    win.webContents.openDevTools();
    win.maximize();
    require("devtron").install();
  }
  win.setMenu(null);
  win.on("closed", () => {
    win = null;
  });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

let appIcon = null;

ipcMain.on("put-in-tray", event => {
  let iconName=null;
  if (serve) {
 iconName =
    process.platform === "win32"
      ? "src/assets/tray-icon/windows-icon.png"
      : "src/assets/tray-icon/iconTemplate.png";
  }else{
   iconName =
    process.platform === "win32"
      ? "dist/assets/tray-icon/windows-icon.png"
      : "dist/assets/tray-icon/iconTemplate.png";
  }
  const iconPath = path.join(__dirname, iconName);
  appIcon = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Remove",
      click: () => {
        event.sender.send("tray-removed");
      }
    }
  ]);

  appIcon.setToolTip("Flipper in the tray.");
  appIcon.setContextMenu(contextMenu);
});

ipcMain.on("remove-tray", () => {
  appIcon.destroy();
});

app.on("window-all-closed", () => {
  if (appIcon) appIcon.destroy();
});

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {

    createWindow();

     // You can check if the window was closed in a maximized saveState
    // If so you can maximize the BrowserWindow again
    // if (mainWindowState.maximized) {
    //   win.maximize();
    // }

  // Don't forget to save the current state
  // of the Browser window when it's about to be closed
      // win.on('close', () => {
      //     mainWindowState.saveState(win);
      // });

  });

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    //mainWindowState.saveState(win);
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    //mainWindowState.saveState(win);
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  console.log(e);
  // Catch Error
  // throw e;
}

/////////////////////////////////////////  MENU

const menu = Menu.buildFromTemplate([
  {
    label: app.getName(),
    submenu: [
      { role: "about",  click() {
        require("electron").shell.openExternal("https://flipper.yegobox.rw/abouts");
        }
     },
      { type: "separator" },
      { role: "quit" }
    ]
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },{
    label: "Developer",
    submenu: [
      { role: "toggledevtools" }
    ]
  },
  {
    label: "History",
    submenu: [{ role: "back" }, { role: "forward" }]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "maximize" }, { role: "close" }]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() {
          require("electron").shell.openExternal("https://flipper.yegobox.rw/help");
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);
