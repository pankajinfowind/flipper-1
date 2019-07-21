import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';


void main() => runApp(Login());

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: CupertinoApp(
        color: Colors.white,
        title: "Login",
        home: _Login(),
        debugShowCheckedModeBanner: false,
      ),
    );
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
            SizedBox(height: 20.0),
            Column(
              children: <Widget>[

              ],
            )
          ],
        ),
      ),
    );
  }

}