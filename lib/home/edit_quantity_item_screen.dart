import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';

class EditQuantityItemScreen extends StatefulWidget {
  final Item item;
  EditQuantityItemScreen({Key key, this.item}) : super(key: key);

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
        return Scaffold(
          appBar: CommonAppBar(
            disableButton: false,
            showActionButton: true,
            actionButtonName: S.of(context).add,
            title: widget.item.name + " 200 RWF",
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
              ListTile(
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
                  icon: Icon(Icons.add),
                  onPressed: () {
                    List<Item> items = [];
                    if (vm.currentSales.length == 0) {
                      items.add(
                        Item(
                          (b) => b
                            ..id = widget.item.id
                            ..name = widget.item.name
                            ..branchId = widget.item.branchId
                            ..unitId = widget.item.unitId
                            ..variantId = widget.item.variantId
                            ..categoryId = widget.item.categoryId
                            ..color = widget.item.color
                            ..count = 1,
                        ),
                      );
                      StoreProvider.of<AppState>(context).dispatch(
                        CurrentSaleAction(items: items),
                      );
                      StoreProvider.of<AppState>(context).dispatch(
                        IncrementAction(increment: 1),
                      );
                    } else {
                      for (var i = 0; i < vm.currentSales.length; i++) {
                        if (vm.currentSales[i].id == widget.item.id) {
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
                                ..id = widget.item.id
                                ..name = widget.item.name
                                ..branchId = widget.item.branchId
                                ..unitId = widget.item.unitId
                                ..variantId = widget.item.variantId
                                ..categoryId = widget.item.categoryId
                                ..color = widget.item.color
                                ..count = vm.currentIncrement,
                            ),
                          );
                        } else {
                          items.add(vm.currentSales[i]);
                        }
                      }
                      StoreProvider.of<AppState>(context).dispatch(
                        CurrentSaleAction(items: items),
                      );
                    }
                  },
                ),
                trailing: IconButton(
                  icon: Icon(Icons.remove),
                  onPressed: () {
                    List<Item> items = [];
                    if (vm.currentSales.length > 0) {
                      for (var i = 0; i < vm.currentSales.length; i++) {
                        if (vm.currentSales[i].id == widget.item.id) {
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
                                ..id = widget.item.id
                                ..name = widget.item.name
                                ..branchId = widget.item.branchId
                                ..unitId = widget.item.unitId
                                ..variantId = widget.item.variantId
                                ..categoryId = widget.item.categoryId
                                ..color = widget.item.color
                                ..count = vm.currentIncrement,
                            ),
                          );
                        } else {
                          items.add(vm.currentSales[i]);
                        }
                      }
                      StoreProvider.of<AppState>(context).dispatch(
                        CurrentSaleAction(items: items),
                      );
                    }
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Text(S.of(context).notes),
              ),
              Container(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child:
                    Text("Description here should come from item object too."),
              )
            ],
          ),
        );
      },
    );
  }
}
