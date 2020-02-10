import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flipper_offline_db/flipper_offline_db.dart';

void main() {
  const MethodChannel channel = MethodChannel('flipper_offline_db');

  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    channel.setMockMethodCallHandler((MethodCall methodCall) async {
      return '42';
    });
  });

  tearDown(() {
    channel.setMockMethodCallHandler(null);
  });

  test('getPlatformVersion', () async {
    expect(await FlipperOfflineDb.platformVersion, '42');
  });
}
