import 'package:flipper/home/flipper_drawer.dart';
import 'package:flipper/home/home_app_bar.dart';
import 'package:flipper/home/poswidget.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import "package:flutter/material.dart";

class HomeScreen extends StatefulWidget {
  final ValueNotifier<bool> sideOpenController;
  final CommonViewModel vm;
  final bool showAppBar;

  const HomeScreen({
    Key key,
    @required this.sideOpenController,
    this.showAppBar = false,
    this.vm,
  }) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  final List<Widget> tabs = [
    Poswidget(),
    Container(
      child: Text("second Tab"),
    )
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: HomeAppBar(
        scaffoldKey: _scaffoldKey,
        sideOpenController: widget.sideOpenController,
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.white,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.lock_open),
            title: Text('POS'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people_outline),
            title: Text('ITEMS'),
          ),
        ],
        currentIndex: 0, //TODO:get this from
        selectedItemColor: Colors.amber[800],
        onTap: (num) {},
      ),
      body: tabs[0], //TODO:get this from browser
      drawer: FlipperDrawer(
        vm: widget.vm,
      ),
    );
  }
}
