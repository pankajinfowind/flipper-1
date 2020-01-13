import 'package:auto_route/auto_route_annotations.dart';
import 'package:flipper/presentation/home/dash_board.dart';
import 'package:flipper/presentation/login/loginscreen.dart';
import 'package:flipper/presentation/splash/splash_screen.dart';

@autoRouter
class $Router {
  @initial
  SplashScreen splashScreen;
  DashBoard dashboard;
  LoginScreen login;
}
