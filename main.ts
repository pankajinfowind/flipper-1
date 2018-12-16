import { app, BrowserWindow, Tray, Menu, ipcMain, dialog } from "electron";
import * as path from "path";
import * as url from "url";
//update
import { windowStateKeeper } from "./win-state-keeper";

//TODO: make sure to fix icon thing it is not building
const mainWindowStateKeeper = windowStateKeeper("main");

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");
if (process.mas) app.setName("Flipper");
const debug = /--debug/.test(process.argv[2]);
const log = require("electron-log");
const { autoUpdater } = require("electron-updater");
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
const isDev = require("electron-is-dev");
function sendStatusToWindow(text) {
  log.info(app.getVersion() + "::" + text);
  win.webContents.send("message", text);
}
ipcMain.on("version-ping", (event, arg) => {
  event.sender.send("version-pong", app.getVersion());
});

if (!isDev) {
  autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow("Checking for update...");
    // tag
  });
  autoUpdater.on("update-available", info => {
    sendStatusToWindow("Update available.");
  });
  autoUpdater.on("update-not-available", info => {
    sendStatusToWindow("Update not available.");
  });
  autoUpdater.on("error", err => {
    sendStatusToWindow("Error in auto-updater. " + err);
  });
  autoUpdater.on("download-progress", progressObj => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    sendStatusToWindow(log_message);
  });
  autoUpdater.on("update-downloaded", info => {
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      // message: process.platform === 'win32' ? info : info,
      message: "updated the app",
      detail:
        "A new version has been downloaded. Restart the application to apply the updates."
    };
    dialog.showMessageBox(dialogOpts, response => {
      if (response === 0) autoUpdater.quitAndInstall();
    });
    sendStatusToWindow("Update downloaded");
  });
}

makeSingleInstance();
function createWindow() {
  const windowOptions = {
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    title: app.getName() + "Version:" + app.getVersion(),
    icon: path.join(__dirname, "src/assets/app-icon/png/64.png")
  };

  if (serve) {
    if (process.platform === "linux") {
      windowOptions.icon = path.join(
        __dirname,
        "src/assets/app-icon/png/64.png"
      );
    } else if (process.platform === "win32") {
      windowOptions.icon = path.join(
        __dirname,
        "src/assets/app-icon/png/64.png"
      );
    } else {
      windowOptions.icon = path.join(
        __dirname,
        "src/assets/app-icon/png/64.png"
      );
    }
  } else {
    if (process.platform === "linux") {
      windowOptions.icon = path.join(
        __dirname,
        "dist/assets/app-icon/png/64.png"
      );
    } else if (process.platform === "win32") {
      windowOptions.icon = path.join(
        __dirname,
        "dist/assets/app-icon/win/favicon.ico"
      );
    } else {
      //TODO: check if the icon work on the platforms
      windowOptions.icon = path.join(
        __dirname,
        "assets/app-icon/png/64.png"
      );
    }
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
  //win.localStorage.setItem("version", app.getVersion());
  // win.webContents.openDevTools();
  if (debug) {
    win.webContents.openDevTools();

    win.maximize();
    require("devtron").install();
  }
  //win.setMenu(null);
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
  let iconName;
  if (serve) {
    iconName =
      process.platform === "win32"
        ? "src/assets/tray-icon/windows-icon.png"
        : "src/assets/tray-icon/iconTemplate.png";
  } else {
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
  app.on("ready", createWindow);
  app.on("ready", function () {
    if (!isDev) {
      autoUpdater.checkForUpdatesAndNotify();
    }
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
} catch (e) { }

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
      // { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "maximize" }, { role: "close" }]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Report issue",
        click() {
          require("electron").shell.openExternal("https://flipper.yegobox.rw");
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);
