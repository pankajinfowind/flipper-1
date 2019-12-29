import 'package:flipper/data/main_database.dart';
import 'package:flipper/data/token.dart';
import 'package:moor_flutter/moor_flutter.dart';

part 'token_dao.g.dart';

@UseDao(tables: [Token])
class TokenDao extends DatabaseAccessor<Database> with _$TokenDaoMixin {
  final Database db;
  TokenDao(this.db) : super(db);
  Future insertToken(Insertable<TokenData> token) =>
      into(db.token).insert(token);
  Future<List<TokenData>> getToken() {
    return (select(db.token)).get();
  }
}
