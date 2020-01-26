import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class AddVariationScreen extends StatefulWidget {
  AddVariationScreen({Key key}) : super(key: key);

  @override
  _AddVariationScreenState createState() => _AddVariationScreenState();
}

class _AddVariationScreenState extends State<AddVariationScreen> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: "Add Variation",
            showActionButton: true,
            actionButtonName: S.of(context).save,
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: (ListView(
            children: <Widget>[
              Column(
                children: <Widget>[
                  Container(
                    height: 20,
                  ),
                  Center(
                    child: Container(
                      width: 400,
                      child: Divider(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: GestureDetector(
                        onTap: () {
                          Router.navigator.pushNamed(Router.addUnitType);
                        },
                        child: ListTile(
                          contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                          leading: Text("Unit Type"),
                          trailing: Wrap(
                            children: <Widget>[
                              Text(vm.currentUnit != null
                                  ? vm.currentUnit.name
                                  : "Unit Type"),
                              Icon(Icons.arrow_forward_ios)
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: Colors.black),
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        decoration: InputDecoration(
                            hintText: "Name", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: Colors.black),
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        decoration: InputDecoration(
                            hintText: "Price", focusColor: Colors.blue),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: TextFormField(
                        style: TextStyle(color: HexColor("#2d3436")),
                        validator: Validators.isStringHasMoreChars,
                        onSaved: (name) {},
                        decoration: InputDecoration(
                            hintText: "SKU", focusColor: HexColor("#0984e3")),
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      width: 300,
                      child: ListTile(
                        contentPadding: EdgeInsets.symmetric(horizontal: 0.3),
                        leading: Text("Stock"),
                        trailing: FlatButton(
                          child: Text("Receive Stock",
                              style: TextStyle(color: HexColor('#0984e3'))),
                          onPressed: () {
                            Router.navigator.pushNamed(Router.receiveStock);
                          },
                        ),
                      ),
                    ),
                  ),
                  Text("Leave the price blank to enter at the time of sale.")
                ],
              )
            ],
          )),
        );
      },
    );
  }
}
