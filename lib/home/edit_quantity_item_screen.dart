import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/logger.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class EditQuantityItemScreen extends StatefulWidget {
  EditQuantityItemScreen({Key key}) : super(key: key);

  @override
  _EditQuantityItemScreenState createState() => _EditQuantityItemScreenState();
}

class _EditQuantityItemScreenState extends State<EditQuantityItemScreen> {
  final incrementController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
        distinct: true,
        converter: CommonViewModel.fromStore,
        builder: (context, vm) {
          return vm.itemVariations == 1
              ? SellSingleItem(
                  allSellableVariations: vm.itemVariations.toList(),
                  vm: vm,
                )
              : SellMultipleItems(
                  variations: vm.itemVariations.toList(),
                  vm: vm,
                );
        });
  }
}

class SellSingleItem extends StatelessWidget {
  final List<Item> allSellableVariations;
  final CommonViewModel vm;
  const SellSingleItem({
    Key key,
    this.allSellableVariations,
    this.vm,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        disableButton: false,
        showActionButton: true,
        actionButtonName: S.of(context).add,
        title: "RWF " +
            allSellableVariations[0].name +
            (allSellableVariations[0].price *
                    (vm.currentIncrement == null || vm.currentIncrement == 0
                        ? 1
                        : vm.currentIncrement))
                .toString(),
        onPressedCallback: () {
          //todo: go ahead and insert the new quantity to a sale.
        },
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(S.of(context).quantity),
          ),
          controlSaleWidget(vm: vm),
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(S.of(context).notes),
          ),
          Container(
            height: 10,
          ),
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(allSellableVariations[0].description),
          )
        ],
      ),
    );
  }
}

class controlSaleWidget extends StatelessWidget {
  const controlSaleWidget({Key key, @required this.vm}) : super(key: key);

  final CommonViewModel vm;

  @override
  Widget build(BuildContext context) {
    // print(vm.currentSales);
    return ListTile(
      dense: true,
      title: Center(
        child: Container(
          width: 80,
          child: TextField(
            textDirection: TextDirection.rtl,
            onChanged: (count) {
              //todo: work on entering count from keyboard right now it is messing around with other inputs
              // StoreProvider.of<AppState>(context).dispatch(
              //   IncrementAction(
              //     increment: vm.currentIncrement == null
              //         ? 0 + int.parse(count)
              //         : vm.currentIncrement + int.parse(count),
              //   ),
              // );
            },
            controller: TextEditingController(
              text: vm.currentIncrement == null
                  ? "1"
                  : vm.currentIncrement.toString(),
            ),
            keyboardType: TextInputType.number,
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.black),
          ),
        ),
      ),
      leading: IconButton(
        icon: Icon(Icons.remove),
        onPressed: () {
          setPayableAmount(context, "decrement");
          List<Item> items = [];
          if (vm.currentSales.length > 0) {
            for (var i = 0; i < vm.currentSales.length; i++) {
              if (vm.currentActiveSaleItem.id == vm.itemVariations[i].id) {
                if (vm.currentIncrement - 1 == -1) {
                  return;
                }
                StoreProvider.of<AppState>(context).dispatch(
                  IncrementAction(
                    increment: vm.currentIncrement == null
                        ? 0
                        : vm.currentIncrement - 1,
                  ),
                );
                items.add(
                  Item(
                    (b) => b
                      ..id = vm.itemVariations[i].id
                      ..name = vm.itemVariations[i].name
                      ..branchId = vm.itemVariations[i].branchId
                      ..unitId = vm.itemVariations[i].unitId
                      ..categoryId = vm.itemVariations[i].categoryId
                      ..color = vm.itemVariations[i].color
                      ..count = vm.currentIncrement,
                  ),
                );
              }
            }
            StoreProvider.of<AppState>(context).dispatch(
              AddItemToCartAction(items: items),
            );
          }
        },
      ),
      trailing: IconButton(
        icon: Icon(Icons.add),
        onPressed: () {
          // Logger.w(vm.itemVariations.toString());
          List<Item> items = [];
          for (var i = 0; i < vm.itemVariations.length; i++) {
            Logger.w(vm.currentActiveSaleItem.id.toString());
            Logger.w(vm.itemVariations[i].id.toString());
            if (vm.currentActiveSaleItem.id == vm.itemVariations[i].id) {
              StoreProvider.of<AppState>(context).dispatch(
                IncrementAction(
                  increment: vm.currentIncrement == null
                      ? 0 + 1
                      : vm.currentIncrement + 1,
                ),
              );
              items.add(
                Item(
                  (b) => b
                    ..id = vm.itemVariations[i].id
                    ..name = vm.itemVariations[i].name
                    ..branchId = vm.itemVariations[i].branchId
                    ..unitId = vm.itemVariations[i].unitId
                    ..categoryId = vm.itemVariations[i].categoryId
                    ..color = vm.itemVariations[i].color
                    ..count = vm.currentIncrement,
                ),
              );
            }
          }
          StoreProvider.of<AppState>(context).dispatch(
            AddItemToCartAction(items: items),
          );
        },
      ),
    );
  }
}

