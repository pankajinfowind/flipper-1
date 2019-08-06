import 'dart:async';

import 'package:enexus/util/network_util.dart';

import 'models/user.dart';

class RestDatasource {
  NetworkUtil _netUtil = new NetworkUtil();
  // ignore: non_constant_identifier_names
  static final BASE_URL = "https://flipper.yegobox.rw";
  // ignore: non_constant_identifier_names
  static final LOGIN_URL = BASE_URL + "/oauth/token";
  // ignore: non_constant_identifier_names
  static final FLIPPER_CLIENT_ID = "3";
  // ignore: non_constant_identifier_names
  static final FLIPPER_CLIENT_SECRET =
      "RUTDsP6wlpbHVJ9eMnJre5ADBwbkkeXLAGPo5ogm";

  Future<User> login(String username, String password) {
    return _netUtil.post(LOGIN_URL, body: {
      "client_id": FLIPPER_CLIENT_ID,
      "client_secret": FLIPPER_CLIENT_SECRET,
      "username": username,
      "password": password,
      "grant_type": "password"
    }).then((dynamic res) {
      print(res.toString());
      return new User.map(res);
    }).catchError((dynamic onError) {
      print(onError["error_msg"]);
    });
  }
}
