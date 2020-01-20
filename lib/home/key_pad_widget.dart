import 'package:flipper/home/widget/calculator-buttons.dart';
import 'package:flipper/presentation/widgets/payable_widget.dart';
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
    var moneyFormat =
        new MoneyMaskedTextController(leftSymbol: '\$', decimalSeparator: ".");
    moneyFormat.updateValue(0);

    return Scaffold(
      body:  Wrap(
        children: <Widget>[
          Align(
            child: PayableWidget(),
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            color: Colors.white30,
            child: ListTile(
              trailing: FlatButton(
                child: Text(
                  "Frw 500",
                  style: TextStyle(color: HexColor("#95a5a6")),
                ), onPressed: () {},
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
          CalculatorButtons(
            onTap: _onPress,
          )
        ],
      ),
    );
  }

  void _onPress({String buttonText}) {}
}
