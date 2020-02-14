import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/home/items/cost_price_widget.dart';
import 'package:flipper/home/items/retail_price_widget.dart';
import 'package:flipper/home/items/variation_widget.dart';
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
  String name;
}

class ViewItemScreen extends StatefulWidget {
  ViewItemScreen({Key key, @required this.itemId, @required this.itemName})
      : super(key: key);
  final int itemId;
  final String itemName;

  @override
  _ViewItemScreenState createState() => _ViewItemScreenState();
}

class _ViewItemScreenState extends State<ViewItemScreen> {
  final TForm tForm = new TForm();

  ActionsTableData _actions;

  ActionsTableData _actionsSaveItem;

  _onClose(BuildContext context) async {
    int branchId = StoreProvider.of<AppState>(context).state.branch.id;
    ItemTableData item = await StoreProvider.of<AppState>(context)
        .state
        .database
        .itemDao
        .getItemBy('tmp', branchId);

    //delete this item add look trough all variation and delete related variation.
    if (item != null) {
      List<VariationTableData> variations =
          await StoreProvider.of<AppState>(context)
              .state
              .database
              .variationDao
              .getVariantByItemId(item.id);
      for (var i = 0; i < variations.length; i++) {
        await StoreProvider.of<AppState>(context)
            .state
            .database
            .variationDao
            .deleteVariation(variations[i]);
      }
      StoreProvider.of<AppState>(context)
          .state
          .database
          .itemDao
          .deleteItem(item);
    }
    Router.navigator.pop(true);
  }

