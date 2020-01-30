import 'package:moor/moor.dart';

class HistoryTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get count => integer()();

  IntColumn get variantId =>
      integer().customConstraint('NULL REFERENCES variation_table(id)')();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
