import 'package:moor/moor.dart';

class VariationTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  IntColumn get branchId => integer().customConstraint(
      'NULL REFERENCES branch_table(id)  ON DELETE SET NULL')();

  IntColumn get itemId => integer()
      .customConstraint('NULL REFERENCES item_table(id)  ON DELETE SET NULL')();

  BoolColumn get isActive => boolean().withDefault(Constant(false))();
  IntColumn get count => integer()();
  RealColumn get price => real()
      .customConstraint('DECIMAL(6,2)')
      .withDefault(Constant(0))(); //retail
  RealColumn get costPrice => real().withDefault(Constant(0))(); //retail
  DateTimeColumn get createdAt =>
      dateTime().withDefault(currentDateAndTime).nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
