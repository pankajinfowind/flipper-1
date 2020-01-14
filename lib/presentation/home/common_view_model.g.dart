// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'common_view_model.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$CommonViewModel extends CommonViewModel {
  @override
  final bool hasUser;
  @override
  final bool hasSheet;
  @override
  final bool hasAction;
  @override
  final List<Branch> branches;
  @override
  final AppActions appAction;
  @override
  final Hint hint;

  factory _$CommonViewModel([void Function(CommonViewModelBuilder) updates]) =>
      (new CommonViewModelBuilder()..update(updates)).build();

  _$CommonViewModel._(
      {this.hasUser,
      this.hasSheet,
      this.hasAction,
      this.branches,
      this.appAction,
      this.hint})
      : super._() {
    if (hasUser == null) {
      throw new BuiltValueNullFieldError('CommonViewModel', 'hasUser');
    }
    if (hasSheet == null) {
      throw new BuiltValueNullFieldError('CommonViewModel', 'hasSheet');
    }
    if (hasAction == null) {
      throw new BuiltValueNullFieldError('CommonViewModel', 'hasAction');
    }
    if (branches == null) {
      throw new BuiltValueNullFieldError('CommonViewModel', 'branches');
    }
    if (appAction == null) {
      throw new BuiltValueNullFieldError('CommonViewModel', 'appAction');
    }
    if (hint == null) {
      throw new BuiltValueNullFieldError('CommonViewModel', 'hint');
    }
  }

  @override
  CommonViewModel rebuild(void Function(CommonViewModelBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  CommonViewModelBuilder toBuilder() =>
      new CommonViewModelBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CommonViewModel &&
        hasUser == other.hasUser &&
        hasSheet == other.hasSheet &&
        hasAction == other.hasAction &&
        branches == other.branches &&
        appAction == other.appAction &&
        hint == other.hint;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc($jc($jc(0, hasUser.hashCode), hasSheet.hashCode),
                    hasAction.hashCode),
                branches.hashCode),
            appAction.hashCode),
        hint.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('CommonViewModel')
          ..add('hasUser', hasUser)
          ..add('hasSheet', hasSheet)
          ..add('hasAction', hasAction)
          ..add('branches', branches)
          ..add('appAction', appAction)
          ..add('hint', hint))
        .toString();
  }
}

class CommonViewModelBuilder
    implements Builder<CommonViewModel, CommonViewModelBuilder> {
  _$CommonViewModel _$v;

  bool _hasUser;
  bool get hasUser => _$this._hasUser;
  set hasUser(bool hasUser) => _$this._hasUser = hasUser;

  bool _hasSheet;
  bool get hasSheet => _$this._hasSheet;
  set hasSheet(bool hasSheet) => _$this._hasSheet = hasSheet;

  bool _hasAction;
  bool get hasAction => _$this._hasAction;
  set hasAction(bool hasAction) => _$this._hasAction = hasAction;

  List<Branch> _branches;
  List<Branch> get branches => _$this._branches;
  set branches(List<Branch> branches) => _$this._branches = branches;

  AppActionsBuilder _appAction;
  AppActionsBuilder get appAction =>
      _$this._appAction ??= new AppActionsBuilder();
  set appAction(AppActionsBuilder appAction) => _$this._appAction = appAction;

  HintBuilder _hint;
  HintBuilder get hint => _$this._hint ??= new HintBuilder();
  set hint(HintBuilder hint) => _$this._hint = hint;

  CommonViewModelBuilder();

  CommonViewModelBuilder get _$this {
    if (_$v != null) {
      _hasUser = _$v.hasUser;
      _hasSheet = _$v.hasSheet;
      _hasAction = _$v.hasAction;
      _branches = _$v.branches;
      _appAction = _$v.appAction?.toBuilder();
      _hint = _$v.hint?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CommonViewModel other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$CommonViewModel;
  }

  @override
  void update(void Function(CommonViewModelBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$CommonViewModel build() {
    _$CommonViewModel _$result;
    try {
      _$result = _$v ??
          new _$CommonViewModel._(
              hasUser: hasUser,
              hasSheet: hasSheet,
              hasAction: hasAction,
              branches: branches,
              appAction: appAction.build(),
              hint: hint.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'appAction';
        appAction.build();
        _$failedField = 'hint';
        hint.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'CommonViewModel', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
