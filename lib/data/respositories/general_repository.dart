import 'package:flipper/data/dao/item_variation.dart';
import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/unit.dart';
import 'package:flipper/model/variation.dart';
import 'package:redux/redux.dart';

class GeneralRepository {
  Future<int> insertTabs(Store<AppState> store, int value) {
    //ignore:missing_required_param
    var tab = new TabsTableData(tab: value, id: 1);
    return store.state.database.tabsDao.insert(tab);
  }

  Future<bool> updateCategory(Store<AppState> store, int categoryId,
      String categoryName, Business business,
      {bool focused = false}) async {
    final cat =
        await store.state.database.categoryDao.getCategoryById(categoryId);

    if (cat == null) {
      return false;
    }
    //ignore:missing_required_param
    final updated = CategoryTableData(
      name: categoryName ?? cat.name,
      id: cat.id,
      focused: focused ?? true,
      businessId: cat.businessId,
      branchId: cat.branchId,
      updatedAt: DateTime.now(),
    );

    return store.state.database.categoryDao.updateCategory(updated);
  }

  Future<bool> updateTab(Store<AppState> store, int value) {
    //ignore:missing_required_param
    final b = TabsTableData(id: 1, tab: value);
    return store.state.database.tabsDao.updateTab(b);
  }

  Future<bool> updateUnit(Store<AppState> store, Unit unit) {
    //ignore:missing_required_param
    final b = UnitTableData(
      id: unit.id,
      name: unit.name,
      focused: unit.focused,
      businessId: unit.businessId,
      branchId: unit.branchId,
    );
    return store.state.database.unitDao.updateTab(b);
  }

  Future<TabsTableData> getTab(Store<AppState> store) {
    return store.state.database.tabsDao.getTab();
  }

  Future<List<UnitTableData>> getUnits(Store<AppState> store) {
    return store.state.database.unitDao.getUnits();
  }

  Future<int> insertUnit(Store<AppState> store, Unit unit) {
    //ignore:missing_required_param
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

  Future<int> insertCategory(Store<AppState> store, int businessId) async {
    //ignore: missing_required_param
    var tab = new CategoryTableData(
        businessId: businessId,
        branchId: 1,
        focused: false,
        createdAt: DateTime.now(),
        name: "toBeModified");
    CategoryTableData existingCategory =
        await store.state.database.categoryDao.getCategoryName("toBeModified");
    if (existingCategory == null) {
      return store.state.database.categoryDao.insert(tab);
    } else {
      return existingCategory.id;
    }
  }

  Future<int> insertItem(Store<AppState> store, ItemTableData data) {
    return store.state.database.itemDao.insert(data);
  }

  Future<int> insertVariant(Store<AppState> store, VariationTableData data) {
    return store.state.database.variationDao.insert(data);
  }

  Future<int> insertHistory(Store<AppState> store, int variantId, int count) {
    return store.state.database.historyDao
        // ignore: missing_required_param
        .insert(HistoryTableData(count: count, variantId: variantId));
  }

  Future<List<ItemTableData>> getItems(Store<AppState> store) {
    return store.state.database.itemDao.getItems();
  }

  Future<List<ItemVariation>> getItemVariation(Store<AppState> store) {
    return store.state.database.itemDao.getItemVariations();
  }

  Future<List<VariationTableData>> getVariations(
      {Store<AppState> store, int itemId}) {
    return store.state.database.variationDao.getItemVariations(itemId);
  }
}
