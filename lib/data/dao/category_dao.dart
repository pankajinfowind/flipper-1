import 'package:flipper/data/branch.dart';
import 'package:flipper/data/main_database.dart';
import 'package:moor/moor.dart';

part 'category_dao.g.dart';

@UseDao(tables: [BranchTable])
class CategoryDao extends DatabaseAccessor<Database> with _$CategoryDaoMixin {
  final Database db;

  CategoryDao(this.db) : super(db);

  Future insert(Insertable<CategoryTableData> branch) =>
      into(db.categoryTable).insert(branch);
  Future<List<CategoryTableData>> getBranches() =>
      select(db.categoryTable).get();
}
