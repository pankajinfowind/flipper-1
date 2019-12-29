import "package:redux/redux.dart";

import '../app_state.dart';
import 'auth_actions.dart';

final authReducers = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, OnAuthenticated>(_onAuthenticated),
  TypedReducer<AppState, OnLogoutSuccess>(_onLogout),
  //TODO: move this to it's own reducer later.
  TypedReducer<AppState, OnBranchLoaded>(_onBranchLoaded),
  TypedReducer<AppState, OnHintLoaded>(_onHintLoaded),
];

//TODO: move this to it's own reducer later.
AppState _onBranchLoaded(AppState state, OnBranchLoaded action) {
  return state.rebuild((a) => a..branches = action.branches);
}

AppState _onHintLoaded(AppState state, OnHintLoaded action) {
  return state.rebuild((a) => a..hint = action.hint.toBuilder());
}

AppState _onAuthenticated(AppState state, OnAuthenticated action) {
  return state.rebuild((a) => a..user = action.user.toBuilder());
}

AppState _onLogout(AppState state, OnLogoutSuccess action) {
  return state.clear();
}
