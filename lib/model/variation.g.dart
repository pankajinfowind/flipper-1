// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'variation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$Variation extends Variation {
  @override
  final int id;
  @override
  final String name;
  @override
  final String unityType;
  @override
  final String price;
  @override
  final int stockValue;
  @override
  final int itemId;
  @override
  final String sku;

  factory _$Variation([void Function(VariationBuilder) updates]) =>
      (new VariationBuilder()..update(updates)).build();

  _$Variation._(
      {this.id,
      this.name,
      this.unityType,
      this.price,
      this.stockValue,
      this.itemId,
      this.sku})
      : super._() {
    if (id == null) {
      throw new BuiltValueNullFieldError('Variation', 'id');
    }
    if (name == null) {
      throw new BuiltValueNullFieldError('Variation', 'name');
    }
    if (unityType == null) {
      throw new BuiltValueNullFieldError('Variation', 'unityType');
    }
    if (price == null) {
      throw new BuiltValueNullFieldError('Variation', 'price');
    }
    if (stockValue == null) {
      throw new BuiltValueNullFieldError('Variation', 'stockValue');
    }
    if (sku == null) {
      throw new BuiltValueNullFieldError('Variation', 'sku');
    }
  }

  @override
  Variation rebuild(void Function(VariationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  VariationBuilder toBuilder() => new VariationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Variation &&
        id == other.id &&
        name == other.name &&
        unityType == other.unityType &&
        price == other.price &&
        stockValue == other.stockValue &&
        itemId == other.itemId &&
        sku == other.sku;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc($jc($jc(0, id.hashCode), name.hashCode),
                        unityType.hashCode),
                    price.hashCode),
                stockValue.hashCode),
            itemId.hashCode),
        sku.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Variation')
          ..add('id', id)
          ..add('name', name)
          ..add('unityType', unityType)
          ..add('price', price)
          ..add('stockValue', stockValue)
          ..add('itemId', itemId)
          ..add('sku', sku))
        .toString();
  }
}

class VariationBuilder implements Builder<Variation, VariationBuilder> {
  _$Variation _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  String _unityType;
  String get unityType => _$this._unityType;
  set unityType(String unityType) => _$this._unityType = unityType;

  String _price;
  String get price => _$this._price;
  set price(String price) => _$this._price = price;

  int _stockValue;
  int get stockValue => _$this._stockValue;
  set stockValue(int stockValue) => _$this._stockValue = stockValue;

  int _itemId;
  int get itemId => _$this._itemId;
  set itemId(int itemId) => _$this._itemId = itemId;

  String _sku;
  String get sku => _$this._sku;
  set sku(String sku) => _$this._sku = sku;

  VariationBuilder();

  VariationBuilder get _$this {
    if (_$v != null) {
      _id = _$v.id;
      _name = _$v.name;
      _unityType = _$v.unityType;
      _price = _$v.price;
      _stockValue = _$v.stockValue;
      _itemId = _$v.itemId;
      _sku = _$v.sku;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Variation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Variation;
  }

  @override
  void update(void Function(VariationBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Variation build() {
    final _$result = _$v ??
        new _$Variation._(
            id: id,
            name: name,
            unityType: unityType,
            price: price,
            stockValue: stockValue,
            itemId: itemId,
            sku: sku);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
