import 'package:built_collection/src/list.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

enum CategoriesEnum { beverage, drinks, ikawa }

class AddCategoryScreen extends StatefulWidget {
  AddCategoryScreen({Key key}) : super(key: key);

  @override
  _AddCategoryScreenState createState() => _AddCategoryScreenState();
}

class _AddCategoryScreenState extends State<AddCategoryScreen> {
  CategoriesEnum _type = CategoriesEnum.beverage;

  getUnitsWidgets(BuiltList<Category> categories) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < categories.length; i++) {
      list.add(
        ListTile(
          title: Text(
            'Per ' + categories[i].name,
            style: TextStyle(color: Colors.black),
          ),
          trailing: Radio(
            value: categories[i].id,
            groupValue: categories[i].focused ? categories[i].id : 0,
            onChanged: (int value) {
              //StoreProvider.of<AppState>(context)
              //    .dispatch(WithUnitId(unitId: value));
              //StoreProvider.of<AppState>(context)
              //  .dispatch(UpdateUnitAction(unitId: value));
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
            title: S.of(context).category,
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
              getUnitsWidgets(vm.categories),
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

    StoreProvider.of<AppState>(context).dispatch(CreateCategory());
  }
}
