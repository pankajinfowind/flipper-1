import 'package:moor_flutter/moor_flutter.dart';

// Moor works by source gen. This file will all the generated code.
part 'moor_database.g.dart';

@DataClassName('Category')
class Categories extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get description => text().nullable()();
}

class User extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get username => text().withLength(max: 16)();
  TextColumn get email => text()();
  TextColumn get avatar => text().nullable()();
}

@UseMoor(tables: [Categories, User], daos: [UserDao])
class Database extends _$Database {
  Database()
      : super(FlutterQueryExecutor.inDatabaseFolder(
            path: 'db.sqlite', logStatements: true));

  @override
  int get schemaVersion => 1;
  @override
  MigrationStrategy get migration {
    return MigrationStrategy(
      beforeOpen: (engine, details) async {
        // populate data
        await engine
            .into(categories)
            .insert(const CategoriesCompanion(description: Value('Sweets')));
      },
    );
  }
}

@UseDao(tables: [User])
class UserDao extends DatabaseAccessor<Database> with _$UserDaoMixin {
  final Database db;

  UserDao(this.db) : super(db);

  Future insertUser(Insertable<UserData> user) => into(db.user).insert(user);

  Stream<List<UserData>> watchUsers() => select(db.user).watch();
}
