import 'package:flipper/model/sheet.dart';
import 'package:flutter/material.dart';

@immutable
class OnBottomSheetChanged {
  final Sheets sheet;

  const OnBottomSheetChanged({@required this.sheet});

  @override
  String toString() {
    return "OnBranchLoaded{OnBottomSheetChanged: $sheet}";
  }
}
