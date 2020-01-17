import 'package:flipper/domain/redux/app_state.dart';
import 'package:redux/redux.dart';

import 'actions.dart';

final appActionReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, AppAction>(_onAppActions),
  TypedReducer<AppState, ResetAppAction>(_onResetAppAction),
  TypedReducer<AppState, CurrentTab>(_onSetTab),
];
AppState _onAppActions(AppState state, AppAction action) {
  return state.rebuild((a) => a..action = action.actions.toBuilder());
}

AppState _onResetAppAction(AppState state, ResetAppAction action) {
  return state.rebuild((a) => a..action = null);
}

AppState _onSetTab(AppState state, CurrentTab action) {
  return state.rebuild((a) => a..tab = action.tab);
}
