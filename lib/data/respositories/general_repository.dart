import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

class GeneralRepository {
  Future<int> insert(Store<AppState> store, int value) {
    var tab = new TabsTableData(tab: value, id: 1);
    return store.state.database.tabsDao.insert(tab);
  }

  Future<bool> update(Store<AppState> store, int value) {
    final b = TabsTableData(id: 1, tab: value);
    return store.state.database.tabsDao.updateTab(b);
  }

  Future<bool> updateUnit(Store<AppState> store, Unit unit) {
    final b = UnitTableData(
        id: unit.id,
        name: unit.name,
        focused: unit.focused,
        businessId: unit.businessId,
        branchId: unit.branchId);
    return store.state.database.unitDao.updateTab(b);
  }

  Future<TabsTableData> getTab(Store<AppState> store) {
    return store.state.database.tabsDao.getTab();
  }

  Future<List<UnitTableData>> getUnits(Store<AppState> store) {
    return store.state.database.unitDao.getUnits();
  }

  Future<int> insertUnit(Store<AppState> store, Unit unit) {
    var values = new UnitTableData(
        name: unit.name,
        branchId: unit.branchId,
        businessId: unit.businessId,
        focused: unit.focused);
    return store.state.database.unitDao.insert(values);
  }

  Future<List<CategoryTableData>> getCategories(Store<AppState> store) {
    return store.state.database.categoryDao.getCategories();
  }
}
