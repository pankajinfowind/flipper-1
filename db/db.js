"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('./knex');
var knex = require('knex')(config);
var rxjs_1 = require("rxjs");
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.select = function (table) {
        var promise = knex.raw('select * from ' + table);
        return rxjs_1.from(promise);
    };
    DB.insert = function (table, insertable) {
        var promise = knex(table).insert(insertable);
        return rxjs_1.from(promise);
    };
    return DB;
}());
exports.DB = DB;
//# sourceMappingURL=db.js.map