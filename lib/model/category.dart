import 'package:built_value/built_value.dart';

part 'category.g.dart';

abstract class Category implements Built<Category, CategoryBuilder> {
  String get name;
  int get id;
  int get businessId;
  bool get focused;
  int get branchId;
  Category._();

  factory Category([void Function(CategoryBuilder) updates]) = _$Category;
}
