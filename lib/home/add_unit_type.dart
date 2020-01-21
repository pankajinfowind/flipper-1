import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

enum UnityTypes { item, pound, ounce, kg }

class AddUnitType extends StatefulWidget {
  AddUnitType({Key key}) : super(key: key);

  @override
  _AddUnitTypeState createState() => _AddUnitTypeState();
}

class _AddUnitTypeState extends State<AddUnitType> {
  UnityTypes _type = UnityTypes.item;

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: S.of(context).unityType,
            actionButton: FlatButton(
              onPressed: () {
                StoreProvider.of<AppState>(context).dispatch(AppAction(
                    actions: AppActions((a) => a..name = "saveUnit")));
              },
              child: Text(
                S.of(context).save,
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
              Center(
                child: Container(
                  width: 400,
                  child: Divider(
                    color: Colors.black,
                  ),
                ),
              ),
              ListTile(
                title: const Text(
                  'Per Item',
                  style: TextStyle(color: Colors.black),
                ),
                trailing: Radio(
                  value: UnityTypes.item,
                  groupValue: _type,
                  onChanged: (UnityTypes value) {
                    setState(() {
                      _type = value;
                    });
                  },
                ),
              ),
              Center(
                child: Container(
                  width: 400,
                  child: Divider(
                    color: Colors.black,
                  ),
                ),
              ),
              ListTile(
                title: const Text(
                  'Per ounce',
                  style: TextStyle(color: Colors.black),
                ),
                trailing: Radio(
                  value: UnityTypes.pound,
                  groupValue: _type,
                  onChanged: (UnityTypes value) {
                    setState(() {
                      _type = value;
                    });
                  },
                ),
              ),
              Center(
                child: Container(
                  width: 400,
                  child: Divider(
                    color: Colors.black,
                  ),
                ),
              ),
              ListTile(
                title: const Text(
                  'Per Pound',
                  style: TextStyle(color: Colors.black),
                ),
                trailing: Radio(
                  value: UnityTypes.ounce,
                  groupValue: _type,
                  onChanged: (UnityTypes value) {
                    setState(() {
                      _type = value;
                    });
                  },
                ),
              ),
              Container(
                height: 20,
              ),
              Center(
                child: SizedBox(
                  height: 50,
                  width: 380,
                  child: FlatButton(
                    color: HexColor("#ecf0f1"),
                    child: Text("Create Unit"),
                    onPressed: () {},
                  ),
                ),
              ),
              Container(
                height: 20,
              ),
              Text("Edit units and precision in items> Units"),
              Visibility(
                visible: false,
                child: FlatButton(
                  child: Text("invisible button"),
                  onPressed: vm.hasAction && vm.appAction.name == 'saveUnit'
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
    //TODO: broadcast a unit being saved
    //TODO: persist a unit to default to when coming back to the screen!.
    print(_type);
  }
}
