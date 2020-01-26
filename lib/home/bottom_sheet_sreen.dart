import 'package:flipper/home/widget/flipper_input.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flutter/material.dart';

class BottomSheetScreen extends StatefulWidget {
  BottomSheetScreen({Key key}) : super(key: key);

  @override
  _BottomSheetScreenState createState() => _BottomSheetScreenState();
}

class _BottomSheetScreenState extends State<BottomSheetScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        disableButton: false,
        title: "Add Note",
      ),
      body: Row(
        children: <Widget>[
          FlipperInput(
            hint: "Add Note",
          )
        ],
      ),
    );
  }
}
