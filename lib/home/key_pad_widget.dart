import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/bottom_sheet/bottom_sheet_actions.dart';
import 'package:flipper/model/sheet.dart';
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
    var moneyFormat =
        new MoneyMaskedTextController(leftSymbol: '\$', decimalSeparator: ".");
    moneyFormat.updateValue(0);
    double padWidth = 137.1;
    double spacing = 105;
    return Scaffold(
      body: Wrap(
        children: <Widget>[
          Align(
            child: Container(
              width: 350,
              color: Colors.blue,
              child: Row(
                children: <Widget>[
                  SizedBox(
                    child: FlatButton(
                      color: Colors.blue,
                      onPressed: () {},
                      child: Text(
                        "Tickets",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontFamily: "Heboo-Regular"),
                      ),
                    ),
                  ),
                  SizedBox(
                    child: FlatButton(
                      color: Colors.blue,
                      onPressed: () {},
                      child: Text(
                        "Charge",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontFamily: "Heboo-Regular"),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            color: Colors.white30,
            child: ListTile(
              trailing: FlatButton(
                child: Text(
                  "500",
                  style: TextStyle(color: HexColor("#95a5a6")),
                ),
              ),
              leading: FlatButton(
                onPressed: () {
                  final sheet = Sheets((u) => u
                    ..name = "ADDNOTE"
                    ..type = Type.ADDNOTE);
                  StoreProvider.of<AppState>(context)
                      .dispatch(OnBottomSheetChanged(sheet: sheet));
                },
                child: Text(
                  "Add note",
                  style: TextStyle(color: HexColor("#95a5a6")),
                ),
              ),
            ),
          ),
          SizedBox(
            height: 20,
          ),
          SizedBox(
            width: padWidth,
            child: SizedBox(
              width: padWidth,
              child: InkWell(
                // When the user taps the button, show a snackbar.
                onTap: () {},
                child: Container(
                  padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                  child: Text('1', style: TextStyle(fontSize: 40)),
                ),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('2', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('3', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            height: spacing,
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('4', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('5', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('6', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            height: spacing,
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('7', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('8', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('9', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            height: spacing,
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('C', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('0', style: TextStyle(fontSize: 40)),
              ),
            ),
          ),
          SizedBox(
            width: padWidth,
            child: InkWell(
              // When the user taps the button, show a snackbar.
              onTap: () {},
              child: Container(
                padding: EdgeInsets.fromLTRB(40, 0, 0, 0),
                child: Text('+', style: TextStyle(fontSize: 40)),
              ),
            ),
          )
        ],
      ),
    );
  }
}
