import 'package:flipper/presentation/common/sale_bar_header.dart';
import 'package:flutter/material.dart';

class SaleScreen extends StatefulWidget {
  SaleScreen({Key key}) : super(key: key);

  @override
  _SaleScreenState createState() => _SaleScreenState();
}

class _SaleScreenState extends State<SaleScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SaleBarHeader(
        title: "Total: FRw 0.00",
      ),
      body: Container(
        child: Text("No Sales now."),
      ),
    );
  }
}
