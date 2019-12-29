import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/bottom_sheet/bottom_sheet_actions.dart';
import 'package:redux/redux.dart';

final bottomSheetReducer = <AppState Function(AppState, dynamic)>[
  TypedReducer<AppState, OnBottomSheetChanged>(_onSheetChanged),
];
AppState _onSheetChanged(AppState state, OnBottomSheetChanged action) {
  return state.rebuild((a) => a..sheet = action.sheet.toBuilder());
}
