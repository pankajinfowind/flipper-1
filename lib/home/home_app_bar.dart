import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/cart.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import "package:flutter/material.dart";
import 'package:flutter_redux/flutter_redux.dart';

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
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        List<Cart> carts = [];
        var quantity;
        vm.database.cartDao.getCarts().listen((cart) => {
              for (var i = 0; i < cart.length; i++)
                {
                  carts.add(
                    Cart(
                      (c) => c
                        ..id = cart[i].id
                        ..variationId = cart[i].variationId
                        ..count = cart[i].count
                        ..variationName = cart[i].variationName
                        ..createdAt = cart[i].createdAt ?? DateTime.now()
                        ..updatedAt = cart[i].updatedAt
                        ..branchId = cart[i].branchId
                        ..parentName = cart[i].parentName,
                    ),
                  )
                }
            });

        StoreProvider.of<AppState>(context).dispatch(
          Carts(carts: carts),
        );
        for (var i = 0; i < carts.length; i++) {
          quantity += carts[i].count;
        }
        StoreProvider.of<AppState>(context).dispatch(
          CartQuantity(quantity: quantity),
        );
        return SafeArea(
          top: true,
          child: Container(
            height: AppTheme.appBarSize,
            child: Row(
              children: <Widget>[
                _hamburger(),
                SizedBox(
                  height: 120,
                  width: vm.cartItems.length == 0 ? 120 : 80,
                ),
                Align(
                  alignment: Alignment.center,
                  child: Text(
                    vm.carts.length == 0
                        ? S.of(context).noSale
                        : S.of(context).currentSale +
                            "[" +
                            vm.cartQuantities.toString() +
                            "]",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 20,
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
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
