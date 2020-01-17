import 'package:flipper/data/respositories/business_repository.dart';
import 'package:flipper/data/respositories/general_repository.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';


List<Middleware<AppState>> AppActionMiddleware(
    GlobalKey<NavigatorState> navigatorKey,
    GeneralRepository generalRepository,
    ) {
  return [
    TypedMiddleware<AppState, OnSetTab>(
        _setTab(navigatorKey, generalRepository))
  ];
}


void Function(Store<AppState> store, dynamic action, NextDispatcher next)
_setTab(
    GlobalKey<NavigatorState> navigatorKey,
    GeneralRepository generalRepository,
    ) {
  return (store, action, next) async {
    next(action);
    if(store.state.tab !=null){
     final updated =  await generalRepository.update(store, store.state.tab);
     if(!updated){
       await generalRepository.insert(store, store.state.tab);
     }
    }
  };
}
