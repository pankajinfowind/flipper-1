import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/model/business.dart';
import 'package:redux/redux.dart';

class BusinessRepository {
  insert(Store<AppState> store, Business business) {
    var bussiness =
        new BusinessTableData(name: business.name);
    store.state.database.businessDao.insert(bussiness);
    store.dispatch(BusinessCreated());
  }

  Future<void> update(String token) async {}

  Future<List<BusinessTableData>> getBusinesses(Store<AppState> store) {
    return store.state.database.businessDao.getBusinesses();
  }
}
