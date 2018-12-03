import { app, BrowserWindow, Tray, Menu, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");
if (process.mas) app.setName("Flipper");
const debug = /--debug/.test(process.argv[2]);
const log = require("electron-log");
// const { autoUpdater } = require("electron-updater");
// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = "info";
//
// function sendStatusToWindow(text) {
//   // log.info(text);
//   win.webContents.send("message", text);
// }
//
// autoUpdater.on("checking-for-update", () => {
//   sendStatusToWindow("Checking for update...");
//   // tag
// });
// autoUpdater.on("update-available", info => {
//   sendStatusToWindow("Update available.");
// });
// autoUpdater.on("update-not-available", info => {
//   sendStatusToWindow("Update not available.");
// });
// autoUpdater.on("error", err => {
//   sendStatusToWindow("Error in auto-updater. " + err);
// });
// autoUpdater.on("download-progress", progressObj => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + " - Downloaded " + progressObj.percent + "%";
//   log_message =
//     log_message +
//     " (" +
//     progressObj.transferred +
//     "/" +
//     progressObj.total +
//     ")";
//   sendStatusToWindow(log_message);
// });
// autoUpdater.on("update-downloaded", info => {
//   sendStatusToWindow("Update downloaded");
// });
makeSingleInstance();
function createWindow() {
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    icon: null
  };

  if (process.platform === "linux") {
    windowOptions.icon = path.join(__dirname, "app-icon/png/512.png");
  } else if (process.platform === "win32") {
    windowOptions.icon = path.join(__dirname, "app-icon/win/app.ico");
  } else {
    windowOptions.icon = path.join(__dirname, "app-icon/mac/app.icns");
  }
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

    win.webContents.openDevTools();
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
  const iconName =
    process.platform === "win32"
      ? "tray/windows-icon.png"
      : "tray/iconTemplate.png";
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

  app.on("ready", createWindow);
  app.on("ready", function() {
    // autoUpdater.checkForUpdatesAndNotify();
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {}

/////////////////////////////////////////  MENU

const menu = Menu.buildFromTemplate([
  {
    label: app.getName(),
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services", submenu: [] },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
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
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
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
          require("electron").shell.openExternal("https://flipper.yegobox.rw");
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);
