import 'package:built_collection/built_collection.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

import 'actions.dart';

final appActionReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, AppAction>(_onAppActions),
  TypedReducer<AppState, BusinessId>(_onBusinessId),
  TypedReducer<AppState, UnitR>(_onUnits),
  TypedReducer<AppState, CurrentUnit>(_onCurrentUnit),
  TypedReducer<AppState, CurrentColor>(_onCurrentColor),
  TypedReducer<AppState, CategoryNameAction>(_onCategoryName),
  TypedReducer<AppState, TempCategoryIdAction>(_onTempCategoryId),
  TypedReducer<AppState, CategoryAction>(_onCategories),
  TypedReducer<AppState, UpdateUnitAction>(_onUpdateUnit),
  TypedReducer<AppState, WithUnitId>(_withUnitId),
  TypedReducer<AppState, ResetAppAction>(_onResetAppAction),
  TypedReducer<AppState, CurrentTab>(_onSetTab),
  TypedReducer<AppState, CurrentDisable>(_onDisable),
  TypedReducer<AppState, VariationAction>(_onVariations),
  TypedReducer<AppState, ItemLoaded>(_onItemLoaded),
  TypedReducer<AppState, AddItemToCartAction>(_onCurrentSale),
  TypedReducer<AppState, IncrementAction>(_onIncrement),
  TypedReducer<AppState, ItemsVariation>(_onItemsVariation),
  TypedReducer<AppState, CurrentActiveSaleItem>(_onCurrentSaleItem),
];
AppState _onAppActions(AppState state, AppAction action) {
  return state.rebuild((a) => a..action = action.actions.toBuilder());
}

AppState _onResetAppAction(AppState state, ResetAppAction action) {
  //todo: should update the
  return state.rebuild((a) => a..action = null);
}

AppState _onUpdateUnit(AppState state, UpdateUnitAction action) {
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

AppState _onCurrentUnit(AppState state, CurrentUnit action) {
  return state.rebuild((a) => a..currentUnit = action.unit.toBuilder());
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

AppState _onItemLoaded(AppState state, ItemLoaded action) {
  return state.rebuild((a) => a..items = ListBuilder(action.items));
}

AppState _onCurrentSale(AppState state, AddItemToCartAction action) {
  return state.rebuild((a) => a..cartItems = ListBuilder(action.cartItems));
}

AppState _onIncrement(AppState state, IncrementAction action) {
  return state.rebuild((a) => a..currentIncrement = action.increment);
}

AppState _onItemsVariation(AppState state, ItemsVariation action) {
  return state.rebuild((a) => a..itemVariations = ListBuilder(action.items));
}

AppState _onCurrentSaleItem(AppState state, CurrentActiveSaleItem action) {
  return state
      .rebuild((a) => a..currentActiveSaleItem = action.item.toBuilder());
}
