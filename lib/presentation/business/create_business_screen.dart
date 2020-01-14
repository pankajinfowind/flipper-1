import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/permission/permission_check.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:geolocator/geolocator.dart';
import 'package:redux/redux.dart';

class Business {
  String name;
  String password;
}

class CreateBusinessScreen extends StatefulWidget {
  CreateBusinessScreen({Key key}) : super(key: key);

  @override
  _CreateBusinessScreenState createState() => _CreateBusinessScreenState();
}

class _CreateBusinessScreenState extends State<CreateBusinessScreen> {
  final _formKey = GlobalKey<FormState>();
  Store<AppState> store;
  Position _currentPosition;

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
    return Scaffold(
      appBar: CommonAppBar(
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
      body: StoreConnector<AppState, CommonViewModel>(
        distinct: true,
        converter: CommonViewModel.fromStore,
        builder: (context, vm) {
          if (vm.hasAction) {
            //do validation
            if (_formKey.currentState.validate()) {
              _formKey.currentState.save();
              return Container();
            }
            return Container();
          } else {
            return CreateBusinessForm(
              formKey: _formKey,
              position: position,
            );
          }
        },
      ),
    );
    //store.dispatch(OnBusinessLoaded(business: businessList));
    //TODO: On Creating a business then create one branch default and set it as hint then go to dashboard..
    //TODO: now fire the branches to store //   //  store.dispatch(OnBranchLoaded(branches: branchList)); get branch list from localDB
    //TODO: make hint comes from a default branch
    //      final _hint = Hint((h) => h
    //        ..name = "Nyamirambo Branch"
    //        ..type = HintType.Branch);
    //      store.dispatch(OnHintLoaded(hint: _hint));
  }
}

class CreateBusinessForm extends StatelessWidget {
  final Position position;
  const CreateBusinessForm({
    Key key,
    @required GlobalKey<FormState> formKey,
    this.position,
  })  : _formKey = formKey,
        super(key: key);

  final GlobalKey<FormState> _formKey;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
      child: Form(
        child: Column(
          key: _formKey,
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
                  onSaved: (value) {},
                  decoration: InputDecoration(hintText: "Business name"),
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
                  onSaved: (value) {},
                  decoration: InputDecoration(hintText: "Email"),
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
                      return "Password should be given";
                    }
                    return null;
                  },
                  onSaved: (value) {},
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
                  Radio(
                    value: 1,
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
