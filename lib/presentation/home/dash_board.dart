import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/bottom_sheet/bottom_sheet_actions.dart';
import 'package:flipper/home/homescreen.dart';
import 'package:flipper/home/slide_out_screen.dart';
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

  void _showBottomSheet() {
    _scaffoldKey.currentState
        .showBottomSheet((context) {
          return SafeArea(
            child: Scaffold(
              //TODO: build commonAppBar so it work for all use case
              appBar: CommonAppBar(
                title: "Add Note",
              ),
              body: Container(
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: TextFormField(
                        decoration:
                            InputDecoration(hintText: 'Enter a search term'),
                      ),
                    )
                  ],
                ),
              ),
            ),
          );
        })
        .closed
        .whenComplete(() {
          StoreProvider.of<AppState>(context).dispatch(OnBottomSheetClosed());
        });
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
//            WidgetsBinding.instance
//                .addPostFrameCallback((_) => _showBottomSheet());
//            StoreProvider.of<AppState>(context).dispatch(OnBottomSheetClosed());
          }
          return we;
        }
      },
    );
  }
}
