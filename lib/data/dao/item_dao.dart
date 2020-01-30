import 'package:flipper/data/dao/UserBusiness.dart';
import 'package:flipper/data/dao/item_variation.dart';
import 'package:flipper/data/item_table.dart';
import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/variation_table.dart';
import 'package:moor/moor.dart';
part 'item_dao.g.dart';

@UseDao(tables: [ItemTable, VariationTable])
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

  //todo: combine item and variation in one query.
  // Future<List<ItemVariation>> getItemss() {
  //   return (select(db.itemTable)
  //         ..orderBy(
  //           ([
  //             (t) => OrderingTerm(expression: t.id, mode: OrderingMode.asc),
  //             (t) => OrderingTerm(expression: t.id),
  //           ]),
  //         ))
  //       .join(
  //         [
  //           leftOuterJoin(db.itemTable,
  //               db.variationTable.branchId.equalsExp(db.itemTable.branchId)),
  //         ],
  //       )
  //       .map(
  //         (row) => ItemVariation(
  //           item: row.readTable(itemTable),
  //           variation: row.readTable(variationTable),
  //         ),
  //       )
  //       .get();
  // }

  Future<List<ItemTableData>> getItems() => select(db.itemTable).get();
}
