// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dashboard_viewmodel.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$DashBoardViewModel extends DashBoardViewModel {
  @override
  final bool hasUser;
  @override
  final bool hasSheet;
  @override
  final List<Branch> branches;
  @override
  final Hint hint;

  factory _$DashBoardViewModel(
          [void Function(DashBoardViewModelBuilder) updates]) =>
      (new DashBoardViewModelBuilder()..update(updates)).build();

  _$DashBoardViewModel._(
      {this.hasUser, this.hasSheet, this.branches, this.hint})
      : super._() {
    if (hasUser == null) {
      throw new BuiltValueNullFieldError('DashBoardViewModel', 'hasUser');
    }
    if (hasSheet == null) {
      throw new BuiltValueNullFieldError('DashBoardViewModel', 'hasSheet');
    }
    if (branches == null) {
      throw new BuiltValueNullFieldError('DashBoardViewModel', 'branches');
    }
    if (hint == null) {
      throw new BuiltValueNullFieldError('DashBoardViewModel', 'hint');
    }
  }

  @override
  DashBoardViewModel rebuild(
          void Function(DashBoardViewModelBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  DashBoardViewModelBuilder toBuilder() =>
      new DashBoardViewModelBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is DashBoardViewModel &&
        hasUser == other.hasUser &&
        hasSheet == other.hasSheet &&
        branches == other.branches &&
        hint == other.hint;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, hasUser.hashCode), hasSheet.hashCode),
            branches.hashCode),
        hint.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('DashBoardViewModel')
          ..add('hasUser', hasUser)
          ..add('hasSheet', hasSheet)
          ..add('branches', branches)
          ..add('hint', hint))
        .toString();
  }
}

class DashBoardViewModelBuilder
    implements Builder<DashBoardViewModel, DashBoardViewModelBuilder> {
  _$DashBoardViewModel _$v;

  bool _hasUser;
  bool get hasUser => _$this._hasUser;
  set hasUser(bool hasUser) => _$this._hasUser = hasUser;

  bool _hasSheet;
  bool get hasSheet => _$this._hasSheet;
  set hasSheet(bool hasSheet) => _$this._hasSheet = hasSheet;

  List<Branch> _branches;
  List<Branch> get branches => _$this._branches;
  set branches(List<Branch> branches) => _$this._branches = branches;

  HintBuilder _hint;
  HintBuilder get hint => _$this._hint ??= new HintBuilder();
  set hint(HintBuilder hint) => _$this._hint = hint;

  DashBoardViewModelBuilder();

  DashBoardViewModelBuilder get _$this {
    if (_$v != null) {
      _hasUser = _$v.hasUser;
      _hasSheet = _$v.hasSheet;
      _branches = _$v.branches;
      _hint = _$v.hint?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(DashBoardViewModel other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$DashBoardViewModel;
  }

  @override
  void update(void Function(DashBoardViewModelBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$DashBoardViewModel build() {
    _$DashBoardViewModel _$result;
    try {
      _$result = _$v ??
          new _$DashBoardViewModel._(
              hasUser: hasUser,
              hasSheet: hasSheet,
              branches: branches,
              hint: hint.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'hint';
        hint.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'DashBoardViewModel', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
