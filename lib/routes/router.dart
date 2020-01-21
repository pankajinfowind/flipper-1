import 'package:auto_route/auto_route_annotations.dart';
import 'package:auto_route/transitions_builders.dart';
import 'package:flipper/home/add_category_screen.dart';
import 'package:flipper/home/add_item_screen.dart';
import 'package:flipper/home/add_unit_type.dart';
import 'package:flipper/home/add_variation_screen.dart';
import 'package:flipper/home/bottom_sheet_sreen.dart';
import 'package:flipper/home/edit_item_title.dart';
import 'package:flipper/home/sale_screen.dart';
import 'package:flipper/home/setting_up_application_screen.dart';
import 'package:flipper/home/take_picture_screen.dart';
import 'package:flipper/presentation/business/create_business_screen.dart';
import 'package:flipper/presentation/business/sign_up_screen.dart';
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

  @MaterialRoute(fullscreenDialog: true)
  SettingUpApplicationScreen settingUpApplicationScreen;

  @CustomRoute(
      transitionsBuilder: TransitionsBuilders.slideLeft,
      durationInMilliseconds: 200)
  @MaterialRoute(fullscreenDialog: true)
  SignUpScreen signUpScreen;

  @MaterialRoute(fullscreenDialog: true)
  CreateBusinessScreen createBusiness;

  @MaterialRoute(fullscreenDialog: true)
  AddItemScreen addItemScreen;

  @MaterialRoute(fullscreenDialog: true)
  EditItemTitle editItemTitle;

  @MaterialRoute(fullscreenDialog: true)
  TakePictureScreen takePictureScreen;

  @MaterialRoute(fullscreenDialog: true)
  AddVariationScreen addVariationScreen;

  @MaterialRoute(fullscreenDialog: true)
  AddUnitType addUnitType;

  @MaterialRoute(fullscreenDialog: true)
  AddCategoryScreen addCategoryScreen;
}
