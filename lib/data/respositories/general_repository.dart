import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

class GeneralRepository {
  Future<int> insertTabs(Store<AppState> store, int value) {
    var tab = new TabsTableData(tab: value, id: 1);
    return store.state.database.tabsDao.insert(tab);
  }

  Future<int> insertCategory(Store<AppState> store, int businessId) async {
    //TODO: set branchId to the active one got when login or signup it should be switchable as business does
    var tab = new CategoryTableData(
        businessId: businessId,
        branchId: 1,
        focused: false,
        name: "toBeModified");
    CategoryTableData existingCategory =
        await store.state.database.categoryDao.getCategoryName("toBeModified");
    if (existingCategory == null) {
      return store.state.database.categoryDao.insert(tab);
    } else {
      return existingCategory.id;
    }
  }

  Future<bool> updateCategory(Store<AppState> store, int categoryId,
      String categoryName, Business business,
      {bool focused = false}) async {
    final cat =
        await store.state.database.categoryDao.getCategoryById(categoryId);

    if (cat == null) {
      return false;
    }
    final updated = CategoryTableData(
      name: categoryName ?? cat.name,
      id: cat.id,
      focused: focused ?? true,
      businessId: cat.businessId,
      branchId: cat.branchId,
    );

    return store.state.database.categoryDao.updateCategory(updated);
  }

  Future<bool> updateTab(Store<AppState> store, int value) {
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
