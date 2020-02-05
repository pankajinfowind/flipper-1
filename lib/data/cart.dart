import 'package:moor/moor.dart';

class CartTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get branchId => integer()
      .nullable()
      .customConstraint('NULL REFERENCES branch_table(id)')();

  IntColumn get count => integer()();

  IntColumn get price => integer()();

  IntColumn get variationId => integer()
      .nullable()
      .customConstraint('NULL REFERENCES variation_table(id)')();

  TextColumn get parentName => text()();
  TextColumn get variationName => text()();

  DateTimeColumn get createdAt =>
      dateTime().withDefault(currentDateAndTime).nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
