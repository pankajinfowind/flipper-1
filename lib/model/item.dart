import 'package:built_value/built_value.dart';

part 'item.g.dart';

abstract class Item implements Built<Item, ItemBuilder> {
  String get name;
  int get id;
  int get branchId;
  int get categoryId;
  int get unitId;
  int get variantId;
  Item._();
  factory Item([void Function(ItemBuilder) updates]) = _$Item;
}
