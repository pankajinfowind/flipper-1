import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/presentation/splash/splash_viewmodel.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class SplashScreen extends StatefulWidget {
  SplashScreen({Key key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, SplashViewModel>(
      distinct: true,
      converter: SplashViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          backgroundColor: HexColor("#955be9"),
          body: SafeArea(
            child: LayoutBuilder(
              builder: (builder, constraints) {
                var isTablet = constraints.maxWidth > 600;
                var isLandScape =
                    MediaQuery.of(context).orientation == Orientation.landscape;
                if (isTablet && isLandScape) {
                  return Stack(
                    children: <Widget>[
                      Positioned(
                        top: constraints.maxHeight / 3.0,
                        left: MediaQuery.of(context).size.width / 2.5,
                        child: Center(
                          child: Column(
                            children: <Widget>[
                              Image.asset("assets/graphics/logo.png"),
                              Text(
                                "Flipper",
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                        ),
                      )
                    ],
                  );
                } else {
                  return Stack(
                    children: <Widget>[
                      Positioned(
                        top: constraints.maxHeight / 3.0,
                        left: MediaQuery.of(context).size.width /
                            2.5, //TODO: doubting.
                        child: Center(
                          child: Column(
                            children: <Widget>[
                              Image.asset("assets/graphics/logo.png"),
                              Text(
                                "Flipper",
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                        ),
                      )
                    ],
                  );
                }
              },
            ),
          ),
        );
      },
    );
  }
}
