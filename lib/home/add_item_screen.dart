import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/disable.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class TForm {
  String price;
  String sku;
  String description;
}

class AddItemScreen extends StatefulWidget {
  AddItemScreen({Key key}) : super(key: key);

  @override
  _AddItemScreenState createState() => _AddItemScreenState();
}

class _AddItemScreenState extends State<AddItemScreen> {
  final TForm tForm = new TForm();

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: "Create Item",
            disabledButtonColor: vm.currentDisable == null ||
                vm.currentDisable.unDisable == 'none',
            showActionButton: true,
            onPressedCallback: () {
              StoreProvider.of<AppState>(context).dispatch(AppAction(
                  actions: AppActions((a) => a..name = "showLoader")));
            },
            actionButtonName: S.of(context).save,
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: ListView(
            children: <Widget>[
              Column(
                children: <Widget>[
                  SizedBox(
                    height: 10,
                  ),
                  GestureDetector(
                    onTap: () {
                      Router.navigator.pushNamed(Router.editItemTitle);
                    },
                    child: Container(
                      height: 80,
                      width: 80,
                      color: vm.currentColor != null
                          ? HexColor(vm.currentColor.hexCode)
                          : HexColor("#00cec9"),
                    ),
                  ),
                  Text("New Item"),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: Colors.black),
                        validator: Validators.isStringHasMoreChars,
                        onChanged: (name) {
                          if (name == '') {
                            StoreProvider.of<AppState>(context).dispatch(
                                CurrentDisable(
                                    disable:
                                        Disable((u) => u..unDisable = "none")));
                            return;
                          }
                          StoreProvider.of<AppState>(context).dispatch(
                              CurrentDisable(
                                  disable: Disable(
                                      (u) => u..unDisable = "saveItem")));
                        },
                        decoration: InputDecoration(
                            hintText: "Name", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: GestureDetector(
                        onTap: () {
                          Router.navigator.pushNamed(Router.addCategoryScreen);
                        },
                        child: ListTile(
                          contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                          leading: Text("Category"),
                          trailing: Wrap(
                            children: <Widget>[
                              Text(vm.currentCategory != null
                                  ? vm.currentCategory.name
                                  : "Select Category"),
                              Icon(Icons.arrow_forward_ios)
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: Divider(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Container(
                    height: 24,
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: Text("PRICE AND INVENTORY"),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: Divider(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: GestureDetector(
                        onTap: () {
                          Router.navigator.pushNamed(Router.addUnitType);
                        },
                        child: ListTile(
                          contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                          leading: Text("Unit Type"),
                          trailing: Wrap(
                            children: <Widget>[
                              Text(vm.currentUnit != null
                                  ? vm.currentUnit.name
                                  : "Per Item"),
                              Icon(Icons.arrow_forward_ios)
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: Divider(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: Colors.black),
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        onChanged: (price) {
                          tForm.price = price;
                        },
                        decoration: InputDecoration(
                            hintText: "Price", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: Colors.black),
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        decoration: InputDecoration(
                            hintText: "SKU", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: ListTile(
                        contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                        leading: Text("Stock"),
                        trailing: FlatButton(
                          child: Text(
                            "Receive Stock",
                            style: TextStyle(color: HexColor('#0984e3')),
                          ),
                          onPressed: () {},
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: SizedBox(
                      height: 90,
                      width: 350,
                      child: ListView(children: <Widget>[
                        ListTile(
                          leading: Icon(
                            Icons.dehaze,
                          ),
                          subtitle: Text("Burger \nFrw 250"),
                          trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: <Widget>[
                                FlatButton(
                                  child: Text(
                                    "Receive stock",
                                    style:
                                        TextStyle(color: HexColor('#0984e3')),
                                  ),
                                  onPressed: () {},
                                )
                              ]),
                          dense: true,
                        )
                      ]),
                    ),
                  ),
                  Center(
                    child: SizedBox(
                      height: 50,
                      width: 280,
                      child: FlatButton(
                        color: HexColor("#ecf0f1"),
                        child: Text("Add Variation"),
                        onPressed: () {
                          Router.navigator.pushNamed(Router.addVariationScreen);
                        },
                      ),
                    ),
                  ),
                  Container(
                    height: 4,
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: Divider(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Container(
                    height: 4,
                  ),
                  Text("Leave the price blank to enter at the time of sale."),
                  Center(
                    child: Container(
                      width: 300,
                      child: Divider(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: Colors.black),
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        onChanged: (description) {
                          tForm.description = description;
                        },
                        decoration: InputDecoration(
                            hintText: "Description", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Visibility(
                    visible: false,
                    child: FlatButton(
                      onPressed:
                          vm.hasAction && vm.appAction.name == 'showLoader'
                              ? _handleFormSubmit(vm, tForm)
                              : null,
                      child: null,
                    ),
                  ),
                  Container(
                    height: 64,
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  _handleFormSubmit(CommonViewModel vm, TForm tForm) {
    print(vm.categoryName);
    print(vm.currentBusiness);
    print(tForm.price);
  }
}
