import 'package:flipper/routes/router.gr.dart';
import "package:flutter/material.dart";

import '../theme.dart';

class HomeAppBar extends StatelessWidget implements PreferredSizeWidget {
  const HomeAppBar({
    @required this.scaffoldKey,
    @required this.sideOpenController,
  });

  final GlobalKey<ScaffoldState> scaffoldKey;
  final ValueNotifier<bool> sideOpenController;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      child: Container(
        height: AppTheme.appBarSize,
        child: Row(
          children: <Widget>[
            _hamburger(),
            SizedBox(
              height: 120,
            ),
            Row(
              children: <Widget>[
                SizedBox(
                  child: FlatButton(
                    onPressed: () {
                      Router.navigator.pushNamed(Router.saleScreen);
                    },
                    child: Text(
                      "No sale",
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: "Heboo-Regular"),
                    ),
                  ),
                ),
                Container(
                  width: 120,
                ),
                SizedBox(
                  child: FlatButton(
                    onPressed: () {},
                    child: Text(
                      "Split",
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: "Heboo-Regular"),
                    ),
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _hamburger() {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          scaffoldKey.currentState.openDrawer();
        },
        child: Container(
          width: AppTheme.appBarSize,
          height: AppTheme.appBarSize,
          child: Center(
            child: Stack(
              overflow: Overflow.visible,
              children: <Widget>[
                Image.asset(
                  "assets/graphics/menu_icon.png", //TODO: change it to our icon later.
                  width: 25,
                  height: 25,
                ),
                Visibility(
                  visible: true,
                  child: Positioned(
                    top: -3,
                    right: -5,
                    height: 12,
                    width: 12,
                    child: Image.asset(
                      "assets/graphics/updates_indicator_white.png",
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(AppTheme.appBarSize);
}
