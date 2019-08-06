import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Products extends StatefulWidget {
  @override
  _ProductsState createState() => _ProductsState();
}

class _ProductsState extends State<Products>
    with SingleTickerProviderStateMixin, AutomaticKeepAliveClientMixin {
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, initialIndex: 0, length: 2);
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return GridView.count(
      crossAxisCount: 4,
      children: List.generate(100, (index) {
        return Card(
          color: Colors.blue, //set a bg of a card.
          child: Center(
            child: Text(
              'Item $index',
              style: Theme.of(context).textTheme.headline,
            ),
          ),
        );
      }),
    );
  }

  @override
  bool get wantKeepAlive => true;
}
