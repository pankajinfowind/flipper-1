// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'branch.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$Branch extends Branch {
  @override
  final int id;
  @override
  final String name;
  @override
  final String description;
  @override
  final bool isActive;
  @override
  final String location;

  factory _$Branch([void Function(BranchBuilder) updates]) =>
      (new BranchBuilder()..update(updates)).build();

  _$Branch._(
      {this.id, this.name, this.description, this.isActive, this.location})
      : super._() {
    if (name == null) {
      throw new BuiltValueNullFieldError('Branch', 'name');
    }
  }

  @override
  Branch rebuild(void Function(BranchBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BranchBuilder toBuilder() => new BranchBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Branch &&
        id == other.id &&
        name == other.name &&
        description == other.description &&
        isActive == other.isActive &&
        location == other.location;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc($jc(0, id.hashCode), name.hashCode), description.hashCode),
            isActive.hashCode),
        location.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Branch')
          ..add('id', id)
          ..add('name', name)
          ..add('description', description)
          ..add('isActive', isActive)
          ..add('location', location))
        .toString();
  }
}

class BranchBuilder implements Builder<Branch, BranchBuilder> {
  _$Branch _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  String _description;
  String get description => _$this._description;
  set description(String description) => _$this._description = description;

  bool _isActive;
  bool get isActive => _$this._isActive;
  set isActive(bool isActive) => _$this._isActive = isActive;

  String _location;
  String get location => _$this._location;
  set location(String location) => _$this._location = location;

  BranchBuilder();

  BranchBuilder get _$this {
    if (_$v != null) {
      _id = _$v.id;
      _name = _$v.name;
      _description = _$v.description;
      _isActive = _$v.isActive;
      _location = _$v.location;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Branch other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Branch;
  }

  @override
  void update(void Function(BranchBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Branch build() {
    final _$result = _$v ??
        new _$Branch._(
            id: id,
            name: name,
            description: description,
            isActive: isActive,
            location: location);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
