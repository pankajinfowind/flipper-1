import 'package:flipper/presentation/common/add_note_bar_header.dart';
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
      appBar: AddNoteBarHeader(
        title: "Add Note",
      ),
      body: Row(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.fromLTRB(55, 4, 4, 4),
            child: Container(
              width: 300,
              child: TextFormField(
                decoration: InputDecoration(hintText: 'Add note'),
              ),
            ),
          )
        ],
      ),
    );
  }
}
