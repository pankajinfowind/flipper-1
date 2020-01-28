import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/variation.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ReceiveStock extends StatefulWidget {
  final int variationId;
  ReceiveStock({@required this.variationId});

  @override
  _ReceiveStockState createState() => _ReceiveStockState();
}

class _ReceiveStockState extends State<ReceiveStock> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            disableButton: false,
            title: "Receive stock",
            onPressedCallback: () {
              Router.navigator.pop();
            },
            showActionButton: true,
            actionButtonName: S.of(context).save,
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: Container(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(40, 40, 40, 40),
              child: Column(
                children: <Widget>[
                  TextFormField(
                    keyboardType: TextInputType.number,
                    textDirection: TextDirection.rtl,
                    autofocus: true,
                    style: TextStyle(color: Colors.black),
                    onChanged: (count) {
                      List<Variation> updateVariations = [];

                      for (var i = 0; i < vm.variations.length; i++) {
                        if (widget.variationId == vm.variations[i].id) {
                          updateVariations.add(
                            Variation((v) => v
                              ..id = vm.variations[i].id
                              ..name = vm.variations[i].name
                              ..stockValue = int.parse(count)
                              ..sku = vm.variations[i].sku
                              ..price = vm.variations[i].price
                              ..unityType = vm.variations[i].unityType),
                          );
                        } else {
                          updateVariations.add(vm.variations[i]);
                        }
                      }
                      StoreProvider.of<AppState>(context).dispatch(
                          VariationAction(variations: updateVariations));
                    },
                    decoration: InputDecoration(
                      hintText: "Add Stock",
                      focusColor: Colors.blue,
                    ),
                  ),
                  Container(
                    height: 20,
                  ),
                  Text(
                      "Inventory tracking will be enabled by\n default for items with stock count. To turn \n tracking off, visit your flipper Dashboard")
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
