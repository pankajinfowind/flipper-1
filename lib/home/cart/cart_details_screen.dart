import 'package:flipper/data/main_database.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flutter/material.dart';

class CartDetailsScreen extends StatefulWidget {
  final List<CartTableData> carts;
  CartDetailsScreen({Key key, this.carts}) : super(key: key);

  @override
  _CartDetailsScreenState createState() => _CartDetailsScreenState();
}

class _CartDetailsScreenState extends State<CartDetailsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        title: "Total " +
            widget.carts
                .fold(0, (a, b) => a + (b.price * b.count))
                .toString(), //todo:change to price
      ),
    );
  }
}
