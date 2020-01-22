// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stock.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$Stock extends Stock {
  @override
  final String value;

  factory _$Stock([void Function(StockBuilder) updates]) =>
      (new StockBuilder()..update(updates)).build();

  _$Stock._({this.value}) : super._() {
    if (value == null) {
      throw new BuiltValueNullFieldError('Stock', 'value');
    }
  }

  @override
  Stock rebuild(void Function(StockBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  StockBuilder toBuilder() => new StockBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Stock && value == other.value;
  }

  @override
  int get hashCode {
    return $jf($jc(0, value.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Stock')..add('value', value))
        .toString();
  }
}

class StockBuilder implements Builder<Stock, StockBuilder> {
  _$Stock _$v;

  String _value;
  String get value => _$this._value;
  set value(String value) => _$this._value = value;

  StockBuilder();

  StockBuilder get _$this {
    if (_$v != null) {
      _value = _$v.value;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Stock other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Stock;
  }

  @override
  void update(void Function(StockBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Stock build() {
    final _$result = _$v ?? new _$Stock._(value: value);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
