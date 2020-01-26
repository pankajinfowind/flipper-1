import 'package:built_collection/built_collection.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/unit.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class AddUnitType extends StatefulWidget {
  AddUnitType({Key key}) : super(key: key);

  @override
  _AddUnitTypeState createState() => _AddUnitTypeState();
}

class _AddUnitTypeState extends State<AddUnitType> {
  Widget getUnitsWidgets(BuiltList<Unit> unitsList) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < unitsList.length; i++) {
      list.add(
        ListTile(
          title: Text(
            'Per ' + unitsList[i].name,
            style: TextStyle(color: Colors.black),
          ),
          trailing: Radio(
            value: unitsList[i].id,
            groupValue: unitsList[i].focused ? unitsList[i].id : 0,
            onChanged: (int value) {
              StoreProvider.of<AppState>(context)
                  .dispatch(WithUnitId(unitId: value));
              StoreProvider.of<AppState>(context)
                  .dispatch(UpdateUnitAction(unitId: value));
            },
          ),
        ),
      );
      list.add(Center(
        child: Container(
          width: 400,
          child: Divider(
            color: Colors.black,
          ),
        ),
      ));
    }
    return Wrap(children: list);
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: S.of(context).unityType,
            showActionButton: true,
            actionButtonName: S.of(context).save,
            onPressedCallback: () {
              StoreProvider.of<AppState>(context)
                  .dispatch(PersistFocusedUnitAction());

              StoreProvider.of<AppState>(context).dispatch(AppAction(
                  actions: AppActions((a) => a..name = "showLoader")));
            },
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: Column(
            children: <Widget>[
              Center(
                child: Container(
                  height: 40,
                  child: Divider(
                    color: Colors.black,
                  ),
                ),
              ),
              getUnitsWidgets(vm.units),
              Text("Edit units and precision in items> Units"),
              Visibility(
                visible: false,
                child: FlatButton(
                  child: Text("invisible button"),
                  onPressed: vm.hasAction && vm.appAction.name == 'showLoader'
                      ? _handleFormSubmit()
                      : null,
                ),
              )
            ],
          ),
        );
      },
    );
  }

  _handleFormSubmit() {
    StoreProvider.of<AppState>(context).dispatch(ResetAppAction());
    StoreProvider.of<AppState>(context).dispatch(CreateUnit());
  }
}
