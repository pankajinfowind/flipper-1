// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$Item extends Item {
  @override
  final String name;
  @override
  final String color;
  @override
  final int id;
  @override
  final int price;
  @override
  final bool isActive;
  @override
  final int quantity;
  @override
  final int branchId;
  @override
  final int categoryId;
  @override
  final int unitId;
  @override
  final String description;
  @override
  final int count;

  factory _$Item([void Function(ItemBuilder) updates]) =>
      (new ItemBuilder()..update(updates)).build();

  _$Item._(
      {this.name,
      this.color,
      this.id,
      this.price,
      this.isActive,
      this.quantity,
      this.branchId,
      this.categoryId,
      this.unitId,
      this.description,
      this.count})
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
        color == other.color &&
        id == other.id &&
        price == other.price &&
        isActive == other.isActive &&
        quantity == other.quantity &&
        branchId == other.branchId &&
        categoryId == other.categoryId &&
        unitId == other.unitId &&
        description == other.description &&
        count == other.count;
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
                                        $jc($jc(0, name.hashCode),
                                            color.hashCode),
                                        id.hashCode),
                                    price.hashCode),
                                isActive.hashCode),
                            quantity.hashCode),
                        branchId.hashCode),
                    categoryId.hashCode),
                unitId.hashCode),
            description.hashCode),
        count.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Item')
          ..add('name', name)
          ..add('color', color)
          ..add('id', id)
          ..add('price', price)
          ..add('isActive', isActive)
          ..add('quantity', quantity)
          ..add('branchId', branchId)
          ..add('categoryId', categoryId)
          ..add('unitId', unitId)
          ..add('description', description)
          ..add('count', count))
        .toString();
  }
}

class ItemBuilder implements Builder<Item, ItemBuilder> {
  _$Item _$v;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  String _color;
  String get color => _$this._color;
  set color(String color) => _$this._color = color;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _price;
  int get price => _$this._price;
  set price(int price) => _$this._price = price;

  bool _isActive;
  bool get isActive => _$this._isActive;
  set isActive(bool isActive) => _$this._isActive = isActive;

  int _quantity;
  int get quantity => _$this._quantity;
  set quantity(int quantity) => _$this._quantity = quantity;

  int _branchId;
  int get branchId => _$this._branchId;
  set branchId(int branchId) => _$this._branchId = branchId;

  int _categoryId;
  int get categoryId => _$this._categoryId;
  set categoryId(int categoryId) => _$this._categoryId = categoryId;

  int _unitId;
  int get unitId => _$this._unitId;
  set unitId(int unitId) => _$this._unitId = unitId;

  String _description;
  String get description => _$this._description;
  set description(String description) => _$this._description = description;

  int _count;
  int get count => _$this._count;
  set count(int count) => _$this._count = count;

  ItemBuilder();

  ItemBuilder get _$this {
    if (_$v != null) {
      _name = _$v.name;
      _color = _$v.color;
      _id = _$v.id;
      _price = _$v.price;
      _isActive = _$v.isActive;
      _quantity = _$v.quantity;
      _branchId = _$v.branchId;
      _categoryId = _$v.categoryId;
      _unitId = _$v.unitId;
      _description = _$v.description;
      _count = _$v.count;
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
            color: color,
            id: id,
            price: price,
            isActive: isActive,
            quantity: quantity,
            branchId: branchId,
            categoryId: categoryId,
            unitId: unitId,
            description: description,
            count: count);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
