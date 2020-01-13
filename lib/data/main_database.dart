import 'dart:io';

import 'package:flipper/data/token.dart';
import 'package:flipper/data/user.dart';
import 'package:moor/moor.dart';
import 'package:moor_ffi/moor_ffi.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

import 'dao/token_dao.dart';
import 'dao/user_dao.dart';

part 'main_database.g.dart';

LazyDatabase _openConnection() {
  // the LazyDatabase util lets us find the right location for the file async.
  return LazyDatabase(() async {
    // put the database file, called db.sqlite here, into the documents folder
    // for your app.
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'db.sqlite'));
    return VmDatabase(file);
  });
}

@UseMoor(tables: [User, Token], daos: [UserDao, TokenDao])
class Database extends _$Database {
  Database() : super(_openConnection());

  @override
  int get schemaVersion => 1;
  @override
  MigrationStrategy get migration {
    return MigrationStrategy(
      beforeOpen: (d) async {
//        await db.customStatement('PRAGMA foreign_keys = ON');
      },
      onCreate: (Migrator m) {
        return m.createAllTables();
      },
    );
  }
}
