import 'dart:math';

import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/disable.dart';
import 'package:flipper/model/variation.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class AddVariationScreen extends StatefulWidget {
  AddVariationScreen({Key key}) : super(key: key);

  @override
  _AddVariationScreenState createState() => _AddVariationScreenState();
}

class _AddVariationScreenState extends State<AddVariationScreen> {
  String name;
  String price;
  String sku;

  ActionsTableData _actions;
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        vm.database.actionsDao.getActionByStream('save').listen((event) {
          setState(() {
            _actions = event[0];
          });
        });
        return Scaffold(
          appBar: new CommonAppBar(
            title: S.of(context).addVariation,
            showActionButton: true,
            disableButton: _actions.isLocked,
            actionButtonName: S.of(context).save,
            onPressedCallback: () async {
              ItemTableData item =
                  await vm.database.itemDao.getItemBy('tmp', vm.branch.id);
              VariationTableData variation = await vm.database.variationDao
                  .getVariationBy('tmp', vm.branch.id);
              StoreProvider.of<AppState>(context).dispatch(
                SaveRegular(
                  price: variation.price,
                  itemId: item.id,
                  name: 'Regular',
                  id: variation.id,
                ),
              );
              //insert the variation.
              vm.database.variationDao.insert(
                //ignore:missing_required_param
                VariationTableData(
                  name: name,
                  price: int.parse(price),
                  branchId: vm.branch.id,
                  createdAt: DateTime.now(),
                  count: 0,
                  isActive: false,
                  itemId: item.id,
                ),
              );
              vm.database.actionsDao
                  .updateAction(_actions.copyWith(isLocked: true));
              Router.navigator.maybePop();
            },
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: Container(
            child: ListView(
              children: <Widget>[
                Column(
                  children: <Widget>[
                    Container(
                      height: 20,
                    ),
                    Center(
                      child: Container(
                        width: 400,
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
                            contentPadding:
                                EdgeInsets.symmetric(horizontal: 0.3),
                            leading: Text(S.of(context).unityType),
                            trailing: Wrap(
                              children: <Widget>[
                                Text(vm.currentUnit != null
                                    ? vm.currentUnit.name
                                    : S.of(context).unityType),
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
                        child: TextFormField(
                          style: TextStyle(color: Colors.black),
                          validator: Validators.isStringHasMoreChars,
                          onChanged: (_name) {
                            if (_name == '') {
                              vm.database.actionsDao.updateAction(
                                  _actions.copyWith(isLocked: true));
                              return;
                            }
                            vm.database.actionsDao.updateAction(
                                _actions.copyWith(isLocked: false));

                            name = _name;
                          },
                          decoration: InputDecoration(
                              hintText: S.of(context).name,
                              focusColor: Colors.blue),
                        ),
                      ),
                    ),
                    Center(
                      child: Container(
                        width: 300,
                        child: TextFormField(
                          keyboardType: TextInputType.number,
                          style: TextStyle(color: Colors.black),
                          validator: Validators.isStringHasMoreChars,
                          onChanged: (_price) {
                            if (_price != '') {
                              price = _price;
                            }
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
                          style: TextStyle(color: HexColor("#2d3436")),
                          validator: Validators.isStringHasMoreChars,
                          onChanged: (_sku) {
                            if (_sku != '') {
                              sku = _sku;
                            }
                          },
                          decoration: InputDecoration(
                              hintText: S.of(context).sKU,
                              focusColor: HexColor("#0984e3")),
                        ),
                      ),
                    ),
                    // Center(
                    //   child: Container(
                    //     width: 300,
                    //     child: ListTile(
                    //       contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                    //       leading: Text("Stock"),
                    //       trailing: FlatButton(
                    //         child: Text(S.of(context).receiveStock,
                    //             style: TextStyle(color: HexColor('#0984e3'))),
                    //         onPressed: () {
                    //           Router.navigator.pushNamed(Router.receiveStock);
                    //         },
                    //       ),
                    //     ),
                    //   ),
                    // ),
                    Text(S.of(context).leavePriceBlank)
                  ],
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
