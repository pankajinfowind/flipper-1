import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/respositories/business_repository.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/model/business.dart';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';

List<Middleware<AppState>> createBusinessMiddleware(
  GlobalKey<NavigatorState> navigatorKey,
  BusinessRepository businessRepository,
) {
  return [
    TypedMiddleware<AppState, CreateBusiness>(
        _createBusiness(navigatorKey, businessRepository)),
  ];
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _createBusiness(
  GlobalKey<NavigatorState> navigatorKey,
  BusinessRepository businessRepository,
) {
  return (store, action, next) async {
    next(action);
    businessRepository.insert(store, store.state.business);
    List<BusinessTableData> businessList = await businessRepository.getBusinesses(store);
    List<Business> businesses = [];
    businessList.forEach((b)=>{
      businesses.add(Business((bu)=>bu..name=b.name..id=b.id))
    });
    store.dispatch(OnBusinessLoaded(business: businesses));
  };
}
