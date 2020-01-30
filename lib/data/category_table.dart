import 'package:moor/moor.dart';

class CategoryTable extends Table {
  IntColumn get id => integer().autoIncrement()();

  BoolColumn get focused => boolean()();

  TextColumn get name => text()();

  IntColumn get businessId =>
      integer().customConstraint('NULL REFERENCES business_table(id)')();

  IntColumn get branchId =>
      integer().customConstraint('NULL REFERENCES branch_table(id)')();

  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
