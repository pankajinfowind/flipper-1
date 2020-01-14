import 'package:built_value/built_value.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/hint.dart';
import 'package:redux/redux.dart';

part 'common_view_model.g.dart';

abstract class CommonViewModel
    implements Built<CommonViewModel, CommonViewModelBuilder> {
  bool get hasUser;
  bool get hasSheet;
  bool get hasAction;
  List<Branch> get branches;
  AppActions get appAction;
  Hint get hint;
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

  static CommonViewModel fromStore(Store<AppState> store) {
    return CommonViewModel((vm) => vm
      ..hasUser = _hasUser(store)
      ..hasSheet = _hasSheet(store)
      ..hasAction = _hasAction(store)
//      ..hint = store.state.hint.toBuilder()
      ..branches = store.state.branches);
  }
}
