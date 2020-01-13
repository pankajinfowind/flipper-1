import 'package:flipper/home/widget/flipper_input.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';

class CreateBusinessScreen extends StatefulWidget {
  CreateBusinessScreen({Key key}) : super(key: key);

  @override
  _CreateBusinessScreenState createState() => _CreateBusinessScreenState();
}

class _CreateBusinessScreenState extends State<CreateBusinessScreen> {
  @override
  Widget build(BuildContext context) {
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
      backgroundColor: HexColor(
          "#dfe4ea"), //TODO: change color to match with square app later.
      body: Padding(
        padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
        child: Column(
          children: <Widget>[
            Text("ACCOUNT INFORMATION"),
            FlipperInput(
              hint: "Email",
            ),
            FlipperInput(
              hint: "Confirm email address",
            ),
            FlipperInput(
              hint: "Password (at least 8 characters)",
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(55, 20, 0, 0),
              child: Row(
                children: <Widget>[
                  Flexible(
                    child: Text(
                        "Accept Flipper's Seller Agreement and Privacy Policy"),
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
