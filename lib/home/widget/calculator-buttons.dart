import 'package:flipper/home/widget/calculator-button.dart';
import 'package:flipper/home/widget/calculator.dart';
import 'package:flutter/material.dart';

class CalculatorButtons extends StatelessWidget {
  CalculatorButtons({@required this.onTap});

  final CalculatorButtonTapCallback onTap;
  final calculatorButtonRows = [
    ['7', '8', '9', Calculations.DIVIDE],
    ['4', '5', '6', Calculations.MULTIPLY],
    ['1', '2', '3', Calculations.SUBTRACT],
    [Calculations.PERIOD, '0', '00', Calculations.ADD],
    [Calculations.CLEAR, Calculations.EQUAL]
  ];

  @override
  Widget build(BuildContext context) {
    List<Widget> rowButtons = [];
    double padWidth = 137.1;
    double spacing = 15;
    final padding = EdgeInsets.fromLTRB(55, 30, 20, 20);
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.8,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
                ),
              ),
              padding: padding,
              child: Text('3', style: style),
            ),
          ),
        ),
        SizedBox(
          height: spacing,
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
                ),
              ),
              padding: padding,
              child: Text('6', style: style),
            ),
          ),
        ),
        SizedBox(
          height: spacing,
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
                ),
              ),
              padding: padding,
              child: Text('9', style: style),
            ),
          ),
        ),
        SizedBox(
          height: spacing,
        ),
        SizedBox(
          width: padWidth,
          child: InkWell(
            onTap: () {},
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
                  color: Color.fromRGBO(0, 0, 0, 0.1),
                  width: 0.5,
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
