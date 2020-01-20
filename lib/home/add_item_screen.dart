
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';

class AddItemScreen extends StatefulWidget {
  AddItemScreen({Key key}) : super(key: key);

  @override
  _AddItemScreenState createState() => _AddItemScreenState();
}

class _AddItemScreenState extends State<AddItemScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        title: "Create Item",
        actionButton: FlatButton(
          onPressed: () {

          },
          child: Text(
            "Save",
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(color: Colors.white),
          ),
        ),
        icon: Icons.close,
        multi: 3,
        bottomSpacer: 52,
      ),
      body: Column(
        children: <Widget>[
            Align(
              child: Column(
                children: <Widget>[
                  SizedBox(height: 10,),
                  GestureDetector(
                    onTap: (){
                      Router.navigator.pushNamed(Router.editItemTitle);
                    },
                    child: Column(
                      children: <Widget>[
                        Container(
                          height: 80,
                          width: 80,
                          color: Colors.yellow,
                        ),
                        Text("New Item")
                      ],
                    ),
                  ),
                ],
              ),
            )
        ],
      ),
    );
  }
}