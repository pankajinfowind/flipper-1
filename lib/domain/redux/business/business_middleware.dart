import 'package:flipper/data/respositories/business_repository.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/user.dart';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';
import 'package:uuid/uuid.dart';

List<Middleware<AppState>> createBusinessMiddleware(
  GlobalKey<NavigatorState> navigatorKey,
  BusinessRepository businessRepository,
) {
  return [
    TypedMiddleware<AppState, CreateBusinessOnSignUp>(
        _createBusiness(navigatorKey, businessRepository)),
    TypedMiddleware<AppState, CreateBusiness>(
        _createBusiness(navigatorKey, businessRepository)),
    TypedMiddleware<AppState, SetActiveBusiness>(
        _setActive(navigatorKey, businessRepository)),
  ];
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _createBusiness(
  GlobalKey<NavigatorState> navigatorKey,
  BusinessRepository businessRepository,
) {
  return (store, action, next) async {
    next(action);

    if (store.state.business != null) {
      User user = await store.state.couch.getDocumentByDocId(
          docId: 'user_' + store.state.userId.toString(),
          store: store,
          T: User);

      String businessId = Uuid().v1();
      Map _mapBusiness = {
        'active': true,
        '_id': 'business_' + store.state.userId.toString(),
        'businessCategoryId': 1,
        'channel': store.state.userId.toString(),
        'businessTypeId': 1,
        'businessUrl': '',
        'country': 'Rwanda',
        'currency': 'RWF',
        'id': businessId,
        'name': store.state.business.name,
        'timeZone': '',
        'userId': user.id,
        'createdAt': DateTime.now().toIso8601String(),
        'updatedAt': DateTime.now().toIso8601String(),
      };

      Map _notTax = {
        'active': true,
        '_id': 'business_' + store.state.userId.toString(),
        'channel': store.state.userId.toString(),
        'businessId': businessId,
        'createdAt': DateTime.now().toIso8601String(),
        'updatedAt': DateTime.now().toIso8601String(),
        'id': Uuid().v1(),
        'isDefault': false,
        'name': 'no tax',
        'percentage': 0,
      };
      await store.state.couch.createBusiness(_mapBusiness);
      await store.state.couch.createTax(_notTax);
      Map vat = {
        'active': true,
        '_id': 'business_' + store.state.userId.toString(),
        'channel': store.state.userId.toString(),
        'businessId': businessId,
        'createdAt': DateTime.now().toIso8601String(),
        'updatedAt': DateTime.now().toIso8601String(),
        'id': Uuid().v1(),
        'isDefault': true,
        'name': 'Vat',
        'percentage': 18,
      };
      await store.state.couch.createTax(vat);
      store.dispatch(BusinessId(businessId));

      store.dispatch(BusinessCreated());
    }
  };
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _setActive(
  GlobalKey<NavigatorState> navigatorKey,
  BusinessRepository businessRepository,
) {
  return (store, action, next) async {
    next(action);
    if (store.state.currentActiveBusiness != null ||
        store.state.nextActiveBusiness != null) {
      //remove active from previous active business
      //add active to new
      if (store.state.nextActiveBusiness != null) {
        //set business
        businessRepository.update(store, store.state.nextActiveBusiness,
            active: true);
      }

      if (store.state.currentActiveBusiness != null) {
        businessRepository.update(store, store.state.currentActiveBusiness,
            active: false);
      }
      final updated = Business((b) => b
        ..id = store.state.nextActiveBusiness.id
        ..name = store.state.nextActiveBusiness.name
        ..longitude = b.longitude
        ..latitude = b.latitude
        ..hexColor = store.state.nextActiveBusiness.hexColor
        ..active = true);
      store.dispatch(RefreshBusinessList(updated));
    }
  };
}
