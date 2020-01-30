import 'package:moor/moor.dart';

class HistoryTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get count => integer()();

  IntColumn get variantId =>
      integer().customConstraint('NULL REFERENCES variation_table(id)')();
  //TODO: work on saving crated at and updated at time later.
  // DateTimeColumn get createdAt => currentDateAndTime;
  // DateTimeColumn get updatedAt => currentDateAndTime;
}
