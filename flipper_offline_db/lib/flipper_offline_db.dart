import 'dart:async';

import 'package:flutter/services.dart';

class FlipperOfflineDb {
  static const MethodChannel _channel =
      const MethodChannel('flipper_offline_db');

  static Future<String> get platformVersion async {
    final String version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }
}
