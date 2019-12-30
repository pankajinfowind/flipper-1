import 'package:flutter/material.dart';

class NoKeyboardEditableText extends TextFormField {
  NoKeyboardEditableText(
      {@required TextEditingController controller,
      @required TextStyle style,
      @required Color cursorColor,
      bool autofocus = false,
      Color selectionColor,
      InputDecoration decoration})
      : super(
          controller: controller,
          focusNode: NoKeyboardEditableTextFocusNode(),
          style: style,
          cursorColor: cursorColor,
          autofocus: autofocus,
          decoration: decoration,
        );
}

class NoKeyboardEditableTextState extends EditableTextState {
  @override
  void requestKeyboard() {
    super.requestKeyboard();
    //hide keyboard
    //SystemChannels.textInput.invokeMethod('TextInput.hide');
    FocusScope.of(context).requestFocus(widget.focusNode);
  }
}

class NoKeyboardEditableTextFocusNode extends FocusNode {
  @override
  bool consumeKeyboardToken() {
    // prevents keyboard from showing on first focus
    return false;
  }
}
