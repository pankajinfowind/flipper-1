import 'package:flutter/material.dart';

class FlipperInput extends StatelessWidget {
  final String _hint;
  const FlipperInput({
    String hint,
    Key key,
  })  : _hint = hint,
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
      child: Container(
        width: 300,
        child: TextFormField(
          decoration: InputDecoration(hintText: _hint ?? ""),
        ),
      ),
    );
  }
}
