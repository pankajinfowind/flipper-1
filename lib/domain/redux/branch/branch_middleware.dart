import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/respositories/branch_repository.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/authentication/auth_actions.dart';
import 'package:flipper/domain/redux/branch/branch_actions.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/hint.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

List<Middleware<AppState>> createBranchMiddleware(
  GlobalKey<NavigatorState> navigatorKey,
    BranchRepository branchRepository,
) {
  return [
    TypedMiddleware<AppState, BusinessCreated>(
        _onBusinessCreated(navigatorKey, branchRepository)),
    TypedMiddleware<AppState, OnSetBranchHint>(
        _onSetBranchHint(navigatorKey, branchRepository)),
  ];
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
    _onBusinessCreated(GlobalKey<NavigatorState> navigatorKey,
    BranchRepository branchRepo) {
  return (store, action, next) async {
    final branch = Branch((b)=>b..name=store.state.business.name);
    await branchRepo.insert(store, branch);
    store.dispatch(VerifyAuthenticationState()); //when creating a branch we need to refresh all states i.e we went to auth verify
  };
}

void Function(Store<AppState> store, dynamic action, NextDispatcher next)
_onSetBranchHint(GlobalKey<NavigatorState> navigatorKey,
    BranchRepository branchRepo) {
  return (store, action, next) async {
    List<BranchTableData> branches = await branchRepo.getBranches(store);
    if(store.state.branch == null){
        if(branches.length ==1){ //we have only one branch then set it as hint
          final _hint = Hint((h)=>h..name=branches[0].name..type=HintType.Branch);
          store.dispatch(OnHintLoaded(hint: _hint));
        }else{
          //TODO: get the branch that is set as hint
          if(store.state.branch ==null){
            final _hint = Hint((h)=>h..name=branches[0].name..type=HintType.Branch);
            store.dispatch(OnHintLoaded(hint: _hint));
          }
        }
    }
  };
}
