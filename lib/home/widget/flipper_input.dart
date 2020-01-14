import 'package:flutter/material.dart';

class FlipperInput extends StatelessWidget {
  final String _hint;
  final String validationMessage;
  const FlipperInput({
    String hint,
    this.validationMessage,
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
          validator: (value) {
            if (value.isEmpty) {
              return this.validationMessage;
            }
            return null;
          },
          onSaved: (value) {},
          decoration: InputDecoration(hintText: _hint ?? ""),
        ),
      ),
    );
  }
}
