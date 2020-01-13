import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/user.dart';
import 'package:moor/moor.dart';

part 'user_dao.g.dart';

@UseDao(tables: [User])
class UserDao extends DatabaseAccessor<Database> with _$UserDaoMixin {
  final Database db;

  UserDao(this.db) : super(db);

  Future insertUser(Insertable<UserData> user) => into(db.user).insert(user);
  Future<List<UserData>> getUser() => select(db.user).get();
}
