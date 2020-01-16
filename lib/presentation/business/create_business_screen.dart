import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/authentication/auth_actions.dart';
import 'package:flipper/domain/redux/business/business_actions.dart';
import 'package:flipper/domain/redux/permission/permission_check.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:geolocator/geolocator.dart';

class TBusiness {
  String name;
  String password;
  String agreeTerms;
  String email;
}

class CreateBusinessScreen extends StatefulWidget {
  CreateBusinessScreen({Key key}) : super(key: key);

  @override
  _CreateBusinessScreenState createState() => _CreateBusinessScreenState();
}

class _CreateBusinessScreenState extends State<CreateBusinessScreen> {
  final _formKey = GlobalKey<FormState>();
  final TBusiness tBusiness = TBusiness();
  Position position;
  _getCurrentLocation() async {
    var geolocator = Geolocator();
    var locationOptions =
        LocationOptions(accuracy: LocationAccuracy.high, distanceFilter: 10);

    geolocator.getPositionStream(locationOptions).listen((Position location) {
      setState(() {
        position = location;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    //grant that we have the permission we need for this activity
    StoreProvider.of<AppState>(context).dispatch(CheckPermission());
    _getCurrentLocation();
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            actionButton: FlatButton(
              onPressed: () {
                StoreProvider.of<AppState>(context).dispatch(AppAction(
                    actions: AppActions((a) => a..name = "createBusiness")));
              },
              child: Text(
                "Sign up",
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(color: Colors.white),
              ),
            ),
            icon: Icons.arrow_back,
            multi: 3,
            bottomSpacer: 12,
            positioningActionButton: 265.8,
            actionTitle: "Sign Up",
            action: Column(
              children: <Widget>[
                Text("Let's get started"),
                Text("Sign up for flipper and yegobox is fast and free"),
                Text("No commitment or long-term contracts.")
              ],
            ),
          ),
          backgroundColor: HexColor("#dfe4ea"),
          body: Wrap(
            children: <Widget>[
              Container(
                height: 30,
              ),
              Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    Text("ACCOUNT INFORMATION"),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                      child: Container(
                        width: 300,
                        child: TextFormField(
                          style: TextStyle(color: Colors.black),
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Business name";
                            }
                            return null;
                          },
                          onSaved: (name) {
                            tBusiness.name = name;
                          },
                          decoration: InputDecoration(
                              hintText: "Business name",
                              focusColor: Colors.blue),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                      child: Container(
                        width: 300,
                        child: TextFormField(
                          style: TextStyle(color: Colors.black),
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Email is required";
                            }
                            return null;
                          },
                          onSaved: (email) {
                            tBusiness.email = email;
                          },
                          decoration: InputDecoration(hintText: "Email"),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                      child: Container(
                        width: 300,
                        child: TextFormField(
                          style: TextStyle(color: Colors.black),
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Password should be given";
                            }
                            return null;
                          },
                          onSaved: (password) {
                            tBusiness.password = password;
                          },
                          decoration: InputDecoration(hintText: "Password"),
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(55, 20, 0, 0),
                      child: Row(
                        children: <Widget>[
                          Flexible(
                            child: Text(
                                "Accept Flipper's Seller Agreement and Privacy Policy:" +
                                    position.toString()),
                          ),
                          //TODO: make this radio when clicked to show that.
                          Radio(
                            activeColor: Colors.red,
                            focusColor: Colors.red,
                            onChanged: (agreeTerm) {
                              tBusiness.agreeTerms = agreeTerm;
                            },
                            value: "1",
                          )
                        ],
                      ),
                    ),
                    Visibility(
                      visible: false,
                      child: FlatButton(
                        child: Text("invisible button"),
                        onPressed: vm.hasAction ? _handleFormSubmit() : null,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        );
      },
    );
  }

  _handleFormSubmit() {
    StoreProvider.of<AppState>(context).dispatch(ResetAppAction());
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
    }
    StoreProvider.of<AppState>(context).dispatch(ResetAppAction());
    final business = Business((b) => b
      ..name = tBusiness.name
      ..email = tBusiness.email
      ..type = BusinessType.NORMAL);
    StoreProvider.of<AppState>(context).dispatch(WithBusiness(business));
    StoreProvider.of<AppState>(context).dispatch(CreateBusiness());
    //finally verify if all is good and go to dashboard.
    StoreProvider.of<AppState>(context).dispatch(VerifyAuthenticationState());
  }
}
