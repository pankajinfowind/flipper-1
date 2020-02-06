import 'package:flipper/flipper_app.dart';
import 'package:flipper/util/logger.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  configureLogger();
  //todo:this might cause the error please review this.
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  runApp(FlipperApp());
}

//sample codes.
//  Logger.e(
//       "Couldn't mark read status for user: $userId ",
//       e: e,
//       s: StackTrace.current,
//     );
