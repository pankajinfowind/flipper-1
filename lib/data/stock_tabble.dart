import 'package:moor/moor.dart';

class StockTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get value => text()();
  IntColumn get itemId =>
      integer().nullable().customConstraint('NULL REFERENCES item_table(id)')();

  IntColumn get businessId => integer()
      .nullable()
      .customConstraint('NULL REFERENCES business_table(id)')();

  DateTimeColumn get createdAt =>
      dateTime().withDefault(currentDateAndTime).nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
