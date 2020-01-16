import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:redux/redux.dart';

final businessReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, OnBusinessLoaded>(_onBusinessLoaded),
  TypedReducer<AppState, WithBusiness>(_onCreatingBusiness),
  TypedReducer<AppState, ResetBusiness>(_resetBusiness),
];
AppState _onBusinessLoaded(AppState state, OnBusinessLoaded action) {
  return state.rebuild((a) => a..businesses = action.business);
}

AppState _onCreatingBusiness(AppState state, WithBusiness action) {
  return state.rebuild((a) => a..business = action.business.toBuilder());
}
AppState _resetBusiness(AppState state, ResetBusiness action) {
  return state.rebuild((a) => a..business = null);
}
