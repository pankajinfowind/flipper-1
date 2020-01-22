import 'package:built_value/built_value.dart';

part 'stock.g.dart';

abstract class Stock implements Built<Stock, StockBuilder> {
  String get value;

  Stock._();

  factory Stock([void Function(StockBuilder) updates]) = _$Stock;
}
