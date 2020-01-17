import 'package:flipper/model/app_action.dart';
import 'package:flutter/material.dart';

@immutable
class AppAction {
  final AppActions actions;

  const AppAction({@required this.actions});
}

@immutable
class OnSetTab {
}

@immutable
class CurrentTab {
  final int tab;

  const CurrentTab({@required this.tab});
}

@immutable
class ResetAppAction {}
