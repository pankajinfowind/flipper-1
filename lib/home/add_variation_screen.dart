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
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: "Add Variation",
            showActionButton: true,
            disableButton: vm.currentDisable == null ||
                vm.currentDisable.unDisable == 'none',
            actionButtonName: S.of(context).save,
            onPressedCallback: () {
              List<Variation> variatione = [];
              List<Variation> updateVariations = [];
              if (vm.variations.length > 0) {
                vm.variations.forEach((v) => {updateVariations.add(v)});
                updateVariations.add(Variation((v) => v
                  ..name = name
                  ..price = price
                  ..stockValue = 0
                  ..unityType = vm.currentUnit.name
                  ..sku = sku));
                StoreProvider.of<AppState>(context)
                    .dispatch(VariationAction(variations: updateVariations));
              } else {
                variatione.add(Variation((v) => v
                  ..name = name
                  ..price = price
                  ..stockValue = 0
                  ..unityType = vm.currentUnit.name //todo:get this from store
                  ..sku = sku));
                StoreProvider.of<AppState>(context)
                    .dispatch(VariationAction(variations: variatione));
              }
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
                              StoreProvider.of<AppState>(context).dispatch(
                                  CurrentDisable(
                                      disable: Disable(
                                          (u) => u..unDisable = "none")));
                              return;
                            }

                            name = _name;

                            StoreProvider.of<AppState>(context).dispatch(
                                CurrentDisable(
                                    disable: Disable((u) =>
                                        u..unDisable = "variationName")));
                          },
                          decoration: InputDecoration(
                              hintText: "Name", focusColor: Colors.blue),
                        ),
                      ),
                    ),
                    Center(
                      child: Container(
                        width: 300,
                        child: TextFormField(
                          style: TextStyle(color: Colors.black),
                          validator: Validators.isStringHasMoreChars,
                          onChanged: (_price) {
                            if (_price != '') {
                              price = _price;
                            }
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
                          style: TextStyle(color: HexColor("#2d3436")),
                          validator: Validators.isStringHasMoreChars,
                          onChanged: (_sku) {
                            if (_sku != '') {
                              sku = _sku;
                            }
                          },
                          decoration: InputDecoration(
                              hintText: "SKU", focusColor: HexColor("#0984e3")),
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
                            child: Text("Receive Stock",
                                style: TextStyle(color: HexColor('#0984e3'))),
                            onPressed: () {
                              Router.navigator.pushNamed(Router.receiveStock);
                            },
                          ),
                        ),
                      ),
                    ),
                    Text("Leave the price blank to enter at the time of sale.")
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
