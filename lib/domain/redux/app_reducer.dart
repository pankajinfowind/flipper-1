import 'package:flipper/domain/redux/authentication/auth_reducer.dart';
import 'package:flipper/domain/redux/bottom_sheet/bottom_sheet_reducer.dart';
import 'package:flipper/domain/redux/business/business_reducer.dart';
import 'package:flipper/domain/redux/user/user_reducer.dart';
import 'package:redux/redux.dart';

import '../app_actions.dart';
import 'app_actions/app_actions_reducer.dart';
import 'app_state.dart';

final appReducer = combineReducers<AppState>([
  TypedReducer<AppState, OnProductLoaded>(_onUserLoaded),
  ...authReducers,
  ...businessReducer,
  ...userReducers,
  ...bottomSheetReducer,
  ...appActionReducer
]);
AppState _onUserLoaded(AppState state, OnProductLoaded action) {
//  return state.rebuild((a)=>a..user =>action.userReducers)
}
