import 'package:flipper/presentation/widgets/payable_widget.dart';
import 'package:flutter/material.dart';

class ProductScreen extends StatefulWidget {
  ProductScreen({Key key}) : super(key: key);
  @override
  _ProductScreenState createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Container(
      child: Wrap(
        children: <Widget>[
          Align(
            child: PayableWidget(),
          )
        ],
      ),
    ),);
  }
}