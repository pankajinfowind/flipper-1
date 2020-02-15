import 'package:moor/moor.dart';

class BusinessUserTable extends Table {
  IntColumn get id => integer().autoIncrement()();

  IntColumn get userId => integer()
      .nullable()
      .customConstraint('NULL REFERENCES user_table(id) ON DELETE CASCADE')();

  IntColumn get businessId => integer().nullable().customConstraint(
      'NULL REFERENCES business_table(id) ON DELETE CASCADE')();

  DateTimeColumn get createdAt =>
      dateTime().withDefault(currentDateAndTime).nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
}
