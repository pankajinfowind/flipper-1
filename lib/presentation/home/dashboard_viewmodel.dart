import 'package:built_value/built_value.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/hint.dart';
import 'package:redux/redux.dart';

part 'dashboard_viewmodel.g.dart';

abstract class DashBoardViewModel
    implements Built<DashBoardViewModel, DashBoardViewModelBuilder> {
  bool get hasUser;
  bool get hasSheet;
  List<Branch> get branches;
  Hint get hint;
  DashBoardViewModel._();
  factory DashBoardViewModel(
          [void Function(DashBoardViewModelBuilder) updates]) =
      _$DashBoardViewModel;

  static bool _hasUser(Store<AppState> store) {
    return store.state.user != null;
  }

  static bool _hasSheet(Store<AppState> store) {
    return store.state.sheet != null;
  }

  static DashBoardViewModel fromStore(Store<AppState> store) {
    return DashBoardViewModel((vm) => vm
      ..hasUser = _hasUser(store)
      ..hasSheet = _hasSheet(store)
      ..hint = store.state.hint.toBuilder()
      ..branches = store.state.branches);
  }
}
