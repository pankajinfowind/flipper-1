import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/respositories/general_repository.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/model/unit.dart';
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
  ];
}

void Function(Store<AppState> store,
        CreateCategoryFromAddItemScreenAction action, NextDispatcher next)
    _createCategoryRegular(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    if (store.state.tempCategoryId != null &&
        store.state.categoryName != null &&
        store.state.currentActiveBusiness != null) {
      await generalRepository.updateCategory(store, store.state.tempCategoryId,
          store.state.categoryName, store.state.currentActiveBusiness);

      List<CategoryTableData> categoryList =
          await generalRepository.getCategories(store);

      List<Category> categories = [];

      categoryList.forEach((c) => {
            categories.add(Category(
              (u) => u
                ..name = c.name
                ..focused = c.focused
                ..businessId = u.businessId ?? 0
                ..branchId = u.branchId ?? 0
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
    if (store.state.currentActiveBusiness != null) {
      //TODO: it temp exist return it otherwise createIt.
      final categoryId = await generalRepository.insertCategory(
          store, store.state.currentActiveBusiness.id);
      store.dispatch(TempCategoryIdAction(categoryId: categoryId));
    }
  };
}

void Function(Store<AppState> store, InvokePersistFocusedCategory action,
        NextDispatcher next)
    _persistCategoryFocused(GlobalKey<NavigatorState> navigatorKey,
        GeneralRepository generalRepository) {
  return (store, action, next) async {
    if (store.state.currentCategory.id != null) {
      store.state.categories.forEach((u) => {
            if (u.id == store.state.currentCategory.id)
              {
                generalRepository.updateCategory(
                    store,
                    store.state.currentCategory.id,
                    null,
                    store.state.currentActiveBusiness,
                    focused: true)
              }
            else
              {
                generalRepository.updateCategory(
                  store,
                  store.state.currentCategory.id,
                  null,
                  store.state.currentActiveBusiness,
                  focused: false,
                )
              }
          });
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
