import 'package:moor_flutter/moor_flutter.dart';

//@DataClassName('Category')
class Token extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get token => text()();
}
