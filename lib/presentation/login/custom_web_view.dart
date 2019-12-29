import 'dart:async';

import 'package:flutter/material.dart';
//import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';

class CustomWebView extends StatefulWidget {
  CustomWebView({Key key}) : super(key: key);

  @override
  _CustomWebViewState createState() => _CustomWebViewState();
}

class _CustomWebViewState extends State<CustomWebView> {
//  final flutterWebviewPlugin = new FlutterWebviewPlugin();

  StreamSubscription _onDestroy;
  StreamSubscription<String> _onUrlChanged;
//  StreamSubscription<WebViewStateChanged> _onStateChanged;

//  @override
//  void dispose() {
//    // Every listener should be canceled, the same should be done with this stream.
//    _onDestroy.cancel();
//    _onUrlChanged.cancel();
//    _onStateChanged.cancel();
//    flutterWebviewPlugin.dispose();
//    super.dispose();
//  }
//
//  @override
//  void initState() {
//    super.initState();
//    flutterWebviewPlugin.close();
//    // Add a listener to on destroy WebView, so you can make came actions.
//    _onDestroy = flutterWebviewPlugin.onDestroy.listen((_) {});
//
//    _onStateChanged = flutterWebviewPlugin.onStateChanged
//        .listen((WebViewStateChanged state) {});
//    _onUrlChanged = flutterWebviewPlugin.onUrlChanged.listen((String url) {
//      if (mounted) {
//        //TODO: change the url on production env.
//        if (url.startsWith("https://test.flipper.rw/authorized?")) {
//          RegExp accessToken = new RegExp("access_token=(.*)");
//          var token = accessToken.firstMatch(url)?.group(1);
//
//          RegExp refreshToken = new RegExp("refresh_token=(.*)");
//          var tt = refreshToken.firstMatch(url)?.group(1);
//          flutterWebviewPlugin.close();
//
//          final _user = new UserData(
//              email: "sample@yegobox.com", //TODO: get this from after auth2
//              username: "username",
//              avatar: "Avatar",
//              status: "available",
//              bearerToken: token,
//              refreshToken: tt);
//
//          StoreProvider.of<AppState>(context)
//              .state
//              .database
//              .userDao
//              .insertUser(_user);
//          StoreProvider.of<AppState>(context).dispatch(UserAction);
//
//          if (tt != null || token != null) {
//            Navigator.of(context).pushNamedAndRemoveUntil(
//                Routes.dashboard, (Route<dynamic> route) => false);
//          }
//        }
//      }
//    });
//  }

  @override
  Widget build(BuildContext context) {
//    return WebviewScaffold(
//      url: "https://test.flipper.rw/login",
//      appBar: new AppBar(
//        title: new Text("Logging you to yegobox"),
//      ),
//    );
  }
}
