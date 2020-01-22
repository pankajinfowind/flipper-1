import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/unit_table.dart';
import 'package:moor/moor.dart';

part 'unit_dao.g.dart';

@UseDao(tables: [UnitTable])
class UnitDao extends DatabaseAccessor<Database> with _$UnitDaoMixin {
  final Database db;

  UnitDao(this.db) : super(db);

  Future insert(Insertable<UnitTableData> units) =>
      into(db.unitTable).insert(units);
  Future<List<UnitTableData>> getUnits() => select(db.unitTable).get();
}
