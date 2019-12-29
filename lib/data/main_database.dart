import 'package:flipper/data/token.dart';
import 'package:flipper/data/user.dart';
import 'package:moor_flutter/moor_flutter.dart';

import 'dao/token_dao.dart';
import 'dao/user_dao.dart';

part 'main_database.g.dart';

@UseMoor(tables: [User, Token], daos: [UserDao, TokenDao])
class Database extends _$Database {
  Database()
      : super(FlutterQueryExecutor.inDatabaseFolder(
            path: 'db.sqlite', logStatements: true));

  @override
  int get schemaVersion => 1;
  @override
  MigrationStrategy get migration {
    return MigrationStrategy(
      onCreate: (Migrator m) {
        return m.createAllTables();
      },
    );
  }
}
