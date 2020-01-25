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
  final Business currentActiveBusiness;
  @override
  final int tab;
  @override
  final Business nextActiveBusiness;
  @override
  final Sheets sheet;
  @override
  final AppActions action;
  @override
  final Price price;
  @override
  final int businessId;
  @override
  final Unit unit;
  @override
  final BuiltList<Unit> units;
  @override
  final BuiltList<Category> categories;
  @override
  final int focusedUnit;
  @override
  final int focusedCategoryId;
  @override
  final Category category;
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
  @override
  final String categoryName;
  @override
  final int tempCategoryId;
  @override
  final Unit currentUnit;
  @override
  final Category currentCategory;
  @override
  final FlipperColor currentColor;
  @override
  final Disable currentDisable;

  factory _$AppState([void Function(AppStateBuilder) updates]) =>
      (new AppStateBuilder()..update(updates)).build();

  _$AppState._(
      {this.user,
      this.userId,
      this.currentActiveBusiness,
      this.tab,
      this.nextActiveBusiness,
      this.sheet,
      this.action,
      this.price,
      this.businessId,
      this.unit,
      this.units,
      this.categories,
      this.focusedUnit,
      this.focusedCategoryId,
      this.category,
      this.permissions,
      this.branches,
      this.businesses,
      this.branch,
      this.business,
      this.hint,
      this.database,
      this.categoryName,
      this.tempCategoryId,
      this.currentUnit,
      this.currentCategory,
      this.currentColor,
      this.currentDisable})
      : super._() {
    if (categories == null) {
      throw new BuiltValueNullFieldError('AppState', 'categories');
    }
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
        currentActiveBusiness == other.currentActiveBusiness &&
        tab == other.tab &&
        nextActiveBusiness == other.nextActiveBusiness &&
        sheet == other.sheet &&
        action == other.action &&
        price == other.price &&
        businessId == other.businessId &&
        unit == other.unit &&
        units == other.units &&
        categories == other.categories &&
        focusedUnit == other.focusedUnit &&
        focusedCategoryId == other.focusedCategoryId &&
        category == other.category &&
        permissions == other.permissions &&
        branches == other.branches &&
        businesses == other.businesses &&
        branch == other.branch &&
        business == other.business &&
        hint == other.hint &&
        database == other.database &&
        categoryName == other.categoryName &&
        tempCategoryId == other.tempCategoryId &&
        currentUnit == other.currentUnit &&
        currentCategory == other.currentCategory &&
        currentColor == other.currentColor &&
        currentDisable == other.currentDisable;
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
                                        $jc(
                                            $jc(
                                                $jc(
                                                    $jc(
                                                        $jc(
                                                            $jc(
                                                                $jc(
                                                                    $jc(
                                                                        $jc(
                                                                            $jc($jc($jc($jc($jc($jc($jc($jc($jc($jc(0, user.hashCode), userId.hashCode), currentActiveBusiness.hashCode), tab.hashCode), nextActiveBusiness.hashCode), sheet.hashCode), action.hashCode), price.hashCode), businessId.hashCode),
                                                                                unit.hashCode),
                                                                            units.hashCode),
                                                                        categories.hashCode),
                                                                    focusedUnit.hashCode),
                                                                focusedCategoryId.hashCode),
                                                            category.hashCode),
                                                        permissions.hashCode),
                                                    branches.hashCode),
                                                businesses.hashCode),
                                            branch.hashCode),
                                        business.hashCode),
                                    hint.hashCode),
                                database.hashCode),
                            categoryName.hashCode),
                        tempCategoryId.hashCode),
                    currentUnit.hashCode),
                currentCategory.hashCode),
            currentColor.hashCode),
        currentDisable.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('AppState')
          ..add('user', user)
          ..add('userId', userId)
          ..add('currentActiveBusiness', currentActiveBusiness)
          ..add('tab', tab)
          ..add('nextActiveBusiness', nextActiveBusiness)
          ..add('sheet', sheet)
          ..add('action', action)
          ..add('price', price)
          ..add('businessId', businessId)
          ..add('unit', unit)
          ..add('units', units)
          ..add('categories', categories)
          ..add('focusedUnit', focusedUnit)
          ..add('focusedCategoryId', focusedCategoryId)
          ..add('category', category)
          ..add('permissions', permissions)
          ..add('branches', branches)
          ..add('businesses', businesses)
          ..add('branch', branch)
          ..add('business', business)
          ..add('hint', hint)
          ..add('database', database)
          ..add('categoryName', categoryName)
          ..add('tempCategoryId', tempCategoryId)
          ..add('currentUnit', currentUnit)
          ..add('currentCategory', currentCategory)
          ..add('currentColor', currentColor)
          ..add('currentDisable', currentDisable))
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

  BusinessBuilder _currentActiveBusiness;
  BusinessBuilder get currentActiveBusiness =>
      _$this._currentActiveBusiness ??= new BusinessBuilder();
  set currentActiveBusiness(BusinessBuilder currentActiveBusiness) =>
      _$this._currentActiveBusiness = currentActiveBusiness;

  int _tab;
  int get tab => _$this._tab;
  set tab(int tab) => _$this._tab = tab;

  BusinessBuilder _nextActiveBusiness;
  BusinessBuilder get nextActiveBusiness =>
      _$this._nextActiveBusiness ??= new BusinessBuilder();
  set nextActiveBusiness(BusinessBuilder nextActiveBusiness) =>
      _$this._nextActiveBusiness = nextActiveBusiness;

  SheetsBuilder _sheet;
  SheetsBuilder get sheet => _$this._sheet ??= new SheetsBuilder();
  set sheet(SheetsBuilder sheet) => _$this._sheet = sheet;

  AppActionsBuilder _action;
  AppActionsBuilder get action => _$this._action ??= new AppActionsBuilder();
  set action(AppActionsBuilder action) => _$this._action = action;

  PriceBuilder _price;
  PriceBuilder get price => _$this._price ??= new PriceBuilder();
  set price(PriceBuilder price) => _$this._price = price;

  int _businessId;
  int get businessId => _$this._businessId;
  set businessId(int businessId) => _$this._businessId = businessId;

  UnitBuilder _unit;
  UnitBuilder get unit => _$this._unit ??= new UnitBuilder();
  set unit(UnitBuilder unit) => _$this._unit = unit;

  ListBuilder<Unit> _units;
  ListBuilder<Unit> get units => _$this._units ??= new ListBuilder<Unit>();
  set units(ListBuilder<Unit> units) => _$this._units = units;

  ListBuilder<Category> _categories;
  ListBuilder<Category> get categories =>
      _$this._categories ??= new ListBuilder<Category>();
  set categories(ListBuilder<Category> categories) =>
      _$this._categories = categories;

  int _focusedUnit;
  int get focusedUnit => _$this._focusedUnit;
  set focusedUnit(int focusedUnit) => _$this._focusedUnit = focusedUnit;

  int _focusedCategoryId;
  int get focusedCategoryId => _$this._focusedCategoryId;
  set focusedCategoryId(int focusedCategoryId) =>
      _$this._focusedCategoryId = focusedCategoryId;

  CategoryBuilder _category;
  CategoryBuilder get category => _$this._category ??= new CategoryBuilder();
  set category(CategoryBuilder category) => _$this._category = category;

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

  String _categoryName;
  String get categoryName => _$this._categoryName;
  set categoryName(String categoryName) => _$this._categoryName = categoryName;

  int _tempCategoryId;
  int get tempCategoryId => _$this._tempCategoryId;
  set tempCategoryId(int tempCategoryId) =>
      _$this._tempCategoryId = tempCategoryId;

  UnitBuilder _currentUnit;
  UnitBuilder get currentUnit => _$this._currentUnit ??= new UnitBuilder();
  set currentUnit(UnitBuilder currentUnit) => _$this._currentUnit = currentUnit;

  CategoryBuilder _currentCategory;
  CategoryBuilder get currentCategory =>
      _$this._currentCategory ??= new CategoryBuilder();
  set currentCategory(CategoryBuilder currentCategory) =>
      _$this._currentCategory = currentCategory;

  FlipperColorBuilder _currentColor;
  FlipperColorBuilder get currentColor =>
      _$this._currentColor ??= new FlipperColorBuilder();
  set currentColor(FlipperColorBuilder currentColor) =>
      _$this._currentColor = currentColor;

  DisableBuilder _currentDisable;
  DisableBuilder get currentDisable =>
      _$this._currentDisable ??= new DisableBuilder();
  set currentDisable(DisableBuilder currentDisable) =>
      _$this._currentDisable = currentDisable;

  AppStateBuilder();

  AppStateBuilder get _$this {
    if (_$v != null) {
      _user = _$v.user?.toBuilder();
      _userId = _$v.userId;
      _currentActiveBusiness = _$v.currentActiveBusiness?.toBuilder();
      _tab = _$v.tab;
      _nextActiveBusiness = _$v.nextActiveBusiness?.toBuilder();
      _sheet = _$v.sheet?.toBuilder();
      _action = _$v.action?.toBuilder();
      _price = _$v.price?.toBuilder();
      _businessId = _$v.businessId;
      _unit = _$v.unit?.toBuilder();
      _units = _$v.units?.toBuilder();
      _categories = _$v.categories?.toBuilder();
      _focusedUnit = _$v.focusedUnit;
      _focusedCategoryId = _$v.focusedCategoryId;
      _category = _$v.category?.toBuilder();
      _permissions = _$v.permissions?.toBuilder();
      _branches = _$v.branches;
      _businesses = _$v.businesses;
      _branch = _$v.branch?.toBuilder();
      _business = _$v.business?.toBuilder();
      _hint = _$v.hint?.toBuilder();
      _database = _$v.database;
      _categoryName = _$v.categoryName;
      _tempCategoryId = _$v.tempCategoryId;
      _currentUnit = _$v.currentUnit?.toBuilder();
      _currentCategory = _$v.currentCategory?.toBuilder();
      _currentColor = _$v.currentColor?.toBuilder();
      _currentDisable = _$v.currentDisable?.toBuilder();
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
              currentActiveBusiness: _currentActiveBusiness?.build(),
              tab: tab,
              nextActiveBusiness: _nextActiveBusiness?.build(),
              sheet: _sheet?.build(),
              action: _action?.build(),
              price: _price?.build(),
              businessId: businessId,
              unit: _unit?.build(),
              units: _units?.build(),
              categories: categories.build(),
              focusedUnit: focusedUnit,
              focusedCategoryId: focusedCategoryId,
              category: _category?.build(),
              permissions: _permissions?.build(),
              branches: branches,
              businesses: businesses,
              branch: _branch?.build(),
              business: _business?.build(),
              hint: _hint?.build(),
              database: database,
              categoryName: categoryName,
              tempCategoryId: tempCategoryId,
              currentUnit: _currentUnit?.build(),
              currentCategory: _currentCategory?.build(),
              currentColor: _currentColor?.build(),
              currentDisable: _currentDisable?.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'user';
        _user?.build();

        _$failedField = 'currentActiveBusiness';
        _currentActiveBusiness?.build();

        _$failedField = 'nextActiveBusiness';
        _nextActiveBusiness?.build();
        _$failedField = 'sheet';
        _sheet?.build();
        _$failedField = 'action';
        _action?.build();
        _$failedField = 'price';
        _price?.build();

        _$failedField = 'unit';
        _unit?.build();
        _$failedField = 'units';
        _units?.build();
        _$failedField = 'categories';
        categories.build();

        _$failedField = 'category';
        _category?.build();
        _$failedField = 'permissions';
        _permissions?.build();

        _$failedField = 'branch';
        _branch?.build();
        _$failedField = 'business';
        _business?.build();
        _$failedField = 'hint';
        _hint?.build();

        _$failedField = 'currentUnit';
        _currentUnit?.build();
        _$failedField = 'currentCategory';
        _currentCategory?.build();
        _$failedField = 'currentColor';
        _currentColor?.build();
        _$failedField = 'currentDisable';
        _currentDisable?.build();
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
