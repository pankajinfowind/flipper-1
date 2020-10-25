

import 'package:flipper/model/unit.dart';
import 'package:flipper/model/variation.dart';
import 'package:flipper/viewmodels/base_model.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/utils/constant.dart';
import 'package:couchbase_lite/couchbase_lite.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/services/database_service.dart';
import 'package:flipper/services/proxy.dart';
import 'package:flipper/utils/logger.dart';

import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:logger/logger.dart';

class RetailPriceViewModel extends BaseModel{
  final Logger log = Logging.getLogger('category observer:)');
  final DatabaseService _databaseService = ProxyService.database;
  List<Variation> _variation;
  List<Variation> get data => _variation;

  void navigateTo({String path}) {
    ProxyService.nav.navigateTo(Routing.addCategoryScreen);
  }

  void getVariations({BuildContext context,String productId}) {
    setBusy(true);

    log.i('loading variations of branchId:' +
        StoreProvider.of<AppState>(context).state.branch.id);
    //demo of listening on users table on every entry.
    _databaseService
        .observer(
            equator: AppTables.variation,
            property: 'table',
            and:true,
            andEquator: productId,
            andProperty: 'productId'
            )
        .stream
        .listen((ResultSet event) {
      // _variation = event.allResults();
      final List<Map<String, dynamic>> model = event.map((Result result) {
        return result.toMap();
      }).toList();
      final List<Variation> list = <Variation>[];
      // remove unnecessarry nesting "main"appended on each map value
      for (Map<String, dynamic> map in model) {
        // ignore: always_specify_types
        // ignore: always_specify_types
        map.forEach((String key, value) {
          list.add(Variation.fromMap(value));
        });
      }
      notifyListeners();

      setBusy(false);
    });
  }
}