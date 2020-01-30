import 'package:moor/moor.dart';

class BusinessTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get abbreviation => text().nullable()();
  BoolColumn get isActive => boolean().withDefault(Constant(false))();

  // DateTimeColumn get createdAt => currentDateAndTime;
  // DateTimeColumn get updatedAt => currentDateAndTime;
}
