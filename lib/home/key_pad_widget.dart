import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/home/widget/button.dart';
import 'package:flipper/home/widget/calculator-buttons.dart';
import 'package:flipper/presentation/home/common_view_model.dart';

import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';
import 'package:flutter_redux/flutter_redux.dart';

class KeyPadWidget extends StatefulWidget {
  KeyPadWidget({Key key}) : super(key: key);

  @override
  _KeyPadWidgetState createState() => _KeyPadWidgetState();
}

class _KeyPadWidgetState extends State<KeyPadWidget> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        var moneyFormat = new MoneyMaskedTextController(
            leftSymbol: '\RWF', decimalSeparator: ".", thousandSeparator: ",");

        double cleanValue = 0;
        if (vm.keypad != null) {
          cleanValue = vm.keypad.amount.toDouble();
          if (vm.keypad.amount.toDouble() == 1111111111.0) {
            print("it is time to change");
            cleanValue = 999999.99;
          }
        }
        moneyFormat
            .updateValue(vm.keypad == null ? 0.00 : cleanValue.toDouble());

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

              KeyPadButtons() //todo: rename it better.
            ],
          ),
        );
      },
    );
  }
}
