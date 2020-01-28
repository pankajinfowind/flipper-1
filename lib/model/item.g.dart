// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$Item extends Item {
  @override
  final String name;
  @override
  final int id;
  @override
  final int branchId;
  @override
  final int categoryId;
  @override
  final int unitId;
  @override
  final int variantId;

  factory _$Item([void Function(ItemBuilder) updates]) =>
      (new ItemBuilder()..update(updates)).build();

  _$Item._(
      {this.name,
      this.id,
      this.branchId,
      this.categoryId,
      this.unitId,
      this.variantId})
      : super._() {
    if (name == null) {
      throw new BuiltValueNullFieldError('Item', 'name');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError('Item', 'id');
    }
    if (branchId == null) {
      throw new BuiltValueNullFieldError('Item', 'branchId');
    }
    if (categoryId == null) {
      throw new BuiltValueNullFieldError('Item', 'categoryId');
    }
    if (unitId == null) {
      throw new BuiltValueNullFieldError('Item', 'unitId');
    }
    if (variantId == null) {
      throw new BuiltValueNullFieldError('Item', 'variantId');
    }
  }

  @override
  Item rebuild(void Function(ItemBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ItemBuilder toBuilder() => new ItemBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Item &&
        name == other.name &&
        id == other.id &&
        branchId == other.branchId &&
        categoryId == other.categoryId &&
        unitId == other.unitId &&
        variantId == other.variantId;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc($jc($jc($jc(0, name.hashCode), id.hashCode), branchId.hashCode),
                categoryId.hashCode),
            unitId.hashCode),
        variantId.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Item')
          ..add('name', name)
          ..add('id', id)
          ..add('branchId', branchId)
          ..add('categoryId', categoryId)
          ..add('unitId', unitId)
          ..add('variantId', variantId))
        .toString();
  }
}

class ItemBuilder implements Builder<Item, ItemBuilder> {
  _$Item _$v;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _branchId;
  int get branchId => _$this._branchId;
  set branchId(int branchId) => _$this._branchId = branchId;

  int _categoryId;
  int get categoryId => _$this._categoryId;
  set categoryId(int categoryId) => _$this._categoryId = categoryId;

  int _unitId;
  int get unitId => _$this._unitId;
  set unitId(int unitId) => _$this._unitId = unitId;

  int _variantId;
  int get variantId => _$this._variantId;
  set variantId(int variantId) => _$this._variantId = variantId;

  ItemBuilder();

  ItemBuilder get _$this {
    if (_$v != null) {
      _name = _$v.name;
      _id = _$v.id;
      _branchId = _$v.branchId;
      _categoryId = _$v.categoryId;
      _unitId = _$v.unitId;
      _variantId = _$v.variantId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Item other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Item;
  }

  @override
  void update(void Function(ItemBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Item build() {
    final _$result = _$v ??
        new _$Item._(
            name: name,
            id: id,
            branchId: branchId,
            categoryId: categoryId,
            unitId: unitId,
            variantId: variantId);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
