import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/model/business.dart';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';

/// load all business a user belongs to store

List<Middleware<AppState>> createBusinessMiddleware(
  GlobalKey<NavigatorState> navigatorKey,
) {
  return [
    TypedMiddleware<AppState, ShouldLoadBusiness>(_business(navigatorKey)),
  ];
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _business(
  GlobalKey<NavigatorState> navigatorKey,
) {
  return (store, action, next) async {
    next(action);
    final _business_1 = Business((b) => b
      ..id = 1
      ..name = "Yegobox"
      ..hexColor = "#ccc"
      ..image = "image here"
      ..abbreviation = "Y"
      ..type = BusinessType.NORMAL);
    final _business_2 = Business((b) => b
      ..id = 2
      ..hexColor = "#ccc"
      ..name = "Flipper"
      ..image = "image here"
      ..abbreviation = "F"
      ..type = BusinessType.NORMAL);

    List<Business> businessList = [_business_1, _business_2];

    store.dispatch(OnBusinessLoaded(business: businessList));
  };
}
