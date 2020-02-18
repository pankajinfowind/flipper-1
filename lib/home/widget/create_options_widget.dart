import 'dart:math';

import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/theme.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/flitter_color.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class CreateOptionsWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Dialog(
          child: Container(
            width: 400,
            height: 200,
            child: Form(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Container(
                    width: double.infinity,
                    height: 60,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: FlatButton(
                        color: HexColor(FlipperColors.blue),
                        onPressed: () async {
                          //create a temp item that can be deleted anytime on discard
                          await _createTemporalItem(vm, context);
                          Router.navigator.pushNamed(Router.addItemScreen);
                        },
                        child: Text(
                          "Create Item",
                          style: AppTheme.createItem,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      color: Colors.white70,
                      width: double.infinity,
                      child: OutlineButton(
                        onPressed: () {},
                        child: Text(
                          "Create Discount",
                          style: AppTheme.createDiscount,
                        ),
                      ),
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: FlatButton(
                        child: Text(
                          "Dismiss",
                          style: AppTheme.dismiss,
                        ),
                        onPressed: () {
                          Router.navigator.pop();
                        },
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Future _createTemporalItem(CommonViewModel vm, BuildContext context) async {
    int itemId = await vm.database.itemDao.insert(
      //ignore: missing_required_param
      ItemTableData(
        name: 'tmp',
        branchId: StoreProvider.of<AppState>(context).state.branch.id,
        categoryId: 1, //this will be updated ,
        color: "#955be9",
        description: "desc",
        unitId: 1,
        createdAt: DateTime.now(),
      ),
    );
    //insert tmp variant
    int variantId = await vm.database.variationDao.insert(
      //ignore: missing_required_param
      VariationTableData(
          name: "tmp",
          itemId: itemId,
          sku: DateTime.now().year.toString() + _randomString(4),
          branchId: vm.branch.id,
          isActive: false,
          createdAt: DateTime.now()),
    );

    vm.database.stockDao.insert(
      //ignore: missing_required_param
      StockTableData(
        currentStock: 0,
        canTrackStock: false,
        retailPrice: 0,
        itemId: itemId,
        variantId: variantId,
        branchId: StoreProvider.of<AppState>(context).state.branch.id,
        createdAt: DateTime.now(),
      ),
    );
    StoreProvider.of<AppState>(context).dispatch(
      TempItem(
        item: Item(
          (i) => i
            ..id = itemId
            ..branchId = vm.branch.id,
        ),
      ),
    );
  }

  String _randomString(int length) {
    var rand = new Random();
    var codeUnits = new List.generate(length, (index) {
      return rand.nextInt(33) + 89;
    });

    return new String.fromCharCodes(codeUnits);
  }
}
