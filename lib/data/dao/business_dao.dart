import 'package:flipper/data/business.dart';
import 'package:flipper/data/main_database.dart';
import 'package:moor/moor.dart';

part 'business_dao.g.dart';

@UseDao(tables: [BusinessTable])
class BusinessDao extends DatabaseAccessor<Database> with _$BusinessDaoMixin {
  final Database db;

  BusinessDao(this.db) : super(db);

  Future insert(Insertable<BusinessTableData> user) =>
      into(db.businessTable).insert(user);
  Future<List<BusinessTableData>> getBusinesses() =>
      select(db.businessTable).get();
}
