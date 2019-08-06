import 'dart:io';
import 'package:enexus/blocs/login/bloc.dart';
import 'package:enexus/blocs/login/login_bloc.dart';
import 'package:enexus/data/moor_database.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:moor_flutter/moor_flutter.dart' as v;
import 'package:provider/provider.dart';

import '../categories_page.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocProvider(
        builder: (context) => LoginBloc(), //bloc connect us to data stream.
        child: LoginUi(),
      ),
    );
  }
}

class LoginUi extends StatelessWidget {
  final emailEditTextController = TextEditingController();
  final passwordEditTextController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final dao = Provider.of<TokenDao>(context);
    Future<List<TokenData>> tokenExist = dao.getToken();
    tokenExist.then((onData) {
      if (onData.length > 1) {
        goHome(context);
      }
    });
    return SafeArea(
      child: BlocListener(
          bloc: BlocProvider.of<LoginBloc>(context),
          // Listener is the place for logging, showing Sandbars, navigating, etc.
          // It is guaranteed to run only once per state change.
          listener: (BuildContext context, LoginState state) {
            if (state is LoggedInState) {
              print("app is logging ");
            }
            if (state is LoggedInState) {
              //print("is Logged In${state.loginData.username}");

              final token = TokenCompanion(
                token: v.Value(state.loginData.token),
              );

              dao.insertToken(token);
              Future<List<TokenData>> tokenExist = dao.getToken();
              tokenExist.then((onData) {
                if (onData.length > 1) {
                  goHome(context);
                } else {
                  //insert a token
                  dao.insertToken(token);
                }
              });
            }
          },
          child: BlocBuilder(
            bloc: BlocProvider.of<LoginBloc>(context),
            // ignore: missing_return
            builder: (BuildContext context, LoginState state) {
              if (state is InitialLoginState) {
                return buildListView(context);
              } else {
                return buildListView(context);
              }
            },
          )),
    );
  }

  ListView buildListView(BuildContext context) {
    return ListView(
      padding: EdgeInsets.symmetric(horizontal: 24.0),
      children: <Widget>[
        SizedBox(height: 220.0),
        Stack(
          children: <Widget>[
            positionAppLogoOnLogin(),
          ],
        ),
        SizedBox(height: 90.0),
        TextField(
          controller: emailEditTextController,
          decoration: InputDecoration(
            fillColor: Colors.white,
            labelText: 'username or email',
            filled: true,
            border: OutlineInputBorder(),
          ),
        ),
        SizedBox(height: 12.0),
        //TODO: delete password once implemented multi-step login as on yegobox.
        TextField(
          controller: passwordEditTextController,
          decoration: InputDecoration(
            fillColor: Colors.white,
            labelText: 'password',
            filled: true,
            border: OutlineInputBorder(),
          ),
        ),
        SizedBox(height: 12.0),
        Stack(
          children: <Widget>[
            FlatButton(
              child: Text("Cancel"),
              onPressed: () {},
            ),
            nextButton(context),
          ],
        )
      ],
    );
  }

  //functions
  Positioned nextButton(BuildContext context) {
    return Platform.isWindows ||
            Platform.isLinux ||
            Platform.isMacOS ||
            Platform.isFuchsia
        ? Positioned(
            left: 810,
            child: CupertinoButton(
              color: Colors.blueAccent,
              child: Stack(
                children: <Widget>[
                  Text("Next"),
                ],
              ),
              borderRadius: const BorderRadius.all(Radius.circular(8.0)),
              onPressed: () => goVerifyPassword(context),
            ),
          )
        : Positioned(
            left: 200,
            child: CupertinoButton(
              color: Colors.blueAccent,
              child: Stack(
                children: <Widget>[
                  Text("Next"),
                ],
              ),
              borderRadius: const BorderRadius.all(Radius.circular(8.0)),
              onPressed: () => goVerifyPassword(context),
            ),
          );
  }

  Positioned positionAppLogoOnLogin() {
    return Platform.isWindows ||
            Platform.isLinux ||
            Platform.isMacOS ||
            Platform.isFuchsia
        ? Positioned(
            child: Image.asset('assets/logo.png'),
          )
        : Positioned(
            child: Image.asset('assets/logo.png'),
          );
  }

  void goVerifyPassword(context) {
    final loginBloc = BlocProvider.of<LoginBloc>(context);
    loginBloc.dispatch(GetLogin(
        emailEditTextController.text, passwordEditTextController.text));
  }

  void goHome(context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => CategoriesPage()),
    );
  }
}
