import 'package:flipper/home/key_pad_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';

class Poswidget extends StatelessWidget {
  const Poswidget({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var moneyFormat =
        new MoneyMaskedTextController(leftSymbol: '\$', decimalSeparator: ".");
    //TODO: The change should be updated
    moneyFormat.updateValue(0);
    return KeyPadWidget();
//    return DefaultTabController(
//      length: 2,
//      child: Scaffold(
//        backgroundColor: Colors.white,
//        appBar: AppBar(
//          backgroundColor: Colors.white,
//          title: SizedBox(
//            height: 80,
//            width: MediaQuery.of(context).size.width / 1.02,
//            child: RaisedButton(
//              color: Colors.blue,
//              onPressed: () {},
//              child: Text(
//                "Charge " + moneyFormat.text,
//                style: TextStyle(
//                    color: Colors.white,
//                    fontSize: 20,
//                    fontFamily: "Heboo-Regular"),
//              ),
//            ),
//          ),
//          bottom: TabBar(
//            tabs: <Widget>[
//              Text("KEYPAD", style: TextStyle(color: Colors.black)),
//              Text(
//                "PRODUCTS",
//                style: TextStyle(color: Colors.black),
//              )
//            ],
//          ),
//        ),
//        body: TabBarView(
//          children: <Widget>[KeyPadWidget(), ProductWidget()],
//        ),
//      ),
//    );
  }
}
