import 'package:moor/moor.dart';

class ItemTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  IntColumn get categoryId =>
      integer().customConstraint('NULL REFERENCES category_table(id)')();
  IntColumn get businessId =>
      integer().customConstraint('NULL REFERENCES business_table(id)')();

  IntColumn get variationId =>
      integer().customConstraint('NULL REFERENCES variation_table(id)')();
}
