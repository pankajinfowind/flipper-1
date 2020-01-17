import 'package:moor/moor.dart';

class BusinessUserTable extends Table {
  IntColumn get id => integer().autoIncrement()();

  IntColumn get userId =>
      integer().nullable().customConstraint('NULL REFERENCES user_table(id)')();

  IntColumn get businessId =>
      integer().nullable().customConstraint('NULL REFERENCES business_table(id)')();
}
