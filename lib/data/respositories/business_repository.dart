import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/business.dart';
import 'package:redux/redux.dart';

class BusinessRepository {
  Future<int> insert(Store<AppState> store, Business business) {
    var bussiness = new BusinessTableData(name: business.name,isActive: business.isActive,abbreviation: business.abbreviation);
    return store.state.database.businessDao.insert(bussiness);
  }
  Future<bool> update(Store<AppState> store, Business business, {bool active=false}) {
    final b = BusinessTableData(name: business.name,id: business.id,abbreviation: business.abbreviation,isActive: active);
    return store.state.database.businessDao.updateBusiness(b);
  }

  Future<int> assignBusinessToUser(
      Store<AppState> store, int bId, int uId) {
    var assignBusiness =
    new BusinessUserTableData(businessId: bId,userId: uId);
    return store.state.database.businessDao.assignBusinessToUser(assignBusiness);
  }


  Future<List<BusinessTableData>> getBusinesses(Store<AppState> store) {
    return store.state.database.businessDao.getBusinesses();
  }
}
