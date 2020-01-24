import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/model/hint.dart';
import 'package:flipper/model/unit.dart';
import 'package:redux/redux.dart';

part 'common_view_model.g.dart';

abstract class CommonViewModel
    implements Built<CommonViewModel, CommonViewModelBuilder> {
  bool get hasUser;
  bool get hasSheet;
  @nullable
  bool get hasHint;

  @nullable
  BuiltList<Unit> get units;

  BuiltList<Category> get categories;

  @nullable
  int get tab;

  @nullable
  Business get currentBusiness;

  bool get hasAction;

  List<Branch> get branches;

  List<Business> get businesses;

  @nullable
  AppActions get appAction;

  Hint get hint;

  @nullable
  String get categoryName;

  CommonViewModel._();
  factory CommonViewModel([void Function(CommonViewModelBuilder) updates]) =
      _$CommonViewModel;

  static bool _hasUser(Store<AppState> store) {
    return store.state.user != null;
  }

  static bool _hasAction(Store<AppState> store) {
    return store.state.action != null;
  }

  static bool _hasSheet(Store<AppState> store) {
    return store.state.sheet != null;
  }

  static Hint _hasHint(Store<AppState> store) {
    return store.state.hint;
  }

  static CommonViewModel fromStore(Store<AppState> store) {
    return CommonViewModel((vm) => vm
      ..hasUser = _hasUser(store)
      ..hasSheet = _hasSheet(store)
      ..hasAction = _hasAction(store)
      ..businesses = store.state.businesses
      ..tab = store.state.tab
      ..units = store.state.units.toBuilder()
      ..categoryName = store.state.categoryName
      ..categories = store.state.categories.toBuilder()
      ..appAction =
          store.state.action == null ? null : store.state.action.toBuilder()
      ..currentBusiness = store.state.currentActiveBusiness == null
          ? null
          : store.state.currentActiveBusiness.toBuilder()
      ..hint = _hasHint(store) == null ? null : store.state.hint.toBuilder()
      ..branches = store.state.branches);
  }
}
