import 'package:flutter/material.dart';

class CalculatorButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double padWidth = 136.6;
    final padding = EdgeInsets.fromLTRB(55, 25, 20, 20);
    final style = TextStyle(fontSize: 40, fontFamily: "Heebo-Thin");

    return Wrap(
      children: <Widget>[
        SizedBox(
          height: 20,
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('1', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('2', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('3', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('4', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('5', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('6', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('7', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('8', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('9', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('C', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('0', style: style),
            ),
          ),
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                  width: 0.1,
                ),
              ),
              padding: padding,
              child: Text('+', style: style),
            ),
          ),
        )
      ],
    );
  }

  Widget button(String text) {
    return SizedBox(
      width: 40,
      child: SizedBox(
        width: 40,
        child: InkWell(
          onTap: () {},
          child: Container(
            child: Text(text, style: TextStyle(fontSize: 40)),
          ),
        ),
      ),
    );
  }
}
