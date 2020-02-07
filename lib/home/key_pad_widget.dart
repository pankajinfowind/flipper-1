import 'package:flipper/home/widget/calculator-buttons.dart';

import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';

class KeyPadWidget extends StatefulWidget {
  KeyPadWidget({Key key}) : super(key: key);

  @override
  _KeyPadWidgetState createState() => _KeyPadWidgetState();
}

class _KeyPadWidgetState extends State<KeyPadWidget> {
  @override
  Widget build(BuildContext context) {
    var moneyFormat = new MoneyMaskedTextController(
        leftSymbol: '\RWF', decimalSeparator: ".");
    moneyFormat.updateValue(500);

    return Scaffold(
      body: Wrap(
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width,
            color: Colors.white30,
            child: ListTile(
              trailing: FlatButton(
                child: Text(
                  moneyFormat.text,
                  style: TextStyle(color: Colors.black, fontSize: 30),
                ),
                onPressed: () {},
              ),
              leading: FlatButton(
                onPressed: () {
                  Router.navigator.pushNamed(Router.bottom);
                },
                child: Text(
                  "Add a note",
                  style: TextStyle(color: HexColor("#95a5a6")),
                ),
              ),
            ),
          ),
          CalculatorButtons()
        ],
      ),
    );
  }
}
