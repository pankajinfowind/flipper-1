"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron = require("node-cron");
var fs = require("fs");
var log = require("electron-log");
var fetch = require('node-fetch');
var Sync = /** @class */ (function () {
    function Sync() {
        this.initSync();
    }
    Sync.prototype.initSync = function () {
        cron.schedule("* * * * *", function () {
            fetch('https://github.com/')
                .then(function (res) { return res.text(); })
                .then(function (body) { return log.info(body); });
        });
    };
    Sync.prototype.users = function () {
        // ipcMain.on("sync", (event, dataType) => {
        //   if (dataType == "customers") {
        //     DB.select('users').subscribe(users => {
        //       event.sender.send("hereIsYourData", users);
        //     });
        //   }
        // });
    };
    return Sync;
}());
exports.Sync = Sync;
//# sourceMappingURL=sync.js.map