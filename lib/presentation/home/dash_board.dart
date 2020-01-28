import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/bottom_sheet/bottom_sheet_actions.dart';
import 'package:flipper/home/homescreen.dart';
import 'package:flipper/home/slide_out_screen.dart';
import 'package:flipper/home/widget/loader.dart';
import 'package:flipper/presentation/branch/event/event_details.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class DashBoard extends StatefulWidget {
  DashBoard({Key key}) : super(key: key);

  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  ValueNotifier<bool> _sideOpenController;
  final _scaffoldKey = new GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _sideOpenController = ValueNotifier<bool>(false);
  }

  @override
  void dispose() {
    super.dispose();
    _sideOpenController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      // ignore: missing_return
      builder: (context, vm) {
        if (vm.hasUser) {
          final we = Scaffold(
            key: _scaffoldKey,
            body: SlideOutScreen(
              main: HomeScreen(
                vm: vm,
                sideOpenController: _sideOpenController,
              ),
              side: EventDetails(),
              sideOpenController: _sideOpenController,
            ),
          );
          if (vm.hasSheet) {
            WidgetsBinding.instance.addPostFrameCallback(
                (_) => Router.navigator.pushNamed(Router.bottom));
          }
          if (vm.hasAction && vm.appAction.name == "showLoader") {
            WidgetsBinding.instance.addPostFrameCallback((_) => {
                  showDialog<void>(
                    context: context,
                    barrierDismissible: false,
                    builder: (BuildContext dialogContext) {
                      return Dialog(
                        backgroundColor: Colors.transparent,
                        elevation: 0,
                        child: Material(
                          type: MaterialType.transparency,
                          child: Loader(
                            radius: 60.0,
                            dotRadius: 6.0,
                          ),
                        ),
                      );
                    },
                  ).whenComplete(() => {
                        StoreProvider.of<AppState>(context)
                            .dispatch(ResetAppAction())
                      })
                });
          }
          return we;
        }
      },
    );
  }
}
