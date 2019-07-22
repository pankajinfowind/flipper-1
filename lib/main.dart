import 'package:enexus/categories_page.dart' as categories;
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
                Image.asset('assets/cm1.jpeg'),
                SizedBox(height: 20.0)
              ],
            ),
            SizedBox(height: 120.0),
            TextField(
              decoration: InputDecoration(
                labelText: 'username',
                filled: true,
                border: OutlineInputBorder()
              ),
            ),
            SizedBox(height: 12.0),
            TextField(
              decoration: InputDecoration(
                labelText: 'password',
                filled: true,
                border: OutlineInputBorder()
              ),
              obscureText: true,
            ),
            ButtonBar(
              children: <Widget>[
                FlatButton(
                  child: Text("Cancel"),
                  onPressed: (){
                  },
                 ),
                RaisedButton(
                  color: Colors.blueAccent,
                  textColor: Colors.white,
                  child: Text("Next"),
                  onPressed: (){
                    Navigator.push(
                      context,
                      //got to nextPage this is how we do it.
                      MaterialPageRoute(builder: (context) => categories.CategoriesPage()),
                    );
                  },
                )
              ],
            )
          ],
        ),
      ),
    );
  }
//start learning how to use http should finish login today! learn if I should use block here.
//  Future<http.Response> fetchPost() {
//    return http.get('https://jsonplaceholder.typicode.com/posts/1');
//  }
}