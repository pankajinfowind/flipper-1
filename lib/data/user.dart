import 'package:moor/moor.dart';

class UserTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get username => text().withLength(max: 16)();
  TextColumn get status => text().withLength(max: 16)();
  TextColumn get bearerToken => text()();
  TextColumn get refreshToken => text()();
  TextColumn get email => text()();
  TextColumn get avatar => text().nullable()();
}
