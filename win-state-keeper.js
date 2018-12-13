"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appConfig = require("electron-settings");
///building this.windowStateKeeper
///building windowStateKeeper
function windowStateKeeper(windowName) {
    var window, windowState;
    function setBounds() {
        // Restore from appConfig
        if (appConfig.has("windowState." + windowName)) {
            windowState = appConfig.get("windowState." + windowName);
            return;
        }
        // Default
        windowState = {
            x: undefined,
            y: undefined,
            width: 1100,
            height: 800,
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