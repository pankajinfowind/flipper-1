import 'package:flutter/material.dart';

class KeyVutton extends StatefulWidget {
  KeyVutton({Key key}) : super(key: key);

  @override
  _KeyVuttonState createState() => _KeyVuttonState();
}

class _KeyVuttonState extends State<KeyVutton> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
          child: Wrap(
        children: _getItems(),
      )),
    );
  }

  List<Widget> _getItems() {
    List<int> list = new List<int>();
    list.addAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    List<Widget> widget = new List<Widget>();

    for (var i = 0; i < list.length; i++) {
      if (i == 10) {
        widget.add(
          SizedBox(
            width: 136.99,
            child: InkWell(
              enableFeedback: false,
              onTap: () async {},
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Color.fromRGBO(0, 0, 0, 0.1),
                    width: 0.5,
                  ),
                ),
                padding: EdgeInsets.fromLTRB(55, 21, 20, 20),
                child: Text(0.toString(),
                    style: TextStyle(fontSize: 40, fontFamily: "Heebo-Thin")),
              ),
            ),
          ),
        );
      } else {
        widget.add(
          SizedBox(
            width: 136.99,
            child: InkWell(
              enableFeedback: false,
              onTap: () async {},
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Color.fromRGBO(0, 0, 0, 0.1),
                    width: 0.5,
                  ),
                ),
                padding: EdgeInsets.fromLTRB(55, 21, 20, 20),
                child: Text(
                  i.toString(),
                  style: TextStyle(fontSize: 40, fontFamily: "Heebo-Thin"),
                ),
              ),
            ),
          ),
        );
      }
    }
    return widget;
  }
}
