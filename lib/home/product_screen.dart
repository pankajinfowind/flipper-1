import 'package:flipper/presentation/widgets/payable_widget.dart';
import 'package:flutter/material.dart';

class ProductScreen extends StatefulWidget {
  ProductScreen({Key key}) : super(key: key);
  @override
  _ProductScreenState createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  Widget _myListView(BuildContext context) {
    final titles = [
      'bike',
      'boat',
      'bus',
      'car',
      'railway',
      'run',
      'subway',
      'transit',
      'walk'
    ];

    return ListView(
      children: ListTile.divideTiles(
        context: context,
        tiles: [
          ListTile(
            title: Text(
              'Sun',
              style: TextStyle(color: Colors.black),
            ),
          ),
          ListTile(
            title: Text(
              'Moon',
              style: TextStyle(color: Colors.black),
            ),
          ),
          ListTile(
            title: Text(
              'Star',
              style: TextStyle(color: Colors.black),
            ),
          ),
        ],
      ).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: <Widget>[
        Align(
          child: PayableWidget(),
        ),
        Expanded(
          child: _myListView(context),
        )
      ],
    ));
  }
}
