import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flutter/material.dart';

class AllItemScreen extends StatefulWidget {
  AllItemScreen({Key key}) : super(key: key);

  @override
  _AllItemScreenState createState() => _AllItemScreenState();
}

class _AllItemScreenState extends State<AllItemScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CommonAppBar(
          title: S.of(context).items,
          showActionButton: false,
          onPressedCallback: () async {},
          actionButtonName: S.of(context).save,
          icon: Icons.close,
          multi: 1,
          bottomSpacer: 48,
        ),
        body: Column(
          children: <Widget>[
            GestureDetector(
              onTap: () {},
              child: ListTile(
                title: Text("All Items", style: TextStyle(color: Colors.black)),
                trailing: Wrap(
                  children: <Widget>[Icon(Icons.arrow_forward_ios)],
                ),
              ),
            ),
            GestureDetector(
              onTap: () {},
              child: ListTile(
                title:
                    Text("Categories", style: TextStyle(color: Colors.black)),
                trailing: Wrap(
                  children: <Widget>[Icon(Icons.arrow_forward_ios)],
                ),
              ),
            ),
            GestureDetector(
              onTap: () {},
              child: ListTile(
                title: Text("Units", style: TextStyle(color: Colors.black)),
                trailing: Wrap(
                  children: <Widget>[Icon(Icons.arrow_forward_ios)],
                ),
              ),
            )
          ],
        ));
  }
}
