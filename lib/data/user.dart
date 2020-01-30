import 'package:moor/moor.dart';

class UserTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get username => text().nullable()();
  BoolColumn get isCurrentAuthenticated => boolean()();
  TextColumn get status => text().withDefault(Constant('online'))();
  TextColumn get bearerToken => text().nullable()();
  TextColumn get refreshToken => text().nullable()();
  TextColumn get email => text()();
  TextColumn get avatar => text().nullable()();

  // DateTimeColumn get createdAt => currentDateAndTime;
  // DateTimeColumn get updatedAt => currentDateAndTime;
}
