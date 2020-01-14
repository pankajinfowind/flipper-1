import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/permission/permission_check.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:geolocator/geolocator.dart';

class Business {
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
  final Business business = Business();
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
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Business name";
                            }
                            return null;
                          },
                          onSaved: (name) {
                            business.name = name;
                          },
                          decoration:
                              InputDecoration(hintText: "Business name"),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                      child: Container(
                        width: 300,
                        child: TextFormField(
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Email is required";
                            }
                            return null;
                          },
                          onSaved: (email) {
                            business.email = email;
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
                            business.password = password;
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
                              business.agreeTerms = agreeTerm;
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
    print(business.agreeTerms);
    //todo: reset app action
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
    }
    StoreProvider.of<AppState>(context).dispatch(ResetAppAction());
    //store.dispatch(OnBusinessLoaded(business: businessList));
    //TODO: On Creating a business then create one branch default and set it as hint then go to dashboard..
    //TODO: now fire the branches to store //   //  store.dispatch(OnBranchLoaded(branches: branchList)); get branch list from localDB
    //TODO: make hint comes from a default branch
    //todo:      final _hint = Hint((h) => h
    // todo:       ..name = "Nyamirambo Branch"
    //todo:       ..type = HintType.Branch);
    //todo:      store.dispatch(OnHintLoaded(hint: _hint));

    StoreProvider.of<AppState>(context).dispatch(ResetAppAction());
  }
}
