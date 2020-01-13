import 'package:auto_route/auto_route_annotations.dart';
import 'package:auto_route/transitions_builders.dart';
import 'package:flipper/home/bottom_sheet_sreen.dart';
import 'package:flipper/home/sale_screen.dart';
import 'package:flipper/presentation/business/create_business_screen.dart';
import 'package:flipper/presentation/home/dash_board.dart';
import 'package:flipper/presentation/splash/aftersplash.dart';
import 'package:flipper/presentation/splash/splash_screen.dart';

@autoRouter
class $Router {
  @initial
  SplashScreen splashScreen;
  DashBoard dashboard;
  @MaterialRoute(fullscreenDialog: true)
  AfterSplash afterSplash;
  @MaterialRoute(fullscreenDialog: true)
  BottomSheetScreen bottom;
  @MaterialRoute(fullscreenDialog: true)
  SaleScreen saleScreen;

  //TODO: work on sliding left animation later.
  @CustomRoute(
      transitionsBuilder: TransitionsBuilders.slideLeft,
      durationInMilliseconds: 200)
  @MaterialRoute(fullscreenDialog: true)
  CreateBusinessScreen createBusinessScreen;
}
