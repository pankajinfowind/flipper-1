import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class EditVariationScreen extends StatefulWidget {
  EditVariationScreen({Key key, @required this.variationId}) : super(key: key);
  final int variationId;

  @override
  _EditVariationScreenState createState() => _EditVariationScreenState();
}

class _EditVariationScreenState extends State<EditVariationScreen> {
  String _retailPrice;
  String sku;

  ActionsTableData _actions;

  String _name;

  String _costPrice;
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return StreamBuilder(
          stream: vm.database.variationDao
              .getVariantByItemIdStream(widget.variationId),
          builder: (context, AsyncSnapshot<List<VariationTableData>> snapshot) {
            if (snapshot.data == null) {
              return Text("");
            }
            return Scaffold(
              appBar: new CommonAppBar(
                title: S.of(context).addVariation,
                showActionButton: true,
                disableButton: _actions == null ? true : _actions.isLocked,
                actionButtonName: S.of(context).save,
                onPressedCallback: () async {
                  updateVariation(snapshot.data[0], context);

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
                              initialValue: snapshot.data[0].name,
                              style: TextStyle(color: Colors.black),
                              validator: Validators.isStringHasMoreChars,
                              onChanged: (name) {
                                if (name == '') {
                                  setState(() {
                                    _name = null;
                                  });
                                  _getSaveStatus();
                                  return;
                                }
                                setState(() {
                                  _name = name;
                                });
                                _getSaveStatus();
                              },
                              decoration: InputDecoration(
                                  hintText: S.of(context).name,
                                  focusColor: Colors.blue),
                            ),
                          ),
                        ),
                        buildRetailPriceWidget(context),
                        buildCostPriceWidget(context),
                        Center(
                          child: Container(
                            width: 300,
                            child: TextFormField(
                              initialValue: snapshot.data[0].sku,
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
                        Text(S.of(context).leavePriceBlank)
                      ],
                    )
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  void updateVariation(VariationTableData variation, BuildContext context) {
    if (variation == null) {
      StoreProvider.of<AppState>(context).dispatch(
        SaveRegular(
          price: 0,
          costPrice: 0.0,
          itemId: variation.itemId,
          count: 0,
          name: 'Regular',
        ),
      );
    }
  }

  Center buildCostPriceWidget(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        child: TextFormField(
          keyboardType: TextInputType.number,
          style: TextStyle(color: Colors.black),
          validator: Validators.isStringHasMoreChars,
          onChanged: (cost) {
            if (cost != '') {
              _costPrice = cost;
            }
          },
          decoration: InputDecoration(
              hintText: S.of(context).costPrice, focusColor: Colors.blue),
        ),
      ),
    );
  }

  Center buildRetailPriceWidget(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        child: TextFormField(
          keyboardType: TextInputType.number,
          style: TextStyle(color: Colors.black),
          validator: Validators.isStringHasMoreChars,
          onChanged: (price) {
            if (price != '') {
              _retailPrice = price;
            }
          },
          decoration: InputDecoration(
              hintText: S.of(context).retailPrice, focusColor: Colors.blue),
        ),
      ),
    );
  }

  void _getSaveStatus() async {
    var result = await StoreProvider.of<AppState>(context)
        .state
        .database
        .actionsDao
        .getActionBy('save');

    if (_name == null) {
      await StoreProvider.of<AppState>(context)
          .state
          .database
          .actionsDao
          .updateAction(result.copyWith(isLocked: true));
    } else {
      await StoreProvider.of<AppState>(context)
          .state
          .database
          .actionsDao
          .updateAction(result.copyWith(isLocked: false));
    }
    var res = await StoreProvider.of<AppState>(context)
        .state
        .database
        .actionsDao
        .getActionBy('save');
    setState(() {
      _actions = res;
    });
  }
}
