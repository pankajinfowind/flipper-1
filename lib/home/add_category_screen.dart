import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
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
              ListTile(
                title: const Text(
                  'Per Item',
                  style: TextStyle(color: Colors.black),
                ),
                trailing: Radio(
                  value: CategoriesEnum.beverage,
                  groupValue: _type,
                  onChanged: (CategoriesEnum value) {
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
                  value: CategoriesEnum.ikawa,
                  groupValue: _type,
                  onChanged: (CategoriesEnum value) {
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
                  value: CategoriesEnum.drinks,
                  groupValue: _type,
                  onChanged: (CategoriesEnum value) {
                    setState(() {
                      _type = value;
//                      final category = Category((a) => a..name = _type);
//                      StoreProvider.of<AppState>(context)
//                          .state
//                          .rebuild((a) => a..category = category.toBuilder());
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

    StoreProvider.of<AppState>(context).dispatch(CreateCategory());
  }
}
