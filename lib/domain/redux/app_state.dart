import 'package:built_collection/built_collection.dart';
import "package:built_value/built_value.dart";
import 'package:flipper/data/main_database.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/model/disable.dart';
import 'package:flipper/model/flipper_color.dart';
import 'package:flipper/model/hint.dart';
import 'package:flipper/model/permission.dart';
import 'package:flipper/model/price.dart';
import 'package:flipper/model/sheet.dart';
import 'package:flipper/model/unit.dart';
import 'package:flipper/model/user.dart';

part 'app_state.g.dart';

abstract class AppState implements Built<AppState, AppStateBuilder> {
  @nullable
  User get user;

  @nullable
  int get userId;

  @nullable
  Business get currentActiveBusiness;

  @nullable
  int get tab;

  @nullable
  Business get nextActiveBusiness;

  @nullable
  Sheets get sheet;

  @nullable
  AppActions get action;

  @nullable
  Price get price;

  @nullable
  int get businessId;

  @nullable
  Unit get unit;

  @nullable
  BuiltList<Unit> get units;

  BuiltList<Category> get categories;

  @nullable
  int get focusedUnit;

  @nullable
  int get focusedCategoryId;

  @nullable
  Category get category;

  @nullable
  Permission get permissions;

  @nullable
  List<Branch> get branches;

  @nullable
  List<Business> get businesses;

  @nullable
  Branch get branch;

  @nullable
  Business get business;

  @nullable
  Hint get hint;

  Database get database;

  @nullable
  String get categoryName;

  @nullable
  int get tempCategoryId;

  @nullable
  Unit get currentUnit;

  @nullable
  Category get currentCategory;

  @nullable
  FlipperColor get currentColor;

  @nullable
  Disable get currentDisable;

  AppState._();
  factory AppState([void Function(AppStateBuilder) updates]) = _$AppState;

  factory AppState.init() => AppState((a) => a
    ..database = Database()
    ..units = ListBuilder()
    ..categories = ListBuilder()
    ..businesses = List<Business>()
    ..branches = List<Branch>());

  AppState clear() {
    // Add here anything else that also needs to be carried over.
    return AppState.init().rebuild((s) => () => {});
  }
}
