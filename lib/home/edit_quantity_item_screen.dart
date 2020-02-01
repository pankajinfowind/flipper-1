import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
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
          print(vm.itemVariations);
          return vm.itemVariations == 1
              ? SellSingleItem(
                  item: vm.itemVariations.toList(),
                  vm: vm,
                )
              : SellMultipleItems(
                  items: vm.itemVariations.toList(),
                  vm: vm,
                );
        });
  }
}

class SellSingleItem extends StatelessWidget {
  final List<Item> item;
  final CommonViewModel vm;
  const SellSingleItem({
    Key key,
    this.item,
    this.vm,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        disableButton: false,
        showActionButton: true,
        actionButtonName: S.of(context).add,
        title: item[0].name + " ${item[0].price} RWF",
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
          controlSaleWidget(vm: vm, item: item),
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(S.of(context).notes),
          ),
          Container(
            height: 10,
          ),
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(item[0].description),
          )
        ],
      ),
    );
  }
}

class controlSaleWidget extends StatelessWidget {
  const controlSaleWidget({
    Key key,
    @required this.vm,
    @required this.item,
  }) : super(key: key);

  final CommonViewModel vm;
  final List<Item> item;

  @override
  Widget build(BuildContext context) {
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
              if (vm.currentSales[i].id == item[0].id) {
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
                      ..id = item[0].id
                      ..name = item[0].name
                      ..branchId = item[0].branchId
                      ..unitId = item[0].unitId
                      ..categoryId = item[0].categoryId
                      ..color = item[0].color
                      ..count = vm.currentIncrement,
                  ),
                );
              } else {
                items.add(vm.currentSales[i]);
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
          List<Item> items = [];
          if (vm.currentSales.length == 0) {
            items.add(
              Item(
                (b) => b
                  ..id = item[0].id
                  ..name = item[0].name
                  ..branchId = item[0].branchId
                  ..unitId = item[0].unitId
                  ..categoryId = item[0].categoryId
                  ..color = item[0].color
                  ..count = 1,
              ),
            );
            StoreProvider.of<AppState>(context).dispatch(
              AddItemToCartAction(items: items),
            );
            StoreProvider.of<AppState>(context).dispatch(
              IncrementAction(increment: 1),
            );
          } else {
            for (var i = 0; i < vm.currentSales.length; i++) {
              if (vm.currentSales[i].id == item[0].id) {
                print(vm.currentIncrement);
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
                      ..id = item[0].id
                      ..name = item[0].name
                      ..branchId = item[0].branchId
                      ..unitId = item[0].unitId
                      ..categoryId = item[0].categoryId
                      ..color = item[0].color
                      ..count = vm.currentIncrement,
                  ),
                );
              } else {
                items.add(vm.currentSales[i]);
              }
            }
            StoreProvider.of<AppState>(context).dispatch(
              AddItemToCartAction(items: items),
            );
          }
        },
      ),
    );
  }
}

class SellMultipleItems extends StatelessWidget {
  final List<Item> items;
  final CommonViewModel vm;

  final Item activeItem;
  const SellMultipleItems({Key key, this.items, this.vm, this.activeItem})
      : super(key: key);

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
                " FRW " +
                vm.currentActiveSaleItem.price.toString(),
        onPressedCallback: () {
          //todo: go ahead and insert the new quantity to a sale.
        },
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: _itemsList(context, items),
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
        leading: Text("CHOOSE ONE"),
      ),
    );
    print(items);
    for (var i = 0; i < items.length; i++) {
      if (items[i].isActive) {
        StoreProvider.of<AppState>(context).dispatch(
          CurrentActiveSaleItem(
            item: Item(
              (ui) => ui
                ..id = items[i].id
                ..name = vm.currentActiveSaleItem.name
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
    list.add(controlSaleWidget(vm: vm, item: items));
    return list;
  }
}

void setPayableAmount(BuildContext context, String s) {
  print("increase payable");
}
