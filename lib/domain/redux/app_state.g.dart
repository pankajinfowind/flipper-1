// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_state.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AppState extends AppState {
  @override
  final User user;
  @override
  final int userId;
  @override
  final Sheets sheet;
  @override
  final AppActions action;
  @override
  final Permission permissions;
  @override
  final List<Branch> branches;
  @override
  final List<Business> businesses;
  @override
  final Branch branch;
  @override
  final Business business;
  @override
  final Hint hint;
  @override
  final Database database;

  factory _$AppState([void Function(AppStateBuilder) updates]) =>
      (new AppStateBuilder()..update(updates)).build();

  _$AppState._(
      {this.user,
      this.userId,
      this.sheet,
      this.action,
      this.permissions,
      this.branches,
      this.businesses,
      this.branch,
      this.business,
      this.hint,
      this.database})
      : super._() {
    if (database == null) {
      throw new BuiltValueNullFieldError('AppState', 'database');
    }
  }

  @override
  AppState rebuild(void Function(AppStateBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AppStateBuilder toBuilder() => new AppStateBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AppState &&
        user == other.user &&
        userId == other.userId &&
        sheet == other.sheet &&
        action == other.action &&
        permissions == other.permissions &&
        branches == other.branches &&
        businesses == other.businesses &&
        branch == other.branch &&
        business == other.business &&
        hint == other.hint &&
        database == other.database;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc(
                            $jc(
                                $jc(
                                    $jc(
                                        $jc($jc(0, user.hashCode),
                                            userId.hashCode),
                                        sheet.hashCode),
                                    action.hashCode),
                                permissions.hashCode),
                            branches.hashCode),
                        businesses.hashCode),
                    branch.hashCode),
                business.hashCode),
            hint.hashCode),
        database.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('AppState')
          ..add('user', user)
          ..add('userId', userId)
          ..add('sheet', sheet)
          ..add('action', action)
          ..add('permissions', permissions)
          ..add('branches', branches)
          ..add('businesses', businesses)
          ..add('branch', branch)
          ..add('business', business)
          ..add('hint', hint)
          ..add('database', database))
        .toString();
  }
}

class AppStateBuilder implements Builder<AppState, AppStateBuilder> {
  _$AppState _$v;

  UserBuilder _user;
  UserBuilder get user => _$this._user ??= new UserBuilder();
  set user(UserBuilder user) => _$this._user = user;

  int _userId;
  int get userId => _$this._userId;
  set userId(int userId) => _$this._userId = userId;

  SheetsBuilder _sheet;
  SheetsBuilder get sheet => _$this._sheet ??= new SheetsBuilder();
  set sheet(SheetsBuilder sheet) => _$this._sheet = sheet;

  AppActionsBuilder _action;
  AppActionsBuilder get action => _$this._action ??= new AppActionsBuilder();
  set action(AppActionsBuilder action) => _$this._action = action;

  PermissionBuilder _permissions;
  PermissionBuilder get permissions =>
      _$this._permissions ??= new PermissionBuilder();
  set permissions(PermissionBuilder permissions) =>
      _$this._permissions = permissions;

  List<Branch> _branches;
  List<Branch> get branches => _$this._branches;
  set branches(List<Branch> branches) => _$this._branches = branches;

  List<Business> _businesses;
  List<Business> get businesses => _$this._businesses;
  set businesses(List<Business> businesses) => _$this._businesses = businesses;

  BranchBuilder _branch;
  BranchBuilder get branch => _$this._branch ??= new BranchBuilder();
  set branch(BranchBuilder branch) => _$this._branch = branch;

  BusinessBuilder _business;
  BusinessBuilder get business => _$this._business ??= new BusinessBuilder();
  set business(BusinessBuilder business) => _$this._business = business;

  HintBuilder _hint;
  HintBuilder get hint => _$this._hint ??= new HintBuilder();
  set hint(HintBuilder hint) => _$this._hint = hint;

  Database _database;
  Database get database => _$this._database;
  set database(Database database) => _$this._database = database;

  AppStateBuilder();

  AppStateBuilder get _$this {
    if (_$v != null) {
      _user = _$v.user?.toBuilder();
      _userId = _$v.userId;
      _sheet = _$v.sheet?.toBuilder();
      _action = _$v.action?.toBuilder();
      _permissions = _$v.permissions?.toBuilder();
      _branches = _$v.branches;
      _businesses = _$v.businesses;
      _branch = _$v.branch?.toBuilder();
      _business = _$v.business?.toBuilder();
      _hint = _$v.hint?.toBuilder();
      _database = _$v.database;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AppState other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$AppState;
  }

  @override
  void update(void Function(AppStateBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$AppState build() {
    _$AppState _$result;
    try {
      _$result = _$v ??
          new _$AppState._(
              user: _user?.build(),
              userId: userId,
              sheet: _sheet?.build(),
              action: _action?.build(),
              permissions: _permissions?.build(),
              branches: branches,
              businesses: businesses,
              branch: _branch?.build(),
              business: _business?.build(),
              hint: _hint?.build(),
              database: database);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'user';
        _user?.build();

        _$failedField = 'sheet';
        _sheet?.build();
        _$failedField = 'action';
        _action?.build();
        _$failedField = 'permissions';
        _permissions?.build();

        _$failedField = 'branch';
        _branch?.build();
        _$failedField = 'business';
        _business?.build();
        _$failedField = 'hint';
        _hint?.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'AppState', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
