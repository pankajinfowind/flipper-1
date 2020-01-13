import 'package:flipper/data/user_repository.dart';
import 'package:flipper/domain/app_actions.dart';
import 'package:flipper/model/branch.dart';
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
    TypedMiddleware<AppState, UserAction>(_user(userRepository, navigatorKey)),
  ];
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next) _user(
  UserRepository userRepository,
  GlobalKey<NavigatorState> navigatorKey,
) {
  return (store, action, next) async {
    next(action);
    userRepository.checkAuth(store).listen((user) {
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
    });
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
    userRepository.checkAuth(store).listen((user) {
      if (user == null || user.length == 0) {
        Router.navigator.pushNamed(Router.login);
        return;
      } else {
        //TODO: check if we have business user then fire getting branch dummy data
        final _branch_1 = Branch((b) => b
          ..id = 1
          ..location = "Kimironko"
          ..isCurrentFocused = false
          ..name = "Gikondo Branch"
          ..description = "Sell beans");
        final _branch_2 = Branch((b) => b
          ..id = 1
          ..location = "Gikondo"
          ..isCurrentFocused = false
          ..name = "Gikondo Branch"
          ..description = "Sell beans");
        final _branch_3 = Branch((b) => b
          ..id = 1
          ..location = "Nyamirambo"
          ..isCurrentFocused = false
          ..name = "Nyamirambo Branch"
          ..description = "Sell beans");

        List<Branch> branchList = List<Branch>(3);
        branchList[0] = _branch_1;
        branchList[1] = _branch_2;
        branchList[2] = _branch_3;

        store.dispatch(OnBranchLoaded(branches: branchList));

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
        store.dispatch(ConnectToDataSource());

        Router.navigator.pushNamed(Router.dashboard);
      }
    });
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
