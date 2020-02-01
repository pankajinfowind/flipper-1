import 'package:built_value/built_value.dart';

part 'variation.g.dart';

abstract class Variation implements Built<Variation, VariationBuilder> {
  int get id;
  String get name;
  String get unityType;
  String get price;
  int get stockValue;
  @nullable
  int get itemId;
  String get sku;
  Variation._();

  factory Variation([void Function(VariationBuilder) updates]) = _$Variation;
}
