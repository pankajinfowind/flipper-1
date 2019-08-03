import 'dart:io';

import 'package:enexus/categories_page.dart' as categories;
import 'package:enexus/data/moor_database.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
//import 'package:moor_flutter/moor_flutter.dart' as v;
import 'package:provider/provider.dart';
import 'data/moor_database.dart';

void main() {
  _setTargetPlatformForDesktop();
  runApp(Login());
}

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final db = Database();
    return MultiProvider(
      providers: [
        Provider(builder: (_) => db.userDao),
      ],
      child: MaterialApp(
        color: Colors.white,
        title: "Login",
        home: _Login(),
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

class _Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          children: <Widget>[
            SizedBox(height: 220.0),
            Stack(
              children: <Widget>[
                Positioned(
                  child: Image.asset('assets/logo.png'),
                ),
              ],
            ),
            SizedBox(height: 90.0),
            TextField(
              decoration: InputDecoration(
                  labelText: 'username',
                  filled: true,
                  border: OutlineInputBorder()),
            ),
            SizedBox(height: 12.0),
            TextField(
              decoration: InputDecoration(
                  labelText: 'password',
                  filled: true,
                  border: OutlineInputBorder()),
              obscureText: true,
            ),
            Stack(
              children: <Widget>[
                FlatButton(
                  child: Text("Cancel"),
                  onPressed: () {},
                ),
                Positioned(
                  left: 200,
                  top: 8,
                  child: CupertinoButton(
                    color: Colors.blueAccent,
                    child: Stack(
                      children: <Widget>[
                        Text("Next"),
                      ],
                    ),
                    borderRadius: const BorderRadius.all(Radius.circular(0.0)),
                    onPressed: () => goToProductsPages(context),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  //functions
  void goToProductsPages(context) {
    //check if we are logged in
    //is the user login in then go to next page or show login error
    //insert data in database and log the response
//    final dao = Provider.of<UserDao>(context);
//    final user = UserCompanion(
//      id: v.Value(1),
//      username: v.Value("richie"),
//      email: v.Value("b@gmail.com"),
//      avatar: v.Value("http"),
//    );
//    dao.insertUser(user);

    //select users
//    print(dao.watchUsers());

    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => categories.CategoriesPage()),
    );
  }
}
