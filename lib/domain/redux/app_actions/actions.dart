import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/category.dart';
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
class CategoryNameAction {
  final String name;

  CategoryNameAction({this.name});
}

@immutable
class CreateEmptyTempCategoryAction {}

@immutable
class TempCategoryIdAction {
  final int categoryId;

  TempCategoryIdAction({this.categoryId});
}

@immutable
class CategoryAction {
  final List<Category> categories;
  CategoryAction(this.categories);
}

@immutable
class WithUnitId {
  final int unitId;

  WithUnitId({@required this.unitId});
}

class InvokePersistFocusedCategory {}

@immutable
class WithCategoryId {
  final int categoryId;

  WithCategoryId({@required this.categoryId});
}

@immutable
class UpdateUnitAction {
  final int unitId;

  UpdateUnitAction({@required this.unitId});
}

@immutable
class UpdateCategoryAction {
  final int categoryId;

  UpdateCategoryAction({@required this.categoryId});
}

@immutable
class OnSetTab {}

@immutable
class CreateUnit {}

@immutable
class CreateCategoryFromAddItemScreenAction {
  final String categoryName;

  CreateCategoryFromAddItemScreenAction({this.categoryName});
}

@immutable
class CurrentTab {
  final int tab;

  const CurrentTab({@required this.tab});
}

@immutable
class ResetAppAction {}