class SellMultipleItems extends StatelessWidget {
  final List<Item> variations;
  final CommonViewModel vm;

  final Item activeItem;
  const SellMultipleItems({Key key, this.variations, this.vm, this.activeItem})
      : super(key: key);
  //todo: move the currency to settings table so it can be changed.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        disableButton: false,
        showActionButton: true,
        actionButtonName: S.of(context).add,
        title: vm.currentActiveSaleItem == null
            ? null
            : vm.currentActiveSaleItem.name +
                " RWF " +
                (vm.currentActiveSaleItem.price *
                        (vm.currentIncrement == null || vm.currentIncrement == 0
                            ? 1
                            : vm.currentIncrement))
                    .toString(),
        onPressedCallback: () {
          //todo: show animation like square that item has been added to the current sale
          Router.navigator.pop();
        },
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: _itemsList(context, variations),
          )
        ],
      ),
    );
  }

  Widget _itemsList(BuildContext context, List<Item> items) {
    return ListView(
      children: ListTile.divideTiles(
        context: context,
        tiles: getItems(items, context),
      ).toList(),
    );
  }

  List<Widget> getItems(List<Item> items, BuildContext context) {
    List<Widget> list = new List<Widget>();
    list.add(
      ListTile(
        contentPadding: EdgeInsets.fromLTRB(20, 20, 0, 0),
        leading: Text(vm.currentActiveSaleItem == null
            ? "CHOOSE ONE"
            : vm.currentActiveSaleItem.name + " CHOOSE ONE"),
      ),
    );
    for (var i = 0; i < items.length; i++) {
      if (items[i].isActive) {
        StoreProvider.of<AppState>(context).dispatch(
          CurrentActiveSaleItem(
            item: Item(
              (ui) => ui
                ..id = items[i].id
                ..name = vm.currentActiveSaleItem.name
                ..categoryId = items[i].categoryId
                ..unitId = items[i].unitId
                ..color = items[i].color
                ..branchId = items[i].branchId
                ..price = items[i].price,
            ),
          ),
        );
      }
      list.add(
        GestureDetector(
          onTap: () {
            StoreProvider.of<AppState>(context).dispatch(
              SwitchVariation(
                item: items[i],
              ),
            );
          },
          child: ListTile(
            contentPadding: EdgeInsets.fromLTRB(20, 20, 40, 10),
            dense: false,
            title: Align(
              alignment: Alignment.topRight,
              child: Text(
                "FRW " + items[i].price.toString(),
                style: TextStyle(
                  color: Colors.black,
                ),
              ),
            ),
            leading: Text(
              items[i].name,
              style: TextStyle(
                color: Colors.black,
              ),
            ),
            trailing: Radio(
              value: items[i].id,
              groupValue: items[i].isActive ? items[i].id : 0,
              onChanged: (int categoryId) {},
            ),
          ),
        ),
      );
    }
    //at the end add control ui
    list.add(controlSaleWidget(vm: vm));
    return list;
  }
}

void setPayableAmount(BuildContext context, String s) {
  print("increase payable");
}
