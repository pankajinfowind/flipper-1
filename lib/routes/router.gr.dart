// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:auto_route/router_utils.dart';
import 'package:flipper/presentation/splash/splash_screen.dart';
import 'package:flipper/presentation/home/dash_board.dart';
import 'package:flipper/presentation/splash/aftersplash.dart';
import 'package:flipper/home/bottom_sheet_sreen.dart';
import 'package:flipper/home/sale_screen.dart';
import 'package:flipper/home/setting_up_application_screen.dart';
import 'package:flipper/presentation/business/sign_up_screen.dart';
import 'package:auto_route/transitions_builders.dart';
import 'package:flipper/presentation/business/create_business_screen.dart';
import 'package:flipper/home/add_item_screen.dart';
import 'package:flipper/home/edit_item_title.dart';
import 'package:flipper/home/take_picture_screen.dart';
import 'package:flipper/home/add_variation_screen.dart';
import 'package:flipper/home/add_unit_type.dart';
import 'package:flipper/home/add_category_screen.dart';
import 'package:flipper/home/create_category_input_screen.dart';
import 'package:flipper/home/receive_stock.dart';
import 'package:flipper/home/edit_quantity_item_screen.dart';
import 'package:flipper/model/item.dart';

class Router {
  static const splashScreen = '/';
  static const dashboard = '/dashboard';
  static const afterSplash = '/afterSplash';
  static const bottom = '/bottom';
  static const saleScreen = '/saleScreen';
  static const settingUpApplicationScreen = '/settingUpApplicationScreen';
  static const signUpScreen = '/signUpScreen';
  static const createBusiness = '/createBusiness';
  static const addItemScreen = '/addItemScreen';
  static const editItemTitle = '/editItemTitle';
  static const takePictureScreen = '/takePictureScreen';
  static const addVariationScreen = '/addVariationScreen';
  static const addUnitType = '/addUnitType';
  static const addCategoryScreen = '/addCategoryScreen';
  static const createCategoryInputScreen = '/createCategoryInputScreen';
  static const receiveStock = '/receiveStock';
  static const editQuantityItemScreen = '/editQuantityItemScreen';
  static GlobalKey<NavigatorState> get navigatorKey =>
      getNavigatorKey<Router>();
  static NavigatorState get navigator => navigatorKey.currentState;

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    final args = settings.arguments;
    switch (settings.name) {
      case Router.splashScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => SplashScreen(key: typedArgs),
          settings: settings,
        );
      case Router.dashboard:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => DashBoard(key: typedArgs),
          settings: settings,
        );
      case Router.afterSplash:
        return MaterialPageRoute(
          builder: (_) => AfterSplash(),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.bottom:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => BottomSheetScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.saleScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => SaleScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.settingUpApplicationScreen:
        return MaterialPageRoute(
          builder: (_) => SettingUpApplicationScreen(),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.signUpScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return PageRouteBuilder(
          pageBuilder: (ctx, animation, secondaryAnimation) =>
              SignUpScreen(key: typedArgs),
          settings: settings,
        );
      case Router.createBusiness:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => CreateBusinessScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.addItemScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => AddItemScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.editItemTitle:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => EditItemTitle(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.takePictureScreen:
        return MaterialPageRoute(
          builder: (_) => TakePictureScreen(),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.addVariationScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => AddVariationScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.addUnitType:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => AddUnitType(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.addCategoryScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => AddCategoryScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.createCategoryInputScreen:
        if (hasInvalidArgs<Key>(args)) {
          return misTypedArgsRoute<Key>(args);
        }
        final typedArgs = args as Key;
        return MaterialPageRoute(
          builder: (_) => CreateCategoryInputScreen(key: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.receiveStock:
        if (hasInvalidArgs<int>(args)) {
          return misTypedArgsRoute<int>(args);
        }
        final typedArgs = args as int;
        return MaterialPageRoute(
          builder: (_) => ReceiveStock(variationId: typedArgs),
          settings: settings,
          fullscreenDialog: true,
        );
      case Router.editQuantityItemScreen:
        if (hasInvalidArgs<EditQuantityItemScreenArguments>(args)) {
          return misTypedArgsRoute<EditQuantityItemScreenArguments>(args);
        }
        final typedArgs = args as EditQuantityItemScreenArguments ??
            EditQuantityItemScreenArguments();
        return MaterialPageRoute(
          builder: (_) =>
              EditQuantityItemScreen(key: typedArgs.key, item: typedArgs.item),
          settings: settings,
          fullscreenDialog: true,
        );
      default:
        return unknownRoutePage(settings.name);
    }
  }
}

//**************************************************************************
// Arguments holder classes
//***************************************************************************

//EditQuantityItemScreen arguments holder class
class EditQuantityItemScreenArguments {
  final Key key;
  final Item item;
  EditQuantityItemScreenArguments({this.key, this.item});
}
