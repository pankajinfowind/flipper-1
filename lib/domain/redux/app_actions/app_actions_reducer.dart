import 'package:built_collection/built_collection.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

import 'actions.dart';

final appActionReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, AppAction>(_onAppActions),
  TypedReducer<AppState, BusinessId>(_onBusinessId),
  TypedReducer<AppState, UnitR>(_onUnits),
  TypedReducer<AppState, CurrentUnit>(_onCurrentUnit),
  TypedReducer<AppState, CurrentColor>(_onCurrentColor),
  TypedReducer<AppState, CurrentCategory>(_onCurrentCategory),
  TypedReducer<AppState, WithCategoryId>(_onCategoryFocusedChanged),
  TypedReducer<AppState, CategoryNameAction>(_onCategoryName),
  TypedReducer<AppState, TempCategoryIdAction>(_onTempCategoryId),
  TypedReducer<AppState, CategoryAction>(_onCategories),
  TypedReducer<AppState, UpdateUnitAction>(_onUpdateUnit),
  TypedReducer<AppState, UpdateCategoryAction>(_onUpdateCategory),
  TypedReducer<AppState, WithUnitId>(_withUnitId),
  TypedReducer<AppState, ResetAppAction>(_onResetAppAction),
  TypedReducer<AppState, CurrentTab>(_onSetTab),
  TypedReducer<AppState, CurrentDisable>(_onDisable),
  TypedReducer<AppState, VariationAction>(_onVariations),
];
AppState _onAppActions(AppState state, AppAction action) {
  return state.rebuild((a) => a..action = action.actions.toBuilder());
}

AppState _onResetAppAction(AppState state, ResetAppAction action) {
  //TODO: should update the
  return state.rebuild((a) => a..action = null);
}

AppState _onUpdateUnit(AppState state, UpdateUnitAction action) {
  //Logger.d(action.unitId.toString()); todo: fix the proper logger asap
  List<Unit> updatedUnits = [];
  state.units.forEach((u) => {
        if (u.id == action.unitId)
          {
            updatedUnits.add(Unit((j) => j
              ..id = u.id
              ..businessId = u.businessId
              ..branchId = u.branchId
              ..focused = true
              ..name = u.name))
          }
        else
          {
            updatedUnits.add(Unit((j) => j
              ..id = u.id
              ..businessId = u.businessId
              ..branchId = u.branchId
              ..focused = false
              ..name = u.name))
          }
      });
  return state.rebuild((a) => a..units = ListBuilder(updatedUnits));
}

AppState _onBusinessId(AppState state, BusinessId action) {
  return state.rebuild((a) => a..businessId = action.businessId);
}

AppState _onUnits(AppState state, UnitR action) {
  return state.rebuild((a) => a..units = ListBuilder(action.units));
}

AppState _onSetTab(AppState state, CurrentTab action) {
  return state.rebuild((a) => a..tab = action.tab);
}

AppState _withUnitId(AppState state, WithUnitId action) {
  return state.rebuild((a) => a..focusedUnit = action.unitId);
}

AppState _onCategories(AppState state, CategoryAction action) {
  return state.rebuild((a) => a..categories = ListBuilder(action.categories));
}

AppState _onCategoryName(AppState state, CategoryNameAction action) {
  return state.rebuild((a) => a..categoryName = action.name);
}

AppState _onTempCategoryId(AppState state, TempCategoryIdAction action) {
  return state.rebuild((a) => a..tempCategoryId = action.categoryId);
}

AppState _onCategoryFocusedChanged(AppState state, WithCategoryId action) {
  return state.rebuild((a) => a..focusedCategoryId = action.categoryId);
}

AppState _onUpdateCategory(AppState state, action) {
  List<Category> categories = [];
  state.categories.forEach((u) => {
        if (u.id == action.categoryId)
          {
            categories.add(Category((c) => c
              ..focused = true
              ..id = u.id
              ..name = u.name
              ..businessId = u.businessId
              ..branchId = u.branchId))
          }
        else
          {
            categories.add(Category((c) => c
              ..focused = false
              ..id = u.id
              ..name = u.name
              ..businessId = u.businessId
              ..branchId = u.branchId))
          }
      });
  return state.rebuild((a) => a..categories = ListBuilder(categories));
}

AppState _onCurrentUnit(AppState state, CurrentUnit action) {
  return state.rebuild((a) => a..currentUnit = action.unit.toBuilder());
}

AppState _onCurrentCategory(AppState state, CurrentCategory action) {
  return state.rebuild((a) => a..currentCategory = action.category.toBuilder());
}

AppState _onCurrentColor(AppState state, CurrentColor action) {
  return state.rebuild((a) => a..currentColor = action.color.toBuilder());
}

AppState _onDisable(AppState state, CurrentDisable action) {
  return state.rebuild((a) => a..currentDisable = action.disable.toBuilder());
}

AppState _onVariations(AppState state, VariationAction action) {
  return state.rebuild((a) => a..variations = ListBuilder(action.variations));
}
