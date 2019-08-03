import 'package:enexus/categories_page.dart' as categories;
import 'package:enexus/data/moor_database.dart';
import 'package:enexus/main.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'data/moor_database.dart';

class VerifyPassword extends StatelessWidget {
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
//            show profile pic of identified user.
            Container(
              child: Center(
                child: ActionChip(
                    avatar: CircleAvatar(
//                      backgroundColor: Colors.white,
                      child: Image.asset("assets/cm0.jpeg"),
                    ),
                    backgroundColor: Colors.white,
                    labelStyle: TextStyle(
                        color: Color(0xff000000),
                        fontSize: 14.0,
                        fontWeight: FontWeight.bold),
                    label: Text('beastar457@gmail.com'),
                    onPressed: () {}),
              ),
            ),
            SizedBox(height: 40.0),
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
                  child: Text("Back"),
                  onPressed: () => goBack(context),
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
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => categories.CategoriesPage()),
    );
  }

  void goBack(context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => Login()),
    );
  }
}
