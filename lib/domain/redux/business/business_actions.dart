import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/business.dart';
import 'package:flutter/material.dart';

class ShouldLoadBusiness {}

@immutable
class CreateBusiness {
  final Business business;

  CreateBusiness(this.business);
  @override
  String toString() {
    return "CreateBusiness{CreateBusiness: $business}";
  }
}

@immutable
class OnBusinessLoaded {
  final List<Business> business;

  const OnBusinessLoaded({@required this.business});

  @override
  String toString() {
    return "OnBranchLoaded{OnHintLoaded: $business}";
  }
}

@immutable
class OnCreatingBusiness {
  final AppActions action;

  OnCreatingBusiness({@required this.action});

  @override
  String toString() {
    return "OnCreatingBusiness{OnCreatingBusiness: $action}";
  }
}
