import 'package:flipper/data/respositories/branch_repository.dart';
import 'package:flipper/data/respositories/general_repository.dart';
import 'package:flipper/domain/redux/app_actions/app_action_middleware.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/domain/redux/business/business_middleware.dart';
import 'package:flipper/domain/redux/permission/permission_middleware.dart';
import 'package:flipper/domain/redux/user/user_middleware.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

import 'data/respositories/business_repository.dart';
import 'data/respositories/user_repository.dart';
import 'domain/redux/app_reducer.dart';
import 'domain/redux/authentication/auth_actions.dart';
import 'domain/redux/authentication/auth_middleware.dart';
import 'domain/redux/branch/branch_middleware.dart';
import 'flipper_localization.dart';

class FlipperApp extends StatefulWidget {
  FlipperApp({Key key}) : super(key: key);

  @override
  _FlipperAppState createState() => _FlipperAppState();
}

class _FlipperAppState extends State<FlipperApp> {
  Store<AppState> store;
  static final _navigatorKey = GlobalKey<NavigatorState>();
  final userRepo = UserRepository();
  final businessRepo = BusinessRepository();
  final branchRepo = BranchRepository();
  final generalRepo = GeneralRepository();
  @override
  void initState() {
    super.initState();
    store = Store<AppState>(
      appReducer,
      initialState: AppState.init(),
      middleware:
          createAuthenticationMiddleware(userRepo, businessRepo,branchRepo,generalRepo, _navigatorKey)
            ..addAll(createBusinessMiddleware(_navigatorKey, businessRepo))
            ..addAll(permissionMiddleware(_navigatorKey))
            ..addAll(AppActionMiddleware(_navigatorKey,generalRepo))
            ..addAll(userMiddleware(userRepo,_navigatorKey))
            ..addAll(createBranchMiddleware(_navigatorKey,branchRepo)),
    );
    store.dispatch(
      VerifyAuthenticationState(),
    );
    store.dispatch(
      ShouldLoadBusiness(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return StoreProvider(
      store: store,
      child: MaterialApp(
          debugShowCheckedModeBanner: false,
          localizationsDelegates: localizationsDelegates,
          supportedLocales: [
            const Locale("de", "DE"),
            const Locale("en", "EN"),
            const Locale("pt_BR", "PT"),
            const Locale("rw", "RW"),
          ],
          title: "Flipper",
          theme: AppTheme.theme,
          navigatorKey: Router.navigatorKey,
          initialRoute: Router.splashScreen,
          onGenerateRoute: Router.onGenerateRoute),
    );
  }
}
