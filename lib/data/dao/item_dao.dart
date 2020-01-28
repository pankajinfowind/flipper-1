import 'package:flipper/data/item_table.dart';
import 'package:flipper/data/main_database.dart';
import 'package:moor/moor.dart';

part 'item_dao.g.dart';

@UseDao(tables: [ItemTable])
class ItemDao extends DatabaseAccessor<Database> with _$ItemDaoMixin {
  final Database db;

  ItemDao(this.db) : super(db);

  Future insert(Insertable<ItemTableData> item) =>
      into(db.itemTable).insert(item);

  Future updateVariation(ItemTableData entry) {
    // using replace will update all fields from the entry that are not marked as a primary key.
    // it will also make sure that only the entry with the same primary key will be updated.
    // Here, this means that the row that has the same id as entry will be updated to reflect
    // the entry's title, content and category. As it set's its where clause automatically, it
    // can not be used together with where.
    return update(db.itemTable).replace(entry);
  }

  Future<List<ItemTableData>> getItems() =>
      select(db.itemTable).get();
}
