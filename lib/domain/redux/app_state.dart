import "package:built_value/built_value.dart";
import 'package:flipper/data/main_database.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/hint.dart';
import 'package:flipper/model/permission.dart';
import 'package:flipper/model/sheet.dart';
import 'package:flipper/model/user.dart';

part 'app_state.g.dart';

abstract class AppState implements Built<AppState, AppStateBuilder> {
  @nullable
  User get user;

  @nullable
  Sheets get sheet;

  @nullable
  AppActions get action;

  @nullable
  Permission get permissions;

  @nullable
  List<Branch> get branches;

  @nullable
  Branch get branch;


  @nullable
  List<Business> get businesses;

  @nullable
  Business get business;

  @nullable
  Hint get hint;

  Database get database;
  AppState._();
  factory AppState([void Function(AppStateBuilder) updates]) = _$AppState;

  factory AppState.init() => AppState((a) => a
    ..database = Database()
    ..businesses = List<Business>()
    ..branches = List<Branch>());

  AppState clear() {
    // Add here anything else that also needs to be carried over.
    return AppState.init().rebuild((s) => () => {});
  }
}
