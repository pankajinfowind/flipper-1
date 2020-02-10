import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/key_pad.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class KeyPadButtons extends StatefulWidget {
  KeyPadButtons({Key key}) : super(key: key);

  @override
  _KeyPadButtonsState createState() => _KeyPadButtonsState();
}

class _KeyPadButtonsState extends State<KeyPadButtons> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Container(
          child: Container(
              child: Wrap(
            children: _getItems(vm),
          )),
        );
      },
    );
  }

  List<Widget> _getItems(CommonViewModel vm) {
    List<int> list = new List<int>();
    list.addAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    List<Widget> widget = new List<Widget>();

    for (var i = 1; i < list.length; i++) {
      widget.add(
        SingleKey(
          i: i.toString(),
          vm: vm,
        ),
      );
    }
    widget.add(SingleKey(
      i: "0",
      vm: vm,
    ));
    widget.add(SingleKey(
      i: "C",
      vm: vm,
    ));
    widget.add(SingleKey(
      i: "+",
      vm: vm,
    ));
    return widget;
  }
}

class SingleKey extends StatelessWidget {
  const SingleKey({
    Key key,
    @required this.i,
    this.vm,
  }) : super(key: key);

  final String i;
  final CommonViewModel vm;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 136.99,
      child: InkWell(
        enableFeedback: false,
        onTap: () async {
          StoreProvider.of<AppState>(context).dispatch(
            KayPadAction(
              keyPad: KeyPad((k) => k
                ..amount = vm.keypad == null
                    ? 1
                    : int.parse(vm.keypad.amount.toString() + "1")
                ..note = "note"),
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: Color.fromRGBO(0, 0, 0, 0.1),
              width: 0.5,
            ),
          ),
          padding: EdgeInsets.fromLTRB(55, 21, 20, 20),
          child: Text(i.toString(),
              style: TextStyle(fontSize: 40, fontFamily: "Heebo-Thin")),
        ),
      ),
    );
  }
}
