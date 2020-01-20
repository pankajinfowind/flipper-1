import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';

class CreateOptionsWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return  AlertDialog(
      content: Form(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Container(
                width: double.infinity,
                height: 60,
                child: FlatButton(
                  color: HexColor("#4bcffa"),
                  onPressed: () {
                    Router.navigator.pushNamed(Router.addItemScreen);
                  },
                  child: Text(
                    "Create Item",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontFamily: "Heboo-Regular"),
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Container(
                color: Colors.white70,
                width: double.infinity,
                child: FlatButton(
                  onPressed: () {},
                  child: Text(
                    "Create Discount",
                    style: TextStyle(
                        color: Colors.blue,
                        fontSize: 20,
                        fontFamily: "Heboo-Regular"),
                  ),
                ),
              ),
            ),
            Container(
              width: double.infinity,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: FlatButton(
                  child: Text(
                    "Dismiss",
                    style: TextStyle(
                        color: Colors.blue,
                        fontSize: 20,
                        fontFamily: "Heboo-Regular"),
                  ),
                  onPressed: () {

                  },
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
