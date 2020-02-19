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
                return SellMultipleItems(
                  stocks: snapshot.data,
                  vm: vm,
                );
              });
        });
  }
}

class ControlSaleWidget extends StatelessWidget {
  const ControlSaleWidget({Key key, @required this.vm}) : super(key: key);
  final CommonViewModel vm;

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
              if (vm.currentActiveSaleItem.id == vm.itemVariations[i].id) {
                if (vm.currentIncrement == null) {
                  return;
                }
                if (vm.currentIncrement - 1 == -1) {
                  return;
                }
                var incrementor = vm.currentIncrement - 1;
                StoreProvider.of<AppState>(context).dispatch(
                  IncrementAction(
                    increment: vm.currentIncrement == null ? 0 : incrementor,
                  ),
                );
                Item cartItem = buildItem(i, incrementor);
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
              var incrementor =
                  vm.currentIncrement == null ? 1 : vm.currentIncrement + 1;

              StoreProvider.of<AppState>(context).dispatch(
                IncrementAction(
                  increment: vm.currentIncrement == null ? 1 : incrementor,
                ),
              );
              //todo: I see we are not firing new CartItems I have no idea if this is not an error!
              Item cartItem = buildItem(i, incrementor);

              StoreProvider.of<AppState>(context).dispatch(
                AddItemToCartAction(cartItem: cartItem),
              );
            }
          }
        },
      ),
    );
  }

  Item buildItem(int i, int incrementor) {
    return Item(
      (b) => b
        ..id = vm.itemVariations[i].id
        ..name = vm.itemVariations[i].name
        ..variantId = vm.itemVariations[i].id
        ..branchId = vm.itemVariations[i].branchId
        ..parentName = vm.currentActiveSaleItem.name
        ..count = incrementor,
    );
  }
}

class SellMultipleItems extends StatelessWidget {
  final List<StockTableData> stocks;
  final CommonViewModel vm;

  final Item activeItem;
  const SellMultipleItems({Key key, this.stocks, this.vm, this.activeItem})
      : super(key: key);

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
                vm.currentActiveSaleItem.name +
                (stocks[0].retailPrice *
                        (vm.currentIncrement == null || vm.currentIncrement == 0
                            ? 1
                            : vm.currentIncrement))
                    .toString(),
        onPressedCallback: () {
          //todo: show animation like square that item has been added to the current sale

          if (StoreProvider.of<AppState>(context).state.cartItem == null) {
            Item cartItem = Item(
              (b) => b
                ..id = vm.itemVariations[0].id
                ..variantId = vm.itemVariations[0].variantId
                ..name = vm.itemVariations[0].name
                ..branchId = vm.itemVariations[0].branchId
                ..parentName = vm.currentActiveSaleItem.name
                ..count = 1,
            );
            StoreProvider.of<AppState>(context).dispatch(
              AddItemToCartAction(cartItem: cartItem),
            );
            StoreProvider.of<AppState>(context).dispatch(SaveCart());
          } else {
            _saveCart(vm, context);
          }
          // Router.navigator.pop();
        },
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: _variantsList(context, stocks),
          )
        ],
      ),
    );
  }

  Widget _variantsList(BuildContext context, List<StockTableData> stocks) {
    return ListView(
      children: ListTile.divideTiles(
        context: context,
        tiles: getVariantsRow(stocks, context),
      ).toList(),
    );
  }

  List<Widget> getVariantsRow(
      List<StockTableData> stocks, BuildContext context) {
    List<Widget> list = new List<Widget>();
    list.add(
      chooserRow(),
    );
    for (var i = 0; i < stocks.length; i++) {
      isItemActive(stocks, i, context);
      list.add(
        itemRow(context, stocks, i),
      );
    }
    list.add(ControlSaleWidget(vm: vm));
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
            ..branchId = items[i].branchId
            ..price = items[i].retailPrice.toInt()),
        ),
      );
      Item cartItem = Item(
        (updated) => updated
          ..count = vm.currentIncrement == null ? 1 : vm.currentIncrement
          ..variantId = items[i].id
          ..id = items[i].id
          ..price = items[i].retailPrice.toInt()
          ..parentName = vm.currentActiveSaleItem.name
          ..branchId = items[i].branchId
          ..name = vm.currentActiveSaleItem.name,
      );

      StoreProvider.of<AppState>(context).dispatch(
        AddItemToCartAction(cartItem: cartItem),
      );
    }
  }

  GestureDetector itemRow(
      BuildContext context, List<StockTableData> stocks, int i) {
    return GestureDetector(
      onTap: () {
        //todo: implement switch veriation here.
        CurrentActiveSaleItem(
          item: buildActiveItem(stocks, i),
        );
        List<Item> cartItems = [];
        cartItems.add(
          buildActiveItem(stocks, i),
        );
      },
      child: ListTile(
        contentPadding: EdgeInsets.fromLTRB(20, 20, 40, 10),
        dense: false,
        title: Align(
          alignment: Alignment.topRight,
          child: Text(
            "FRW " + stocks[i].retailPrice.toString(),
            style: TextStyle(
              color: Colors.black,
            ),
          ),
        ),
        leading: StreamBuilder(
            stream:
                vm.database.variationDao.getVariationByIdStream(stocks[i].id),
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
          value: stocks[i].id,
          groupValue: stocks[i].isActive ? stocks[i].id : 0,
          onChanged: (int item) {},
        ),
      ),
    );
  }

  Item buildActiveItem(List<StockTableData> stocks, int i) {
    return Item(
      (updated) => updated
        ..count = vm.currentIncrement
        ..id = stocks[i].id
        ..variantId = stocks[i].variantId
        ..isActive = stocks[i].isActive
        ..price = stocks[i].retailPrice.toInt()
        ..branchId = stocks[i].branchId,
    );
  }

  void _saveCart(CommonViewModel vm, context) {
    //save the current cartItem;
    StoreProvider.of<AppState>(context).dispatch(SaveCart());
  }
}
