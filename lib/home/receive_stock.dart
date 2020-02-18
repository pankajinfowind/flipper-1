import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
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
                    onChanged: (count) async {
                      await receiveStock(vm, double.parse(count));
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

  Future receiveStock(CommonViewModel vm, double count) async {
    StockTableData stock = await vm.database.stockDao.getStockByVariantId(
        variantId: widget.variationId, branchId: vm.branch.id);

    vm.database.stockDao.updateStock(
      stock.copyWith(updatedAt: DateTime.now(), currentStock: count.toInt()),
    );
  }
}
