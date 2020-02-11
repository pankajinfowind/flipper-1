import 'dart:math';

import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/flipper_color.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class EditItemTitle extends StatefulWidget {
  EditItemTitle({Key key}) : super(key: key);

  @override
  _EditItemTitleState createState() => _EditItemTitleState();
}

class _EditItemTitleState extends State<EditItemTitle> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        title: "Edit item Tile",
        icon: Icons.keyboard_backspace,
        multi: 3,
        bottomSpacer: 52,
      ),
      body: Wrap(
        children: <Widget>[
          Align(
            alignment: Alignment.center,
            child: Column(
              children: <Widget>[
                SizedBox(
                  height: 10,
                ),
                GestureDetector(
                  onTap: () {},
                  child: Column(
                    children: <Widget>[
                      Container(
                        width: 80,
                        height: 80,
                        child: Theme(
                          data: Theme.of(context)
                              .copyWith(splashColor: Colors.transparent),
                          child: TextField(
                            maxLines: 4,
                            autofocus: false,
                            style: TextStyle(
                                fontSize: 22.0, color: Color(0xFFbdc6cf)),
                            decoration: InputDecoration(
                              filled: true,
                              fillColor: HexColor("#0984e3"),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.white),
                              ),
                              enabledBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Colors.white),
                              ),
                            ),
                          ),
                        ),
                      ),
                      Text("New Item")
                    ],
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(28.0, 0, 0, 28.0),
            child: Align(
              alignment: Alignment.topLeft,
              child: Text("CHOOSE LABEL COLOR"),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(32.0, 0, 0, 32.0),
            child: Align(
              alignment: Alignment.topLeft,
              child: Wrap(
                children: buildStack(context),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(28.0, 0, 0, 28.0),
            child: Align(
              alignment: Alignment.topLeft,
              child: Text("PHOTO LABEL"),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(28.0, 0, 0, 28.0),
            child: Align(
              alignment: Alignment.topLeft,
              child: Row(
                children: <Widget>[
                  SizedBox(
                    height: 50,
                    width: 180,
                    child: FlatButton(
                      color: HexColor("#ecf0f1"),
                      child: Text("Choose Photo"),
                      onPressed: () {},
                    ),
                  ),
                  Container(
                    width: 10,
                  ),
                  SizedBox(
                    height: 50,
                    width: 180,
                    child: FlatButton(
                      color: HexColor("#ecf0f1"),
                      child: Text("Take Photo"),
                      onPressed: () {
                        Router.navigator.pushNamed(Router.takePictureScreen);
                      },
                    ),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  List<Widget> buildStack(BuildContext context) {
    List<Widget> stacks = new List<Widget>();
    List<String> colors = [
      "#d63031",
      "#0984e3",
      "#e84393",
      "#2d3436",
      "#6c5ce7",
      "#74b9ff",
      "#ff7675",
      "#a29bfe"
    ];

    for (var i = 0; i < 8; i++) {
      //register a store for each and handle them later.
      stacks.add(
        Stack(
          alignment: Alignment.center,
          children: <Widget>[
            Container(
              height: 80,
              width: 120,
              child: FlatButton(
                shape: RoundedRectangleBorder(
                  side: BorderSide(
                    color: HexColor(colors[i]),
                  ),
                ),
                color: HexColor(colors[i]),
                child: null,
                onPressed: () {
                  StoreProvider.of<AppState>(context).dispatch(
                    CurrentColor(
                      color: FlipperColor((c) => c..hexCode = colors[i]),
                    ),
                  );
                },
              ),
            ),
            true
                ? IconButton(
                    alignment: Alignment.center,
                    icon: Icon(Icons.check),
                    color: Colors.white,
                    onPressed: () {
                      StoreProvider.of<AppState>(context).dispatch(
                        CurrentColor(
                          color: FlipperColor((c) => c..hexCode = colors[i]),
                        ),
                      );
                    },
                  )
                : Visibility(
                    visible: false,
                    child: Text(""),
                  )
          ],
        ),
      );
    }

    return stacks;
  }
}
