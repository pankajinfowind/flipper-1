import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/respositories/general_repository.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/authentication/auth_actions.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/model/unit.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';

List<Middleware<AppState>> AppActionMiddleware(
  GlobalKey<NavigatorState> navigatorKey,
  GeneralRepository generalRepository,
) {
  return [
    TypedMiddleware<AppState, OnSetTab>(
        _setTab(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, CreateUnit>(
        _createCategory(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, PersistFocusedUnitAction>(
        _persistUnit(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, CreateEmptyTempCategoryAction>(
        _createTempCategory(navigatorKey, generalRepository)),

    // TypedMiddleware<AppState, SaveItemAction>(
    //     _createItemInStore(navigatorKey, generalRepository)),

    TypedMiddleware<AppState, SwitchVariation>(
        _switchVariation(navigatorKey, generalRepository)),

    TypedMiddleware<AppState, SaveRegular>(
        _saveRegular(navigatorKey, generalRepository)),

    TypedMiddleware<AppState, NeedItemVariation>(
        _needItemVariation(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, SaveCart>(
        _saveCart(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, SaveCartCustom>(
        _saveCartCustom(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, SavePayment>(
        _savePayment(navigatorKey, generalRepository)),
  ];
}

void Function(Store<AppState> store, SaveRegular action, NextDispatcher next)
    _saveRegular(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    await generalRepository.insertVariant(
      store,
      //ignore:missing_required_param
      VariationTableData(
        branchId: store.state.branch.id,
        price: action.price,
        id: action.id,
        name: action.name,
      ),
    );
  };
}

void Function(Store<AppState> store, CreateEmptyTempCategoryAction action,
        NextDispatcher next)
    _createTempCategory(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    if (store.state.branch != null) {
      final categoryId = await generalRepository.insertCategory(
        store,
        //ignore: missing_required_param
        CategoryTableData(
          branchId: store.state.branch.id,
          focused: false,
          name: action.name,
          createdAt: DateTime.now(),
        ),
      );
      store.dispatch(TempCategoryIdAction(categoryId: categoryId));
    }
  };
}

void Function(Store<AppState> store, PersistFocusedUnitAction action,
        NextDispatcher next)
    _persistUnit(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) {
    if (store.state.focusedUnit != null) {
      store.state.units.forEach((u) => {
            if (u.id == store.state.focusedUnit)
              {
                generalRepository.updateUnit(
                    store,
                    Unit((j) => j
                      ..id = u.id
                      ..businessId = u.businessId
                      ..branchId = u.branchId
                      ..focused = true
                      ..name = u.name))
              }
            else
              {
                generalRepository.updateUnit(
                    store,
                    Unit((j) => j
                      ..id = u.id
                      ..businessId = u.businessId
                      ..branchId = u.branchId
                      ..focused = false
                      ..name = u.name))
              }
          });
    }
  };
}

void Function(Store<AppState> store, CreateUnit action, NextDispatcher next)
    _createCategory(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) {};
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _setTab(
  GlobalKey<NavigatorState> navigatorKey,
  GeneralRepository generalRepository,
) {
  return (store, action, next) async {
    next(action);
    if (store.state.tab != null) {
      final updated = await generalRepository.updateTab(store, store.state.tab);
      if (!updated) {
        await generalRepository.insertTabs(store, store.state.tab);
      }
    }
  };
}

// void Function(Store<AppState> store, SaveItemAction action, NextDispatcher next)
//     _createItemInStore(GlobalKey<NavigatorState> navigatorKey,
//         GeneralRepository generalRepository) {
//   return (store, action, next) async {
//     next(action);
//     //todo: in v2 clean code duplication.
//     if (action.variations.length == 0) {
//       //atleast make sure we do have one variant per item
//       final item = await generalRepository.insertItem(
//         store,
//         // ignore: missing_required_param
//         ItemTableData(
//           name: action.name,
//           categoryId: action.categoryId,
//           description: action.description,
//           unitId: action.unit.id,
//           color: action.color,
//           branchId: action.branch.id,
//         ),
//       );

//       final variantId = await generalRepository.insertVariant(
//         store,
//         // ignore: missing_required_param
//         VariationTableData(
//           name: "Regular",
//           price: 0,
//           count: 0,
//           itemId: item,
//           isActive: true,
//           branchId: action.branch.id,
//         ),
//       );
//       await generalRepository.insertHistory(store, variantId, 0);
//       //todo: change save the variant with respective price price is saved per variant.
//       //todo: should save item description too

//       if (item is int) {
//         List<ItemTableData> items = await generalRepository.getItems(store);
//         List<Item> itemList = [];

//         items.forEach(
//           (i) => itemList.add(
//             Item(
//               (v) => v
//                 ..name = i.name
//                 ..branchId = i.branchId
//                 ..unitId = i.unitId
//                 ..id = i.id
//                 ..color = i.color
//                 ..categoryId = i.categoryId,
//             ),
//           ),
//         );
//         store.dispatch(ItemLoaded(items: itemList));
//         Router.navigator.popUntil(ModalRoute.withName(Router.dashboard));
//       }
//       return;
//     }

//     //insert item
//     final item = await generalRepository.insertItem(
//       store,
//       // ignore: missing_required_param
//       ItemTableData(
//         name: action.name,
//         description: action.description,
//         categoryId: action.categoryId,
//         unitId: action.unit.id,
//         color: action.color,
//         branchId: action.branch.id,
//       ),
//     );
//     for (var i = 0; i < action.variations.length; i++) {
//       // insert variation and get last id to save the item then
//       //if i=0 then set the variant active=true
//       var variationId;
//       if (i == 0) {
//         variationId = await generalRepository.insertVariant(
//           store,
//           // ignore: missing_required_param
//           VariationTableData(
//               name: action.variations[i].name,
//               price: int.parse(action.variations[i].price),
//               count: action.variations[i].stockValue,
//               branchId: action.branch.id,
//               itemId: item,
//               isActive: true),
//         );
//       } else {
//         variationId = await generalRepository.insertVariant(
//           store,
//           // ignore: missing_required_param
//           VariationTableData(
//               name: action.variations[i].name,
//               price: int.parse(action.variations[i].price),
//               count: action.variations[i].stockValue,
//               branchId: action.branch.id,
//               itemId: item,
//               isActive: false),
//         );
//       }

//       await generalRepository.insertHistory(
//           store, variationId, action.variations[i].stockValue);

//       if (item is int) {
//         List<ItemTableData> items = await generalRepository.getItems(store);
//         List<Item> itemList = [];
//         items.forEach(
//           (i) => itemList.add(
//             Item(
//               (v) => v
//                 ..name = i.name
//                 ..branchId = i.branchId
//                 ..unitId = i.unitId
//                 ..id = i.id
//                 ..color = i.color
//                 ..categoryId = i.categoryId,
//             ),
//           ),
//         );
//         store.dispatch(ItemLoaded(items: itemList));
//         // Logger.d("Sussessfully created an item");
//         Router.navigator.popUntil(ModalRoute.withName(Router.dashboard));
//       }
//     }
//   };
// }

void Function(
        Store<AppState> store, NeedItemVariation action, NextDispatcher next)
    _needItemVariation(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);

    List<VariationTableData> variations = await generalRepository.getVariations(
        store: store, itemId: action.item.id);

    //variants
    List<Item> items = [];
    for (var i = 0; i < variations.length; i++) {
      items.add(
        Item(
          (b) => b
            ..id = variations[i].id
            ..name = variations[i].name
            ..isActive = variations[i].isActive
            ..count = variations[i].count
            ..color = action.item.color
            ..unitId = action.item.unitId
            ..categoryId = action.item.categoryId
            ..price = variations[i].price
            ..branchId = variations[i].branchId,
        ),
      );
    }

    //the top parent variant item that stands for other sub variants.
    store.dispatch(
      CurrentActiveSaleItem(
        item: Item((b) => b
              ..id = action.item.id
              ..color = action.item.color
              ..branchId = action.item.branchId
              ..name = action.item.name
              ..categoryId = action.item.categoryId
              ..unitId = action.item.unitId
              ..price = 0 //set to zero will be changed on edit quantity.
            ),
      ),
    );
    store.dispatch(ItemsVariation(items: items));
    Router.navigator.pushNamed(Router.editQuantityItemScreen);
  };
}

void Function(
        Store<AppState> store, SwitchVariation action, NextDispatcher next)
    _switchVariation(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);

    List<Item> itemsVariations = [];
    for (var i = 0; i < store.state.itemVariations.length; i++) {
      if (store.state.itemVariations[i].id == action.item.id) {
        itemsVariations.add(
          Item(
            (c) => c
              ..isActive = true
              ..price = store.state.itemVariations[i].price
              ..id = store.state.itemVariations[i].id
              ..name = store.state.itemVariations[i].name
              ..branchId = store.state.branch.id,
          ),
        );
      } else {
        itemsVariations.add(
          Item(
            (c) => c
              ..isActive = false
              ..id = store.state.itemVariations[i].id
              ..price = store.state.itemVariations[i].price
              ..name = store.state.itemVariations[i].name
              ..branchId = store.state.branch.id,
          ),
        );
      }
    }
    store.dispatch(ItemsVariation(items: itemsVariations));
  };
}

void Function(Store<AppState> store, SaveCartCustom action, NextDispatcher next)
    _saveCartCustom(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);
    await generalRepository.insertOrUpdateCart(
      store,
      //ignore: missing_required_param
      CartTableData(
        branchId: store.state.cartItem.branchId,
        count: store.state.currentIncrement == null
            ? 1
            : store.state.currentIncrement,
        variationName: store.state.cartItem.name,
        orderId: store.state.order.id,
        price: store.state.cartItem.price,
        variationId: store.state.cartItem.id,
        parentName: store.state.cartItem.parentName,
      ),
    );
  };
}

void Function(Store<AppState> store, SaveCart action, NextDispatcher next)
    _saveCart(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);

    await generalRepository.insertOrUpdateCart(
      store,

      //ignore: missing_required_param
      CartTableData(
        branchId: store.state.cartItem.branchId,
        count: store.state.currentIncrement == null
            ? 1
            : store.state.currentIncrement,
        variationName: store.state.cartItem.name,
        orderId: store.state.order.id,
        price: store.state.cartItem.price,
        variationId: store.state.cartItem.id,
        parentName: store.state.cartItem.parentName,
      ),
    );

    Router.navigator.maybePop();
  };
}

void Function(Store<AppState> store, SavePayment action, NextDispatcher next)
    _savePayment(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);

    // complete order set order to completed
    generalRepository.updateOrder(
      store,
      OrderTableData(
        branchId: store.state.order.branchId,
        id: store.state.order.id,
        status: "completed",
        userId: store.state.order.userId,
        cashReceived: action.cashReceived,
        customerChangeDue: 0,
        customerSaving: 0,
        deliverDate: DateTime.now(),
        discountAmount: 0,
        discountRate: 0,
        orderNote: action.note,
        orderNUmber: 0,
        paymentId: 0,
        saleTotal: 0,
        subTotal: 0,
        supplierId: 0,
        supplierInvoiceNumber: 0,
        taxAmount: 0,
        taxRate: 0,
      ),
    );

    //this will clear all state and create new order if needed.
    store.dispatch(VerifyAuthenticationState());
  };
}
