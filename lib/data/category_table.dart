import 'package:moor/moor.dart';

class CategoryTable extends Table {
  IntColumn get id => integer().autoIncrement()();

  BoolColumn get focused => boolean()();

  TextColumn get name => text()();

  IntColumn get businessId => integer()
      .nullable()
      .customConstraint('NULL REFERENCES business_table(id)')();

  IntColumn get branchId => integer()
      .nullable()
      .customConstraint('NULL REFERENCES branch_table(id)')();
}
