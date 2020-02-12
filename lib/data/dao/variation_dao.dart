import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/variation_table.dart';
import 'package:moor/moor.dart';

part 'variation_dao.g.dart';

@UseDao(tables: [VariationTable])
class VariationDao extends DatabaseAccessor<Database> with _$VariationDaoMixin {
  final Database db;

  VariationDao(this.db) : super(db);

  Future insert(Insertable<VariationTableData> variation) =>
      into(db.variationTable).insert(variation);

  Future updateVariation(VariationTableData entry) {
    // using replace will update all fields from the entry that are not marked as a primary key.
    // it will also make sure that only the entry with the same primary key will be updated.
    // Here, this means that the row that has the same id as entry will be updated to reflect
    // the entry's title, content and category. As it set's its where clause automatically, it
    // can not be used together with where.
    return update(db.variationTable).replace(entry);
  }

  Future<List<VariationTableData>> getItemVariations(int itemId) {
    return (select(db.variationTable)
          ..orderBy(
              [(t) => OrderingTerm(expression: t.id, mode: OrderingMode.desc)])
          ..where((t) => t.itemId.equals(itemId)))
        .get();
  }

  Stream<List<VariationTableData>> getItemVariations2(int itemId) {
    return (select(db.variationTable)
          ..orderBy(
              [(t) => OrderingTerm(expression: t.id, mode: OrderingMode.asc)])
          ..where((t) => t.itemId.equals(itemId)))
        .watch();
  }

  Future<VariationTableData> getVariationBy(String name, int branchId) {
    return (select(db.variationTable)
          ..orderBy(
            ([
              (t) => OrderingTerm(expression: t.id, mode: OrderingMode.asc),
            ]),
          )
          ..where((t) => t.name.equals(name))
          ..where((t) => t.branchId.equals(branchId)))
        .getSingle();
  }

  Future<VariationTableData> getVariationById(int variantId) {
    return (select(db.variationTable)..where((t) => t.id.equals(variantId)))
        .getSingle();
  }

  Stream<List<VariationTableData>> getVariationByStream(
      String name, int branchId) {
    return (select(db.variationTable)
          ..where((t) => t.name.equals(name))
          ..where((t) => t.branchId.equals(branchId)))
        .watch();
  }

  Stream<List<VariationTableData>> getVariationByStream2(
      String name, int itemId) {
    return (select(db.variationTable)
          ..where((t) => t.name.equals(name))
          ..where((t) => t.itemId.equals(itemId)))
        .watch();
  }
}
