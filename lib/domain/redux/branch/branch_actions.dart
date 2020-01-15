
import 'package:flipper/model/branch.dart';
import 'package:flutter/material.dart';

@immutable
class OnSetBranchHint {
  final Branch branch;

  const OnSetBranchHint({@required this.branch});
}
