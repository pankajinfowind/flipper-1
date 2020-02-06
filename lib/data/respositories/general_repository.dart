import 'package:flipper/data/dao/item_variation.dart';
import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/authentication/auth_actions.dart';
import 'package:flipper/model/order.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

class GeneralRepository {
  Future<int> insertTabs(Store<AppState> store, int value) {
    //ignore:missing_required_param
    var tab = new TabsTableData(tab: value, id: 1);
    return store.state.database.tabsDao.insert(tab);
  }

  Future<bool> updateCategory(
      Store<AppState> store, int categoryId, String categoryName, int branchId,
      {bool focused}) async {
    final cat =
        await store.state.database.categoryDao.getCategoryById(categoryId);

    if (cat == null) {
      return false;
    }
    //ignore:missing_required_param
    final updated = CategoryTableData(
      name: categoryName ?? cat.name,
      id: cat.id,
      focused: focused,
      branchId: branchId,
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

  Future<int> insertCategory(Store<AppState> store, {int branchId}) async {
    //ignore: missing_required_param
    var tab = new CategoryTableData(
      branchId: branchId,
      focused: false,
      createdAt: DateTime.now(),
      name: "toBeModified",
    );
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

  Stream<List<CartTableData>> getCarts(Store<AppState> store) {
    return store.state.database.cartDao.getCarts(store.state.order.id);
  }

  Future<bool> insertOrUpdateCart(
      Store<AppState> store, CartTableData data) async {
    //if item with the same variationId exist update content
    CartTableData existingCart = await store.state.database.cartDao
        .getExistingCartItem(data.variationId);
    if (existingCart == null) {
      store.state.database.cartDao.insert(
        data.copyWith(
          createdAt: DateTime.now(),
        ),
      );
      return true;
    } else {
      store.state.database.cartDao.updateCart(
        data.copyWith(
          id: existingCart.id,
          count: existingCart.count,
          updatedAt: DateTime.now(),
        ),
      );
      return true;
    }
  }

  Future<bool> updateOrder(Store<AppState> store, OrderTableData order) async {
    return await store.state.database.orderDao.updateOrder(order);
  }

  Future<OrderTableData> createDraftOrderOrReturnExistingOne(
      Store<AppState> store) async {
    OrderTableData order =
        await store.state.database.orderDao.getExistingDraftOrder();
    if (order != null) {
      store.dispatch(OrderCreated(
        order: Order(
          (o) => o
            ..status = order.status
            ..id = order.id
            ..userId = order.id
            ..branchId = order.branchId
            ..orderNote = order.orderNote
            ..orderNUmber = order.orderNUmber
            ..supplierId = order.supplierId
            ..subTotal = order.subTotal
            ..supplierInvoiceNumber = order.supplierInvoiceNumber
            ..deliverDate = order.deliverDate
            ..taxRate = order.taxRate
            ..discountAmount = order.discountAmount
            ..taxAmount = order.taxAmount
            ..cashReceived = order.cashReceived
            ..discountRate = order.discountRate
            ..saleTotal = order.saleTotal
            ..userId = order.userId
            ..customerSaving = order.customerSaving
            ..paymentId = order.paymentId
            ..orderNote = order.orderNote
            ..status = order.status
            ..customerChangeDue = order.customerChangeDue,
        ),
      ));
      return order;
    } else {
      await store.state.database.orderDao.insert(
        //ignore: missing_required_param
        OrderTableData(
          status: "draft",
          branchId: store.state.branch.id,
          cashReceived: 0,
          customerChangeDue: 0,
          customerSaving: 0,
          deliverDate: DateTime.now(),
          discountAmount: 0,
          discountRate: 0,
          orderNote: "draft",
          orderNUmber: 0,
          paymentId: 0,
          saleTotal: 0,
          subTotal: 0,
          supplierId: 0,
          supplierInvoiceNumber: 0,
          taxAmount: 0,
          taxRate: 0,
          userId: store.state.user.id,
        ),
      );

      OrderTableData order =
          await store.state.database.orderDao.getExistingDraftOrder();

      store.dispatch(OrderCreated(
        order: Order(
          (o) => o
            ..status = order.status
            ..id = order.id
            ..userId = order.id
            ..branchId = order.branchId
            ..orderNote = order.orderNote
            ..orderNUmber = order.orderNUmber
            ..supplierId = order.supplierId
            ..subTotal = order.subTotal
            ..discountAmount = order.discountAmount
            ..supplierInvoiceNumber = order.supplierInvoiceNumber
            ..deliverDate = order.deliverDate
            ..taxRate = order.taxRate
            ..taxAmount = order.taxAmount
            ..discountRate = order.discountRate
            ..cashReceived = order.cashReceived
            ..saleTotal = order.saleTotal
            ..userId = order.userId
            ..customerSaving = order.customerSaving
            ..paymentId = order.paymentId
            ..orderNote = order.orderNote
            ..status = order.status
            ..customerChangeDue = order.customerChangeDue,
        ),
      ));
      return order;
    }
  }
}
