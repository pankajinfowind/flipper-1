// this is the custom object with we want to store in a column. It
//    can be as complex as you want it to be
import 'package:moor/moor.dart';

class DateTimeObject {
  final DateTime data;
  DateTimeObject(this.data);
}

class CustomConverter extends TypeConverter<DateTimeObject, DateTime> {
  const CustomConverter();
  @override
  DateTimeObject mapToDart(DateTime fromDb) {
    return fromDb == null ? null : DateTimeObject(fromDb);
  }

  @override
  DateTime mapToSql(DateTimeObject value) {
    return value?.data;
  }
}
