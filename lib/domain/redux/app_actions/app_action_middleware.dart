import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/respositories/general_repository.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/category.dart';
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
    TypedMiddleware<AppState, CreateCategoryFromAddItemScreenAction>(
        _createCategoryRegular(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, PersistFocusedUnitAction>(
        _persistUnit(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, InvokePersistFocusedCategory>(
        _persistCategoryFocused(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, CreateEmptyTempCategoryAction>(
        _createTempCategory(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, SaveItemAction>(
        _createItemInStore(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, SwitchCategory>(
        _switchCategory(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, SwitchVariation>(
        _switchVariation(navigatorKey, generalRepository)),
    TypedMiddleware<AppState, NeedItemVariation>(
        _needItemVariation(navigatorKey, generalRepository)),
  ];
}

void Function(Store<AppState> store,
        CreateCategoryFromAddItemScreenAction action, NextDispatcher next)
    _createCategoryRegular(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    if (store.state.tempCategoryId != null &&
        store.state.categoryName != null &&
        store.state.branch != null) {
      //set other category to false so we can only have one focused category.
      List<CategoryTableData> categoriesL =
          await generalRepository.getCategories(store);
      for (var i = 0; i < categoriesL.length; i++) {
        await generalRepository.updateCategory(
          store,
          categoriesL[i].id,
          categoriesL[i].name,
          store.state.branch.id,
          focused: false,
        );
      }

      await generalRepository.updateCategory(
        store,
        store.state.tempCategoryId,
        store.state.categoryName,
        store.state.branch.id,
        focused: true,
      );

      List<CategoryTableData> categoryList =
          await generalRepository.getCategories(store);

      List<Category> categories = [];

      categoryList.forEach((c) => {
            categories.add(Category(
              (u) => u
                ..name = c.name
                ..focused = c.focused
                ..branchId = store.state.branch.id
                ..id = c.id,
            ))
          });

      store.dispatch(CategoryAction(categories));
    } else {
      //show a toast that creating category failed.
    }
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
        branchId: store.state.branch.id, //currentActiveBranch
      );
      store.dispatch(TempCategoryIdAction(categoryId: categoryId));
    }
  };
}

void Function(Store<AppState> store, InvokePersistFocusedCategory action,
        NextDispatcher next)
    _persistCategoryFocused(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    store.state.categories.forEach((u) => {
          if (u.id == action.category.id)
            {
              generalRepository.updateCategory(
                store,
                u.id,
                null,
                store.state.branch.id,
                focused: true,
              )
            }
          else
            {
              generalRepository.updateCategory(
                store,
                u.id,
                null,
                store.state.branch.id,
                focused: false,
              )
            }
        });
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
  return (store, action, next) {
    print(store.state.currentActiveBusiness);
    print(store.state.category);
  };
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

void Function(Store<AppState> store, SaveItemAction action, NextDispatcher next)
    _createItemInStore(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);
    //todo: in v2 clean code duplication.
    if (action.variations.length == 0) {
      //atleast make sure we do have one variant per item
      final item = await generalRepository.insertItem(
        store,
        // ignore: missing_required_param
        ItemTableData(
          name: action.name,
          categoryId: action.category.id,
          description: action.description,
          unitId: action.unit.id,
          color: action.color,
          branchId: action.branch.id,
        ),
      );

      final variantId = await generalRepository.insertVariant(
        store,
        // ignore: missing_required_param
        VariationTableData(
          name: "Regular",
          price: 0,
          count: 0,
          itemId: item,
          isActive: true,
          branchId: action.branch.id,
        ),
      );
      await generalRepository.insertHistory(store, variantId, 0);
      //todo: change save the variant with respective price price is saved per variant.
      //todo: should save item description too

      if (item is int) {
        List<ItemTableData> items = await generalRepository.getItems(store);
        List<Item> itemList = [];

        items.forEach(
          (i) => itemList.add(
            Item(
              (v) => v
                ..name = i.name
                ..branchId = i.branchId
                ..unitId = i.unitId
                ..id = i.id
                ..color = i.color
                ..categoryId = i.categoryId,
            ),
          ),
        );
        store.dispatch(ItemLoaded(items: itemList));
        Router.navigator.popUntil(ModalRoute.withName(Router.dashboard));
      }
      return;
    }

    //insert item
    final item = await generalRepository.insertItem(
      store,
      // ignore: missing_required_param
      ItemTableData(
        name: action.name,
        description: action.description,
        categoryId: action.category.id,
        unitId: action.unit.id,
        color: action.color,
        branchId: action.branch.id,
      ),
    );
    for (var i = 0; i < action.variations.length; i++) {
      // insert variation and get last id to save the item then
      //if i=0 then set the variant active=true
      var variationId;
      if (i == 0) {
        variationId = await generalRepository.insertVariant(
          store,
          // ignore: missing_required_param
          VariationTableData(
              name: action.variations[i].name,
              price: int.parse(action.variations[i].price),
              count: action.variations[i].stockValue,
              branchId: action.branch.id,
              itemId: item,
              isActive: true),
        );
      } else {
        variationId = await generalRepository.insertVariant(
          store,
          // ignore: missing_required_param
          VariationTableData(
              name: action.variations[i].name,
              price: int.parse(action.variations[i].price),
              count: action.variations[i].stockValue,
              branchId: action.branch.id,
              itemId: item,
              isActive: false),
        );
      }

      await generalRepository.insertHistory(
          store, variationId, action.variations[i].stockValue);

      if (item is int) {
        List<ItemTableData> items = await generalRepository.getItems(store);
        List<Item> itemList = [];
        items.forEach(
          (i) => itemList.add(
            Item(
              (v) => v
                ..name = i.name
                ..branchId = i.branchId
                ..unitId = i.unitId
                ..id = i.id
                ..color = i.color
                ..categoryId = i.categoryId,
            ),
          ),
        );
        store.dispatch(ItemLoaded(items: itemList));
        // Logger.d("Sussessfully created an item");
        Router.navigator.popUntil(ModalRoute.withName(Router.dashboard));
      }
    }
  };
}

void Function(Store<AppState> store, SwitchCategory action, NextDispatcher next)
    _switchCategory(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);

    List<Category> categories = [];
    for (var i = 0; i < store.state.categories.length; i++) {
      if (store.state.categories[i].id == action.category.id) {
        categories.add(
          Category(
            (c) => c
              ..focused = true
              ..id = store.state.categories[i].id
              ..name = store.state.categories[i].name
              ..branchId = store.state.branch.id,
          ),
        );
      } else {
        categories.add(
          Category(
            (c) => c
              ..focused = false
              ..id = store.state.categories[i].id
              ..name = store.state.categories[i].name
              ..branchId = store.state.branch.id,
          ),
        );
      }
    }
    //print(categories);
    store.dispatch(CategoryAction(categories));
  };
}

void Function(
        Store<AppState> store, NeedItemVariation action, NextDispatcher next)
    _needItemVariation(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    next(action);

    List<VariationTableData> variations = await generalRepository.getVariations(
        store: store, itemId: action.item.id);

    List<Item> items = [];
    for (var i = 0; i < variations.length; i++) {
      items.add(
        Item((b) => b
          ..id = variations[i].id
          ..name = variations[i].name
          ..isActive = variations[i].isActive
          ..count = variations[i].count
          ..color = action.item.color
          ..unitId = action.item.unitId
          ..categoryId = action.item.categoryId
          ..price = variations[i].price
          ..branchId = variations[i].branchId),
      );
    }
    store.dispatch(CurrentActiveSaleItem(item: action.item));
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
