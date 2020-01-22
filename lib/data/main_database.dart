import 'dart:io';

import 'package:flipper/data/branch.dart';
import 'package:flipper/data/business.dart';
import 'package:flipper/data/business_user.dart';
import 'package:flipper/data/category_table.dart';
import 'package:flipper/data/dao/branch_dao.dart';
import 'package:flipper/data/dao/business_dao.dart';
import 'package:flipper/data/dao/category_dao.dart';
import 'package:flipper/data/dao/tab_dao.dart';
import 'package:flipper/data/dao/unit_dao.dart';
import 'package:flipper/data/item_table.dart';
import 'package:flipper/data/price_table.dart';
import 'package:flipper/data/stock_tabble.dart';
import 'package:flipper/data/tabs.dart';
import 'package:flipper/data/token.dart';
import 'package:flipper/data/unit_table.dart';
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

@UseMoor(tables: [
  UserTable,
  UnitTable,
  ItemTable,
  TokenTable,
  BusinessUserTable,
  TabsTable,
  BusinessTable,
  CategoryTable,
  BranchTable,
  StockTable,
  PriceTable
], daos: [
  UserDao,
  TokenDao,
  UnitDao,
  BusinessDao,
  BranchDao,
  CategoryDao,
  TabsDao
])
class Database extends _$Database {
  Database() : super(_openConnection());
  @override
  int get schemaVersion => 1;
  @override
  MigrationStrategy get migration {
    return MigrationStrategy(
      beforeOpen: (details) async {
        customStatement('PRAGMA foreign_keys = ON');
      },
      onUpgrade: (Migrator migrator, from, to) async {
        print(from);
        if (from == 1) {
          await migrator.createTable(categoryTable);
          await migrator.createTable(unitTable);
          await migrator.createTable(priceTable);
        }
      },
      onCreate: (Migrator m) {
        return m.createAllTables();
      },
    );
  }
}