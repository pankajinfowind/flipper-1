import 'package:flipper/domain/redux/user/user_actions.dart';
import "package:redux/redux.dart";

import '../app_state.dart';

final userReducers = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, OnUserUpdateAction>(_onUserUpdate),
  TypedReducer<AppState, WithUser>(_withUser),
  TypedReducer<AppState, UserID>(_userId),
];

AppState _onUserUpdate(AppState state, OnUserUpdateAction action) {
  return state.rebuild((a) => a
      // Update the app user
//    ..user = action.user.toBuilder()
      // Update the user in the groupUsers
//    ..groupUsers.removeWhere((u) => u.uid == action.user.uid)
//    ..groupUsers.add(action.user)
      );
}

//AppState _onUsersUpdate(AppState state, UsersUpdateAction action) {
//  return state.rebuild((a) => a..groupUsers = ListBuilder(action.users));
//}

AppState _userId(AppState state, UserID action) {
  return state.rebuild((a) => a..userId = action.userId);
}

AppState _withUser(AppState state, WithUser action) {
  return state.rebuild((a) => a..user = action.user.toBuilder());
}
