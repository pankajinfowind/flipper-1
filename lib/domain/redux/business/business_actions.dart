import 'package:flipper/model/business.dart';
import 'package:flutter/material.dart';

class ShouldLoadBusiness {}

class BusinessCreated {}

class CreateBusinessOnSignUp {}

class CreateBusiness {}

class ResetBusiness {}

class SetActiveBusiness {
  final Business businessId;

  SetActiveBusiness(this.businessId);
}

@immutable
class WithBusiness {
  final Business business;

  WithBusiness(this.business);
  @override
  String toString() {
    return "CreateBusiness{CreateBusiness: $business}";
  }
}
@immutable
class ActiveBusinessId{
  final Business bussiness;
  ActiveBusinessId(this.bussiness);
}

@immutable
class NextActiveBussiness{
  final Business bussiness;
  NextActiveBussiness(this.bussiness);
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
