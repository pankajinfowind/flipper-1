import 'dart:io';
import 'package:enexus/data/moor_database.dart';
import 'package:enexus/widgets/login.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'categories_page.dart';

void main() {
  _setTargetPlatformForDesktop();
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final db = Database();
    return MultiProvider(
      providers: [
        Provider(builder: (_) => db.tokenDao),
      ],
      child: MaterialApp(
        color: Colors.white,
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        title: "Login",
//        home: Login(),
        home:
            CategoriesPage(), //FIXME will keep login this is just for me to not hit login on each app restart
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

void _setTargetPlatformForDesktop() {
  TargetPlatform targetPlatform;
  if (Platform.isMacOS) {
    targetPlatform = TargetPlatform.iOS;
  } else if (Platform.isLinux || Platform.isWindows) {
    targetPlatform = TargetPlatform.android;
  }
  if (targetPlatform != null) {
    debugDefaultTargetPlatformOverride = targetPlatform;
  }
}
