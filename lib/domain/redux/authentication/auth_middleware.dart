import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/user_repository.dart';
import 'package:flipper/domain/app_actions.dart';
import 'package:flipper/model/hint.dart';
import 'package:flipper/model/user.dart';
import 'package:flipper/routes.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/logger.dart';
import "package:flutter/material.dart";
import "package:flutter/widgets.dart";
import "package:redux/redux.dart";

import '../app_state.dart';
import 'auth_actions.dart';

/// Authentication Middleware
/// LogIn: Logging user in
/// LogOut: Logging user out
/// VerifyAuthenticationState: Verify if user is logged in

List<Middleware<AppState>> createAuthenticationMiddleware(
  UserRepository userRepository,
  GlobalKey<NavigatorState> navigatorKey,
) {
  return [
    TypedMiddleware<AppState, VerifyAuthenticationState>(
        _verifyAuthState(userRepository, navigatorKey)),
    TypedMiddleware<AppState, LogIn>(_authLogin(userRepository, navigatorKey)),
    TypedMiddleware<AppState, LogOutAction>(
        _authLogout(userRepository, navigatorKey)),
    TypedMiddleware<AppState, AfterLoginAction>(
        _loggedIn(userRepository, navigatorKey)),
  ];
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _loggedIn(
  UserRepository userRepository,
  GlobalKey<NavigatorState> navigatorKey,
) {
  return (store, action, next) async {
    next(action);
    List<UserData> user = await userRepository.checkAuth(store);
    if (user == null || user.length == 0) {
      navigatorKey.currentState.pushReplacementNamed(Routes.login);
      return;
    } else {
      final _user = User((u) => u
        ..bearerToken = user[0].bearerToken
        ..username = user[0].username
        ..refreshToken = user[0].refreshToken
        ..status = user[0].status
        ..avatar = user[0].avatar
        ..email = user[0].email);

      store.dispatch(OnAuthenticated(user: _user));
      store.dispatch(ConnectToDataSource());
    }
  };
}

void Function(
  Store<AppState> store,
  dynamic action,
  NextDispatcher next,
) _authLogout(
  UserRepository userRepository,
  GlobalKey<NavigatorState> navigatorKey,
) {
  return (store, action, next) async {
    next(action);
    try {
      await userRepository.logOut();
      store.dispatch(OnLogoutSuccess());
    } catch (e) {
      Logger.w("Failed logout", e: e);
      store.dispatch(OnLogoutFail(e));
    }
  };
}

void Function(
  Store<AppState> store,
  VerifyAuthenticationState action,
  NextDispatcher next,
) _verifyAuthState(
  UserRepository userRepository,
  GlobalKey<NavigatorState> navigatorKey,
) {
  return (store, action, next) async {
    next(action);

    if (userRepository.checkAuth(store) == null) {
      navigatorKey.currentState.pushReplacementNamed(Routes.login);
      store.dispatch(Unauthenticated);
      return;
    }
    List<UserData> user = await userRepository.checkAuth(store);
    List<UserData> business = await userRepository.checkAuth(store);
    if (user == null || user.length == 0) {
      Router.navigator.pushNamed(Router.login);
      return;
    } else {
      //  store.dispatch(OnBranchLoaded(branches: branchList));

      //defining hint branch
      //TODO: make hint comes from a default branch
      final _hint = Hint((h) => h
        ..name = "Nyamirambo Branch"
        ..type = HintType.Branch);
      store.dispatch(OnHintLoaded(hint: _hint));

      final _user = User((u) => u
        ..bearerToken = user[0].bearerToken
        ..username = user[0].username
        ..refreshToken = user[0].refreshToken
        ..status = user[0].status
        ..avatar = user[0].avatar
        ..email = user[0].email);

      store.dispatch(OnAuthenticated(user: _user));

      Router.navigator.pushNamed(Router.dashboard);
    }
  };
}

void Function(
  Store<AppState> store,
  dynamic action,
  NextDispatcher next,
) _authLogin(
  UserRepository userRepository,
  GlobalKey<NavigatorState> navigatorKey,
) {
  return (store, action, next) async {
    next(action);
  };
}
