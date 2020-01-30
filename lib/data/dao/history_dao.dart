import 'package:flipper/data/item_history_table.dart';
import 'package:flipper/data/main_database.dart';
import 'package:moor/moor.dart';

part 'history_dao.g.dart';

@UseDao(tables: [HistoryTable])
class HistoryDao extends DatabaseAccessor<Database> with _$HistoryDaoMixin {
  final Database db;

  HistoryDao(this.db) : super(db);

  Future insert(Insertable<HistoryTableData> History) =>
      into(db.historyTable).insert(History);

  Future updateHistory(HistoryTableData entry) {
    // using replace will update all fields from the entry that are not marked as a primary key.
    // it will also make sure that only the entry with the same primary key will be updated.
    // Here, this means that the row that has the same id as entry will be updated to reflect
    // the entry's title, content and category. As it set's its where clause automatically, it
    // can not be used together with where.
    return update(db.historyTable).replace(entry);
  }

  Future<List<HistoryTableData>> getHistories() =>
      select(db.historyTable).get();
}
