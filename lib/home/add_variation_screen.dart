import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';

class AddVariationScreen extends StatefulWidget {
  AddVariationScreen({Key key}) : super(key: key);

  @override
  _AddVariationScreenState createState() => _AddVariationScreenState();
}

class _AddVariationScreenState extends State<AddVariationScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        title: "Add Variation",
        actionButton: FlatButton(
          onPressed: () {},
          child: Text(
            "Save",
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(color: Colors.white),
          ),
        ),
        icon: Icons.close,
        multi: 3,
        bottomSpacer: 48,
      ),
      body: (ListView(
        children: <Widget>[
          Column(
            children: <Widget>[
              Container(
                height: 20,
              ),
              Center(
                child: Container(
                  width: 400,
                  child: Divider(
                    color: Colors.black,
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: 300,
                  child: ListTile(
                    contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                    leading: Text("Unit Type"),
                    trailing: Wrap(
                      children: <Widget>[
                        Text("Unit Type"),
                        Icon(Icons.arrow_forward_ios)
                      ],
                    ),
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: 300,
                  child: TextFormField(
                    style: TextStyle(color: Colors.black),
                    validator: Validators.isStringHasMoreChars,
                    onSaved: (name) {},
                    decoration: InputDecoration(
                        hintText: "Name", focusColor: Colors.blue),
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: 300,
                  child: TextFormField(
                    style: TextStyle(color: Colors.black),
                    validator: Validators.isStringHasMoreChars,
                    onSaved: (name) {},
                    decoration: InputDecoration(
                        hintText: "Price", focusColor: Colors.blue),
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: 300,
                  child: TextFormField(
                    style: TextStyle(color: Colors.black),
                    validator: Validators.isStringHasMoreChars,
                    onSaved: (name) {},
                    decoration: InputDecoration(
                        hintText: "SKU", focusColor: Colors.blue),
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: 300,
                  child: TextFormField(
                    style: TextStyle(color: Colors.black),
                    validator: Validators.isStringHasMoreChars,
                    onSaved: (name) {},
                    decoration: InputDecoration(
                        hintText: "Stock", focusColor: Colors.blue),
                  ),
                ),
              ),
              Text("Leave the price blank to enter at the time of sale.")
            ],
          )
        ],
      )),
    );
  }
}
