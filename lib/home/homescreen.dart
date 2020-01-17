import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/home/flipper_drawer.dart';
import 'package:flipper/home/home_app_bar.dart';
import 'package:flipper/home/poswidget.dart';
import 'package:flipper/home/product_screen.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import "package:flutter/material.dart";
import 'package:flutter_redux/flutter_redux.dart';

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
  final List<Widget> tabs = [Poswidget(), ProductScreen()];

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
            icon: Icon(Icons.credit_card),
            title: Text('POS'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people_outline),
            title: Text('ITEMS'),
          ),
        ],
        currentIndex: widget.vm.tab,
        selectedItemColor: Colors.amber[800],
        onTap: (num) {
          StoreProvider.of<AppState>(context).dispatch(CurrentTab(tab: num));
          StoreProvider.of<AppState>(context)
              .dispatch(OnSetTab()); //persist tab
        },
      ),
      body: tabs[widget.vm.tab],
      drawer: FlipperDrawer(
        vm: widget.vm,
      ),
    );
  }
}
