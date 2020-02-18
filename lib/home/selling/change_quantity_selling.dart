import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ChangeQuantityForSelling extends StatefulWidget {
  ChangeQuantityForSelling({Key key, @required this.itemId}) : super(key: key);
  final int itemId;

  @override
  _ChangeQuantityForSellingState createState() =>
      _ChangeQuantityForSellingState();
}

class _ChangeQuantityForSellingState extends State<ChangeQuantityForSelling> {
  final incrementController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
        distinct: true,
        converter: CommonViewModel.fromStore,
        builder: (context, vm) {
          return StreamBuilder(
              stream: vm.database.stockDao.getStockByItemIdStream(
                  branchId: vm.branch.id, itemId: widget.itemId),
              builder: (context, AsyncSnapshot<List<StockTableData>> snapshot) {
                if (snapshot.data == null) {
                  return Text("");
                }
                return snapshot.data.length == 1
                    ? SellSingleItem(
                        stocks: snapshot.data,
                        vm: vm,
                      )
                    : SellMultipleItems(
                        stocks: snapshot.data,
                        vm: vm,
                      );
              });
        });
  }
}

class SellSingleItem extends StatelessWidget {
  final List<StockTableData> stocks;
  final CommonViewModel vm;
  const SellSingleItem({
    Key key,
    this.stocks,
    this.vm,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    //todo: on selling item with no price should to to setting a price on item while selling.
    return Scaffold(
      appBar: CommonAppBar(
        disableButton: false,
        showActionButton: true,
        actionButtonName: S.of(context).add,
        title: "RWF " +
            vm.currentActiveSaleItem.name +
            (stocks[0].retailPrice *
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
          controlSaleWidget(
            vm: vm,
          ),
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(S.of(context).notes),
          ),
          Container(
            height: 10,
          ),
          StreamBuilder(
              stream: vm.database.itemDao.getItemByIdStream(stocks[0].id),
              builder: (context, AsyncSnapshot<List<ItemTableData>> snapshot) {
                if (snapshot.data == null) {
                  return Text("");
                }
                ;
                return Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: Text(snapshot.data[0].description),
                );
              })
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
        enableFeedback: false,
        icon: Icon(Icons.remove),
        onPressed: () {
          if (vm.itemVariations.length > 0) {
            for (var i = 0; i < vm.itemVariations.length; i++) {
              //here we know vm.currentActiveSaleItem has been overwritten only kept the parent name of all variants.
              if (vm.currentActiveSaleItem.id == vm.itemVariations[i].id) {
                if (vm.currentIncrement - 1 == -1) {
                  return;
                }
                var incrementor = vm.currentIncrement - 1;
                StoreProvider.of<AppState>(context).dispatch(
                  IncrementAction(
                    increment: vm.currentIncrement == null ? 0 : incrementor,
                  ),
                );
                Item cartItem = Item(
                  (b) => b
                    ..id = vm.itemVariations[i].id
                    ..name = vm.itemVariations[i].name
                    ..price = vm.itemVariations[i].price
                    ..branchId = vm.itemVariations[i].branchId
                    ..unitId = vm.itemVariations[i].unitId
                    ..parentName = vm.currentActiveSaleItem.name
                    ..categoryId = vm.itemVariations[i].categoryId
                    ..color = vm.itemVariations[i].color
                    ..count = incrementor,
                );
                StoreProvider.of<AppState>(context).dispatch(
                  AddItemToCartAction(cartItem: cartItem),
                );
              }
            }
          }
        },
      ),
      trailing: IconButton(
        enableFeedback: false,
        icon: Icon(Icons.add),
        onPressed: () {
          for (var i = 0; i < vm.itemVariations.length; i++) {
            if (vm.currentActiveSaleItem.id == vm.itemVariations[i].id) {
              var incrementor = vm.currentIncrement + 1;

              StoreProvider.of<AppState>(context).dispatch(
                IncrementAction(
                  increment: vm.currentIncrement == null ? 0 + 1 : incrementor,
                ),
              );
              //todo: I see we are not firing new CartItems I have no idea if this is not an error!
              Item cartItem = Item(
                (b) => b
                  ..id = vm.itemVariations[i].id
                  ..name = vm.itemVariations[i].name
                  ..branchId = vm.itemVariations[i].branchId
                  ..unitId = vm.itemVariations[i].unitId
                  ..price = vm.itemVariations[i].price
                  ..parentName = vm.currentActiveSaleItem.name
                  ..categoryId = vm.itemVariations[i].categoryId
                  ..color = vm.itemVariations[i].color
                  ..count = incrementor,
              );

              StoreProvider.of<AppState>(context).dispatch(
                AddItemToCartAction(cartItem: cartItem),
              );
            }
          }
        },
      ),
    );
  }
}

