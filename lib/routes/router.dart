import 'package:auto_route/auto_route_annotations.dart';
import 'package:flipper/home/bottom_sheet_sreen.dart';
import 'package:flipper/home/sale_screen.dart';
import 'package:flipper/presentation/home/dash_board.dart';
import 'package:flipper/presentation/login/loginscreen.dart';
import 'package:flipper/presentation/splash/splash_screen.dart';

@autoRouter
class $Router {
  @initial
  SplashScreen splashScreen;
  DashBoard dashboard;
  LoginScreen login;
  @MaterialRoute(fullscreenDialog: true)
  BottomSheetScreen bottom;
  @MaterialRoute(fullscreenDialog: true)
  SaleScreen saleScreen;
}
