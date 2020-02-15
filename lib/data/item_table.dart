import 'package:moor/moor.dart';

// @DataClassName("items")
class ItemTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get color => text()();
  TextColumn get description => text().nullable()();

  IntColumn get categoryId => integer().customConstraint(
      'NULL REFERENCES category_table(id) ON DELETE SET NULL ON UPDATE CASCADE')();
  IntColumn get branchId => integer().customConstraint(
      'NULL REFERENCES branch_table(id) ON DELETE SET NULL ON UPDATE CASCADE')();

  IntColumn get unitId => integer().customConstraint(
      'NULL REFERENCES unit_table(id) ON DELETE SET NULL ON UPDATE CASCADE')();

  // DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get createdAt =>
      dateTime().withDefault(currentDateAndTime).nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
