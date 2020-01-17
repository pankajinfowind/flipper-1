import 'package:flipper/data/business.dart';
import 'package:flipper/data/main_database.dart';
import 'package:moor/moor.dart';

part 'business_dao.g.dart';

@UseDao(tables: [BusinessTable])
class BusinessDao extends DatabaseAccessor<Database> with _$BusinessDaoMixin {
  final Database db;

  BusinessDao(this.db) : super(db);

  Future insert(Insertable<BusinessTableData> business) =>
      into(db.businessTable).insert(business);

  Future assignBusinessToUser(Insertable<BusinessUserTableData> data) =>
      into(db.businessUserTable).insert(data);


  Future<List<BusinessTableData>> getBusinesses() =>
      select(db.businessTable).get();

  Future<BusinessTableData> getActiveBusiness() {
    return (select(db.businessTable)
      ..orderBy(
          [(t) => OrderingTerm(expression: t.id, mode: OrderingMode.desc)])
      ..where((t)=>t.isActive.equals(true))
      ..limit(1))
        .getSingle();
  }
}
