import 'package:built_value/built_value.dart';

part 'item.g.dart';

abstract class Item implements Built<Item, ItemBuilder> {
  String get name;
  String get color;
  int get id;
  int get branchId;
  int get categoryId;
  int get unitId;

  @nullable
  int get count;
  Item._();
  factory Item([void Function(ItemBuilder) updates]) = _$Item;
}
