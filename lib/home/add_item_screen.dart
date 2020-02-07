import 'package:built_collection/src/list.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/model/disable.dart';
import 'package:flipper/model/variation.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/flitter_color.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:fluttertoast/fluttertoast.dart';

class TForm {
  String price;
  String sku;
  String description;
  String name;
}

class AddItemScreen extends StatefulWidget {
  AddItemScreen({Key key}) : super(key: key);

  @override
  _AddItemScreenState createState() => _AddItemScreenState();
}

class _AddItemScreenState extends State<AddItemScreen> {
  final TForm tForm = new TForm();

  Category _currentCategory;

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: S.of(context).createItem,
            disableButton: vm.currentDisable == null ||
                vm.currentDisable.unDisable == 'none',
            showActionButton: true,
            onPressedCallback: () {
              StoreProvider.of<AppState>(context).dispatch(
                AppAction(
                  actions: AppActions((a) => a..name = "saveItem"),
                ),
              );
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
                  Text(S.of(context).newItem),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        validator: Validators.isStringHasMoreChars,
                        onChanged: (name) {
                          if (name == '') {
                            StoreProvider.of<AppState>(context).dispatch(
                                CurrentDisable(
                                    disable:
                                        Disable((u) => u..unDisable = "none")));
                            return;
                          }
                          tForm.name = name;
                          StoreProvider.of<AppState>(context).dispatch(
                              CurrentDisable(
                                  disable: Disable(
                                      (u) => u..unDisable = "itemName")));
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
                          leading: Text(S.of(context).category),
                          trailing: Wrap(
                            children: <Widget>[
                              vm.categories.length == 0
                                  ? Text(S.of(context).selectCategory)
                                  : categorySelector(vm),
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
                      child: Text(S.of(context).priceAndInventory),
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
                          leading: Text(S.of(context).unityType),
                          trailing: Wrap(
                            children: <Widget>[
                              Text(vm.currentUnit != null
                                  ? vm.currentUnit.name
                                  : S.of(context).perItem),
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
                        keyboardType: TextInputType.number,
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        onChanged: (price) {
                          tForm.price = price;
                        },
                        decoration: InputDecoration(
                            hintText: S.of(context).price,
                            focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        decoration: InputDecoration(
                            hintText: "SKU", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  vm.variations.length > 0
                      ? _buildVariationsList(vm.variations)
                      : Text(""),
                  Center(
                    child: SizedBox(
                      height: 50,
                      width: 280,
                      child: FlatButton(
                        color: HexColor("#ecf0f1"),
                        child: Text(S.of(context).addVariation),
                        onPressed: () {
                          StoreProvider.of<AppState>(context).dispatch(
                            CurrentDisable(
                              disable: Disable((u) => u..unDisable = "none"),
                            ),
                          );
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
                  Text(S.of(context).leavePriceBlank),
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
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        onChanged: (description) {
                          tForm.description = description;
                        },
                        decoration: InputDecoration(
                            hintText: S.of(context).description,
                            focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Visibility(
                    visible: false,
                    child: FlatButton(
                      onPressed: vm.hasAction && vm.appAction.name == 'saveItem'
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

  Text categorySelector(CommonViewModel vm) {
    Text text;
    for (var i = 0; i < vm.categories.length; i++) {
      if (vm.categories[i].focused) {
        _currentCategory = vm.categories[i];
        text = Text(vm.categories[i].name);
        return text;
      } else {
        text = Text(S.of(context).selectCategory);
      }
    }
    return text;
  }

  _handleFormSubmit(CommonViewModel vm, TForm tForm) {
    if (tForm.name == null) {
      Fluttertoast.showToast(
          msg: S.of(context).youNeedNameOfYourProduct,
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return; // a toast
    }
    if (_currentCategory == null) {
      Fluttertoast.showToast(
          msg: S.of(context).youNeedCategoryOfYourProduct,
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return;
    }
    if (vm.currentBranch == null) {
      Fluttertoast.showToast(
          msg: S.of(context).branchError,
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return;
    }
    StoreProvider.of<AppState>(context).dispatch(
      SaveItemAction(
        business: vm.currentBusiness,
        name: tForm.name,
        description: tForm.description,
        price: tForm.price,
        branch: vm.currentBranch,
        color: vm.currentColor == null
            ? FlipperColors.blue
            : vm.currentColor.hexCode,
        variations: vm.variations.toList(),
        category: _currentCategory,
        unit: vm.currentUnit,
      ),
    );

    StoreProvider.of<AppState>(context).dispatch(
      AppAction(
        actions: AppActions((a) => a..name = "null"),
      ),
    );
    return;
  }

  _buildVariationsList(BuiltList<Variation> variations) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < variations.length; i++) {
      list.add(
        Center(
          child: SizedBox(
            height: 90,
            width: 350,
            child: ListView(children: <Widget>[
              ListTile(
                leading: Icon(
                  Icons.dehaze,
                ),
                subtitle:
                    Text("${variations[i].name} \nRWF ${variations[i].price}"),
                trailing:
                    Row(mainAxisSize: MainAxisSize.min, children: <Widget>[
                  FlatButton(
                    child: Text(
                      variations[i].stockValue == 0
                          ? S.of(context).receiveStock
                          : variations[i].stockValue.toString() +
                              S.of(context).inStock,
                    ),
                    onPressed: () {
                      Router.navigator.pushNamed(Router.receiveStock,
                          arguments: variations[i].id);
                    },
                  )
                ]),
                dense: true,
              )
            ]),
          ),
        ),
      );
    }
    if (list.length == 0) {
      return Container();
    }
    return Wrap(children: list);
  }
}
