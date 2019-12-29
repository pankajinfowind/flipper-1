import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:redux/redux.dart';

final businessReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, OnBusinessLoaded>(_onAuthenticated),
];
AppState _onAuthenticated(AppState state, OnBusinessLoaded action) {
  return state.rebuild((a) => a..business = action.business);
}
