import "package:built_value/built_value.dart";

part 'business.g.dart';

abstract class Business implements Built<Business, BusinessBuilder> {
  int get id;

  String get name;

  String get hexColor;

  @nullable
  String get image;
  BusinessType get type;
  String get abbreviation;

  Business._();

  factory Business([void Function(BusinessBuilder) updates]) = _$Business;
}

enum BusinessType { PHARMACY, NORMAL }