  Future<bool> _onWillPop() async {
    //if we have dirty db then show the alert or if is clean go back without alert
    int branchId = StoreProvider.of<AppState>(context).state.branch.id;

    ItemTableData item = await StoreProvider.of<AppState>(context)
        .state
        .database
        .itemDao
        .getItemBy('tmp', branchId);
    if (item == null) {
      Router.navigator.pop(false);
      return false;
    }
    //delete this item add look trough all variation and delete related variation.
    return (await showDialog(
          context: context,
          builder: (context) => new AlertDialog(
            title: new Text(
              'Are you sure?',
              style: TextStyle(color: Colors.black),
            ),
            content: new Text(
              'Do you want to exit an App',
              style: TextStyle(color: Colors.black),
            ),
            actions: <Widget>[
              new FlatButton(
                onPressed: () => Router.navigator.pop(false),
                child: new Text('No'),
              ),
              new FlatButton(
                // Navigator.of(context).pop(true)
                //todo: go and cleam the tmp item and variation created recently.
                onPressed: () {
                  _onClose(context);
                },
                child: new Text('Yes'),
              ),
            ],
          ),
        )) ??
        false;
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return StreamBuilder(
            stream: vm.database.variationDao
                .getVariationByItemIdStream(widget.itemId),
            builder:
                (context, AsyncSnapshot<List<VariationTableData>> snapshot) {
              if (snapshot.data == null) {
                return Text("");
              }

              return WillPopScope(
                onWillPop: _onWillPop,
                child: Scaffold(
                  appBar: CommonAppBar(
                    title: S.of(context).createItem,
                    disableButton: _actions == null ? true : _actions.isLocked,
                    showActionButton: true,
                    onPressedCallback: () async {
                      _handleFormSubmit(vm);
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
                                style: TextStyle(
                                    color: Colors
                                        .black), //todo: move this to app theme
                                validator: Validators.isStringHasMoreChars,
                                onChanged: (name) async {
                                  if (name == '') {
                                    _getSaveStatus(vm);
                                    _getSaveItemStatus(vm);
                                    if (_actions != null) {
                                      await vm.database.actionsDao.updateAction(
                                          _actions.copyWith(isLocked: true));
                                      _getSaveStatus(vm);
                                    }
                                    return;
                                  }
                                  _getSaveStatus(vm);
                                  _getSaveItemStatus(vm);
                                  if (_actions != null) {
                                    await vm.database.actionsDao.updateAction(
                                        _actions.copyWith(isLocked: false));
                                    _getSaveStatus(vm);
                                  }

                                  tForm.name = name;
                                },
                                decoration: InputDecoration(
                                    hintText: "Name", focusColor: Colors.black),
                              ),
                            ),
                          ),
                          Center(
                            child: Container(
                              width: 300,
                              child: GestureDetector(
                                onTap: () {
                                  Router.navigator
                                      .pushNamed(Router.addCategoryScreen);
                                },
                                child: ListTile(
                                  contentPadding:
                                      EdgeInsets.symmetric(horizontal: 0.3),
                                  leading: Text(S.of(context).category),
                                  trailing: Wrap(
                                    children: <Widget>[
                                      StreamBuilder(
                                        stream: vm.database.categoryDao
                                            .getCategoriesStream(),
                                        builder: (context,
                                            AsyncSnapshot<
                                                    List<CategoryTableData>>
                                                snapshot) {
                                          if (snapshot.data == null) {
                                            return Text(
                                                S.of(context).selectCategory);
                                          }
                                          return snapshot.data.length == 0
                                              ? Text(
                                                  S.of(context).selectCategory)
                                              : categorySelector(snapshot.data);
                                        },
                                      ),
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
                                  Router.navigator
                                      .pushNamed(Router.addUnitType);
                                },
                                child: ListTile(
                                  contentPadding:
                                      EdgeInsets.symmetric(horizontal: 0.3),
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
                          StreamBuilder(
                            stream: vm.database.variationDao
                                .getVariationByStream2(
                                    'Regular', widget.itemId),
                            builder: (context,
                                AsyncSnapshot<List<VariationTableData>>
                                    snapshot) {
                              if (snapshot.data == null) {
                                return Text("");
                              }
                              return snapshot.data.length == 0
                                  ? BuildRetailPriceWidget(
                                      vm: vm,
                                      context: context,
                                    )
                                  : Text("");
                            },
                          ),
                          StreamBuilder(
                            stream: vm.database.variationDao
                                .getVariationByStream2(
                                    'Regular', widget.itemId),
                            builder: (context,
                                AsyncSnapshot<List<VariationTableData>>
                                    snapshot) {
                              if (snapshot.data == null) {
                                return Text("");
                              }
                              return snapshot.data.length == 0
                                  ? BuildCostPriceWidget(
                                      vm: vm, context: context)
                                  : Text("");
                            },
                          ),
                          StreamBuilder(
                            stream: vm.database.variationDao
                                .getVariationByStream2(
                                    "Regular", widget.itemId),
                            builder: (context,
                                AsyncSnapshot<List<VariationTableData>>
                                    snapshot) {
                              if (snapshot.data == null) {
                                return Text("");
                              }
                              return snapshot.data.length == 0
                                  ? Center(
                                      child: Container(
                                        width: 300,
                                        child: TextFormField(
                                          style: TextStyle(color: Colors.black),
                                          onChanged: (sku) {
                                            tForm.sku = sku;
                                          },
                                          decoration: InputDecoration(
                                              hintText: "SKU",
                                              focusColor: Colors.blue),
                                        ),
                                      ),
                                    )
                                  : Text("");
                            },
                          ),
                          StreamBuilder(
                            stream: vm.database.variationDao
                                .getItemVariations2(widget.itemId),
                            builder: (context,
                                AsyncSnapshot<List<VariationTableData>>
                                    snapshot) {
                              if (snapshot.data == null) {
                                return Text("");
                              }
                              return snapshot.data != 0
                                  ? _buildVariationsList(snapshot.data)
                                  : Text("");
                            },
                          ),
                          Center(
                            child: SizedBox(
                              height: 50,
                              width: 340,
                              child: OutlineButton(
                                color: HexColor("#ecf0f1"),
                                child: Text(S.of(context).addVariation),
                                onPressed: () async {
                                  _getSaveStatus(vm);
                                  if (_actions != null) {
                                    vm.database.actionsDao.updateAction(
                                        _actions.copyWith(isLocked: true));

                                    Router.navigator
                                        .pushNamed(Router.addVariationScreen);
                                  }
                                },
                              ),
                            ),
                          ),
                          Center(
                            child: Container(
                              width: 300,
                              child: TextFormField(
                                style: TextStyle(color: Colors.black),
                                onChanged: (description) {
                                  tForm.description = description;
                                },
                              ),
                            ),
                          ),
                          Container(
                            height: 64,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            });
      },
    );
  }

  void _getSaveItemStatus(CommonViewModel vm) async {
    var result = await vm.database.actionsDao.getActionBy('saveItem');
    setState(() {
      _actionsSaveItem = result;
    });
  }

  void _getSaveStatus(CommonViewModel vm) async {
    var result = await vm.database.actionsDao.getActionBy('save');

    setState(() {
      _actions = result;
    });
    print(_actions);
  }

  Text categorySelector(List<CategoryTableData> categories) {
    Text text;
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].focused) {
        text = Text(categories[i].name);
        return text;
      } else {
        text = Text(S.of(context).selectCategory);
      }
    }
    return text;
  }

  _handleFormSubmit(CommonViewModel vm) async {
    ItemTableData item =
        await vm.database.itemDao.getItemBy('tmp', vm.branch.id);

    VariationTableData variation =
        await vm.database.variationDao.getVariationBy('tmp', vm.branch.id);

    if (variation != null) {
      StoreProvider.of<AppState>(context).dispatch(
        SaveRegular(
          price: variation.price,
          costPrice: variation.costPrice,
          itemId: item.id,
          name: 'Regular',
          id: variation.id,
        ),
      );
    }

    //set back the options as it was.
    vm.database.actionsDao
        .updateAction(_actionsSaveItem.copyWith(isLocked: true));

    vm.database.actionsDao.updateAction(_actions.copyWith(isLocked: true));

    //todo: also update unit Id of choosen item.
    vm.database.itemDao.updateItem(
      item.copyWith(
        name: tForm.name,
        updatedAt: DateTime.now(),
        color: vm.currentColor == null ? '#00cec9' : vm.currentColor.hexCode,
      ),
    );
    Router.navigator.maybePop();
  }

  _buildVariationsList(List<VariationTableData> variations) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < variations.length; i++) {
      if (variations[i].name != 'tmp') {
        list.add(
          Center(
            child: SizedBox(
              height: 90,
              width: 350,
              child:
                  VariationWidget(variation: variations[i], context: context),
            ),
          ),
        );
      }
    }
    if (list.length == 0) {
      return Container();
    }
    return Column(children: list);
  }
}
