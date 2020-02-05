import 'package:flipper/data/main_database.dart';
import 'package:flipper/generated/l10n.dart';
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
        title: "Total RWF" +
            widget.carts.fold(0, (a, b) => a + (b.price * b.count)).toString(),
        disableButton: false,
        showActionButton: true,
        actionButtonName: S.of(context).add,
        onPressedCallback: () {
          print("wegot");
        },
      ),
      body: ListView(
        children: renderCart(widget.carts),
      ),
    );
  }

  List<Widget> renderCart(List<CartTableData> carts) {
    List<Widget> list = List<Widget>();
    for (var i = 0; i < carts.length; i++) {
      list.add(ListTile(
        title: Text(
          carts[i].parentName + " × " + carts[i].count.toString(),
          style: TextStyle(color: Colors.black),
        ),
        subtitle: Padding(
          padding: EdgeInsets.fromLTRB(10, 0, 0, 0),
          child: Text(carts[i].variationName),
        ),
        trailing: Padding(
          padding: EdgeInsets.fromLTRB(10, 0, 0, 0),
          child: Text("RWF " +
              carts.fold(0, (a, b) => a + (b.price * b.count)).toString()),
        ),
      ));
    }
    list.add(ListTile(
      title: Text(
        'Total',
        style: TextStyle(color: Colors.black),
      ),
      trailing: Padding(
        padding: EdgeInsets.fromLTRB(10, 0, 0, 0),
        child: Text("RWF " +
            carts.fold(0, (a, b) => a + (b.price * b.count)).toString()),
      ),
    ));
    return list;
  }
}