class SellMultipleItems extends StatelessWidget {
  final List<StockTableData> stocks;
  final CommonViewModel vm;

  final Item activeItem;
  const SellMultipleItems({Key key, this.stocks, this.vm, this.activeItem})
      : super(key: key);
  //todo: move the currency to settings table so it can be changed.
  @override
  Widget build(BuildContext context) {
    // print(vm.currentActiveSaleItem);
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
          _saveCart(vm, context);
          // Router.navigator.pop();
        },
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: _itemsList(context, stocks),
          )
        ],
      ),
    );
  }

  Widget _itemsList(BuildContext context, List<StockTableData> items) {
    return ListView(
      children: ListTile.divideTiles(
        context: context,
        tiles: getItems(items, context),
      ).toList(),
    );
  }

  List<Widget> getItems(List<StockTableData> items, BuildContext context) {
    List<Widget> list = new List<Widget>();
    list.add(
      chooserRow(),
    );
    for (var i = 0; i < items.length; i++) {
      isItemActive(items, i, context);
      list.add(
        itemRow(context, items, i),
      );
    }
    list.add(controlSaleWidget(vm: vm));
    return list;
  }

  ListTile chooserRow() {
    return ListTile(
      contentPadding: EdgeInsets.fromLTRB(20, 20, 0, 0),
      leading: Text(vm.currentActiveSaleItem == null
          ? "CHOOSE ONE"
          : vm.currentActiveSaleItem.name + " CHOOSE ONE"),
    );
  }

  void isItemActive(List<StockTableData> items, int i, BuildContext context) {
    if (items[i].isActive) {
      StoreProvider.of<AppState>(context).dispatch(
        IncrementAction(
          increment: vm.currentIncrement == null ? 1 : vm.currentIncrement,
        ),
      );
      StoreProvider.of<AppState>(context).dispatch(
        CurrentActiveSaleItem(
          item: Item((ui) => ui
            ..id = items[i].id
            ..name = vm.currentActiveSaleItem.name
            // ..categoryId = items[i].categoryId
            // ..unitId = items[i].unitId
            // ..price = items[i].price
            // ..color = items[i].color
            ..branchId = items[i].branchId
            ..price = items[i].retailPrice.toInt()),
        ),
      );
      Item cartItem = Item((updated) => updated
            ..count = vm.currentIncrement == null ? 1 : vm.currentIncrement
            ..id = items[i].id
            ..price = items[i].retailPrice.toInt()
            ..parentName = vm.currentActiveSaleItem.name
            ..branchId = items[i].branchId
            ..name = vm.currentActiveSaleItem.name
          // ..name = items[i].name,
          );

      StoreProvider.of<AppState>(context).dispatch(
        AddItemToCartAction(cartItem: cartItem),
      );
    }
  }

  GestureDetector itemRow(
      BuildContext context, List<StockTableData> items, int i) {
    return GestureDetector(
      onTap: () {
        //todo: implement switch veriation here.
        CurrentActiveSaleItem(
          item: Item((ui) => ui
            ..id = items[i].id
            ..name = vm.currentActiveSaleItem.name
            ..price = items[i].retailPrice.toInt()
            ..branchId = items[i].branchId),
        );
        List<Item> cartItems = [];
        cartItems.add(
          Item((updated) => updated
                ..count = vm.currentIncrement
                ..id = items[i].id
                ..price = items[i].retailPrice.toInt()
                // ..parentName = items[i].parentName
                ..branchId = items[i].branchId
              // ..name = items[i].name,
              ),
        );
      },
      child: ListTile(
        contentPadding: EdgeInsets.fromLTRB(20, 20, 40, 10),
        dense: false,
        title: Align(
          alignment: Alignment.topRight,
          child: Text(
            "FRW " + items[i].retailPrice.toString(),
            style: TextStyle(
              color: Colors.black,
            ),
          ),
        ),
        leading: StreamBuilder(
            stream:
                vm.database.variationDao.getVariationByIdStream(items[i].id),
            builder:
                (context, AsyncSnapshot<List<VariationTableData>> snapshot) {
              if (snapshot.data == null) {
                return Text("");
              }
              return Text(
                snapshot.data[0].name,
                style: TextStyle(
                  color: Colors.black,
                ),
              );
            }),
        trailing: Radio(
          value: items[i].id,
          groupValue: items[i].isActive ? items[i].id : 0,
          onChanged: (int item) {},
        ),
      ),
    );
  }

  void _saveCart(CommonViewModel vm, context) {
    //save the current cartItem;
    StoreProvider.of<AppState>(context).dispatch(SaveCart());
  }
}
