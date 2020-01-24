import 'package:built_collection/built_collection.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

import 'actions.dart';

final appActionReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, AppAction>(_onAppActions),
  TypedReducer<AppState, BusinessId>(_onBusinessId),
  TypedReducer<AppState, UnitR>(_onUnits),
  TypedReducer<AppState, CategoryAction>(_onCategories),
  TypedReducer<AppState, UpdateUnitAction>(_onUpdateUnit),
  TypedReducer<AppState, WithUnitId>(_withUnitId),
  TypedReducer<AppState, ResetAppAction>(_onResetAppAction),
  TypedReducer<AppState, CurrentTab>(_onSetTab),
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
