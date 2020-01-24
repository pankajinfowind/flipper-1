import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/unit.dart';
import 'package:flutter/material.dart';

@immutable
class AppAction {
  final AppActions actions;

  const AppAction({@required this.actions});
}

@immutable
class PersistFocusedUnitAction {}

@immutable
class BusinessId {
  final int businessId;

  BusinessId(this.businessId);
}

@immutable
class UnitR {
  final List<Unit> units;
  UnitR(this.units);
}

@immutable
class CategoryAction {
  final List<CategoryAction> categories;
  CategoryAction(this.categories);
}

@immutable
class WithUnitId {
  final int unitId;

  WithUnitId({@required this.unitId});
}

@immutable
class UpdateUnitAction {
  final int unitId;

  UpdateUnitAction({@required this.unitId});
}

@immutable
class OnSetTab {}

@immutable
class CreateCategory {}

@immutable
class CurrentTab {
  final int tab;

  const CurrentTab({@required this.tab});
}

@immutable
class ResetAppAction {}
