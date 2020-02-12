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

  Future updateItem(ItemTableData entry) {
    // using replace will update all fields from the entry that are not marked as a primary key.
    // it will also make sure that only the entry with the same primary key will be updated.
    // Here, this means that the row that has the same id as entry will be updated to reflect
    // the entry's title, content and category. As it set's its where clause automatically, it
    // can not be used together with where.
    return update(db.itemTable).replace(entry);
  }

  Future<List<ItemVariation>> getItemVariations() {
    return (select(itemTable)
          ..orderBy(
            ([
              (t) => OrderingTerm(expression: t.id, mode: OrderingMode.asc),
            ]),
          ))
        .join(
      [
        leftOuterJoin(variationTable,
            db.variationTable.branchId.equalsExp(db.itemTable.branchId)),
      ],
    ).map((row) {
      final items = row.readTable(itemTable);
      final variations = row.readTable(variationTable);

      return ItemVariation(items: items, variations: variations);
    }).get();
  }

  Future<ItemTableData> getItemBy(String name, int branchId) {
    return (select(db.itemTable)
          ..where((t) => t.name.equals(name))
          ..where((t) => t.branchId.equals(branchId)))
        .getSingle();
  }

  Future<List<ItemTableData>> getItems() => select(db.itemTable).get();
}
