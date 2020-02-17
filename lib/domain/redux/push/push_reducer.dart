import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/push/push_actions.dart';
import "package:redux/redux.dart";

final pushReducers = <AppState Function(AppState, dynamic)>[
  // TypedReducer<AppState, ShowPushNotificationAction>(
  //     _showPushNotificationAction),
  // TypedReducer<AppState, OnPushNotificationDismissedAction>(
  //     _onPushNotificationDismissed),
];
