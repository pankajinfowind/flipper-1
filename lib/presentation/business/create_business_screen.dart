import 'package:flipper/presentation/common/add_note_bar_header.dart';
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
        positioningActionButton: 265.8,
        actionTitle: "Sign Up",
      ),
      backgroundColor: Colors.white,
      body: Center(
        child: Text("We got it center"),
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
