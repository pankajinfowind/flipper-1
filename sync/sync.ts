
const cron = require("node-cron");
const fs = require("fs");
const log = require("electron-log");
import { DB } from '../db/db';
import { ipcMain, ipcRenderer } from 'electron';
var request = require('request');
const URI = "http://localhost:8000";
export class Sync {
  constructor() {
    this.initSync();
  }
  initSync() {
    // cron.schedule("* * * * *", function () {
    //   //fetching users

    //   //end of fetching users

    // });
  }
  users() {
    request({
      url: URI + '/api/item',
      headers: {
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFkM2EzMzEyNWZkYWI3NGZlMDRlYmViNjAyYTJiYmIwNjk1YjA2YzM5MmZlNTFlYmZhYWM4ZTgxYmU0MDExY2U5OTJjOGIxZjI0ZmY4N2ZkIn0.eyJhdWQiOiIxIiwianRpIjoiMWQzYTMzMTI1ZmRhYjc0ZmUwNGViZWI2MDJhMmJiYjA2OTViMDZjMzkyZmU1MWViZmFhYzhlODFiZTQwMTFjZTk5MmM4YjFmMjRmZjg3ZmQiLCJpYXQiOjE1NDYwNzMwNjYsIm5iZiI6MTU0NjA3MzA2NiwiZXhwIjoxNTQ3MzY5MDY1LCJzdWIiOiI2Iiwic2NvcGVzIjpbIioiXX0.b1-xyWY_Nkl_Lfptc7FEK4tUdxAIRI4g2NI7AFFCMoPcPDN_xKIqPAoOqV5cnAZlkmcz2OyWmbM3T1p37momjDmq0sIRy45dTgTgJBSu8m89bNGFN4BF78VwPg34feCh2x1P-dxnwmf00dSAvzc9M-WNhXm6M6EWKexy0-Aqjn6RuC_7NiQadPp08rsvx8L39Ez41qR1zUWTVBNA-1AkEyIOwxQsL9eUai7Mj4LCjs-VqrEf0u4gMgmCvNV-z7ydC8JdtK0B9XEBI9Nc3x7eE4pQsMRXP8Kkae9cRYr3x0473mtyOVlJ9ZMz5iXr_J1juBx5zvbtmF5x9Mc733UI3gucyFwTLIjepDyUd3EdccfmxGWC6BYpmuD3MhBGpbpIM6aoS69_sbMxrO8MYlIazzh98bz4ZwL0DBLuxKwLUrmh5O2Y-AAx6UukXOOt88siTI7Jynd-hMHni7AJ4QhNmKNv708nfnI6F_MxNLnJOJB3zzXWgT50XskJHhp6vX-Cr5AE4o1sw4yc-xF1eo6UG2GcsPr5ZXU9SQq48IHTMeryTO4PaZSGmdhvHjJ2gDCEHWECyMabr8z1luKQFQTRPQYHmPeuYnldmlplIK0__n0d7yWIQcNl_v34pZJ_zEUNDwLs3Cm7IPR8y_TRvS9y4c574buiTCR-bKqOXhCgfy0'
      },
      rejectUnauthorized: false
    }, function (err, response) {
      if (err) {

      } else {

      }
    });
  }

}
