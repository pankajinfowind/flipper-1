"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appConfig = require("electron-settings");
var electron_1 = require("electron");
///building this.windowStateKeeper
///building windowStateKeeper
function windowStateKeeper(windowName) {
    var window, windowState;
    function setBounds() {
        var electronScreen = electron_1.screen;
        var size = electronScreen.getPrimaryDisplay().workAreaSize;
        // Restore from appConfig
        if (appConfig.has("windowState." + windowName)) {
            windowState = appConfig.get("windowState." + windowName);
            return;
        }
        // Default
        windowState = {
            x: undefined,
            y: undefined,
            width: size.width,
            height: size.height
        };
    }
    function saveState() {
        if (!windowState.isMaximized) {
            windowState = window.getBounds();
        }
        windowState.isMaximized = window.isMaximized();
        appConfig.set("windowState." + windowName, windowState);
    }
    function track(win) {
        window = win;
        ['resize', 'move', 'close'].forEach(function (event) {
            win.on(event, saveState);
        });
    }
    setBounds();
    return ({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        isMaximized: windowState.isMaximized,
        track: track,
    });
}
exports.windowStateKeeper = windowStateKeeper;
//# sourceMappingURL=win-state-keeper.js.map