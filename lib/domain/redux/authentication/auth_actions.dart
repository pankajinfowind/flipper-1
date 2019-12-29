import "dart:async";

import 'package:flipper/model/hint.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/user.dart';
import "package:meta/meta.dart";

// Authentication
class VerifyAuthenticationState {}

class UserAction {}

class LogIn {
  final String email;
  final String password;
  final Completer completer;

  LogIn({this.email, this.password, Completer completer})
      : completer = completer ?? Completer();
}

@immutable
class OnHintLoaded {
  final Hint hint;

  const OnHintLoaded({@required this.hint});

  @override
  String toString() {
    return "OnBranchLoaded{OnHintLoaded: $hint}";
  }
}

@immutable
class OnBranchLoaded {
  final List<Branch> branches;

  const OnBranchLoaded({@required this.branches});

  @override
  String toString() {
    return "OnBranchLoaded{OnBranchLoaded: $branches}";
  }
}

@immutable
class OnAuthenticated {
  final User user;

  const OnAuthenticated({@required this.user});

  @override
  String toString() {
    return "OnAuthenticated{user: $user}";
  }
}

class LogOutAction {}

class OnLogoutSuccess {
  OnLogoutSuccess();

  @override
  String toString() {
    return "LogOut{user: null}";
  }
}

class Unauthenticated {
  final dynamic error;

  Unauthenticated(this.error);

  @override
  String toString() {
    return "OnLogoutFail{There was an error logging in: $error}";
  }
}

class OnLogoutFail {
  final dynamic error;

  OnLogoutFail(this.error);

  @override
  String toString() {
    return "OnLogoutFail{There was an error logging in: $error}";
  }
}
