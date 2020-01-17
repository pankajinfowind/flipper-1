import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/user.dart';
import 'package:moor/moor.dart';

part 'user_dao.g.dart';

@UseDao(tables: [UserTable])
class UserDao extends DatabaseAccessor<Database> with _$UserDaoMixin {
  final Database db;

  UserDao(this.db) : super(db);

  Future insertUser(Insertable<UserTableData> user) =>
      into(db.userTable).insert(user);
  Future<UserTableData> getUser() {
    return (select(db.userTable)
          ..orderBy(
              [(t) => OrderingTerm(expression: t.id, mode: OrderingMode.desc)])
//      ..where() //TODO: add where clause so we return the authenticated one only there should be one authenticated user per device.
          ..limit(1))
        .getSingle();
  }
}
