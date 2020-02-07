import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/key_pad.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:vibration/vibration.dart';

class CalculatorButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double padWidth = 136.99;
    final padding = EdgeInsets.fromLTRB(55, 21, 20, 20);
    final style = TextStyle(fontSize: 40, fontFamily: "Heebo-Thin");

    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Wrap(
          children: <Widget>[
            SizedBox(
              width: padWidth,
              child: InkWell(
                enableFeedback: false,
                onTap: () async {
                  if (await Vibration.hasVibrator()) {
                    Vibration.vibrate(amplitude: 60);
                    StoreProvider.of<AppState>(context).dispatch(
                      KayPadAction(
                        keyPad: KeyPad((k) => k
                          ..amount = vm.keypad == null
                              ? 1
                              : int.parse(vm.keypad.amount.toString() + "1")
                          ..note = "note"),
                      ),
                    );
                  }
                },
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('1', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('2', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('3', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('4', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('5', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('6', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('7', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('8', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('9', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {
                  //clean the state
                  StoreProvider.of<AppState>(context).dispatch(CleanKeyPad());
                },
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('C', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('0', style: style),
                ),
              ),
            ),
            SizedBox(
              width: padWidth,
              child: InkWell(
                onTap: () {},
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 0.3,
                    ),
                  ),
                  padding: padding,
                  child: Text('+', style: style),
                ),
              ),
            )
          ],
        );
      },
    );
  }
}
