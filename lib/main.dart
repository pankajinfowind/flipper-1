import 'package:flipper/flipper_app.dart';
import 'package:flipper/util/logger.dart';
import 'package:flutter/material.dart';

void main() {
  configureLogger();
  runApp(FlipperApp());
}

//sample codes.
//  Logger.e(
//       "Couldn't mark read status for user: $userId ",
//       e: e,
//       s: StackTrace.current,
//     );
