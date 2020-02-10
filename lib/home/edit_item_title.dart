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
  bool showCheck_1 = false;
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
                children: <Widget>[
                  //todo: apply this to other part if it does work
                  Stack(
                    fit: StackFit.expand,
                    alignment: Alignment.center,
                    children: <Widget>[
                      //on click of this SizedBox set the view check to true so we can show check from this stack
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            showCheck_1 = !showCheck_1;
                          });
                        },
                        child: SizedBox(
                          height: 80,
                          width: 120,
                          child: FlatButton(
                            shape: RoundedRectangleBorder(
                              side: BorderSide(
                                color: HexColor("#0984e3"),
                              ),
                            ),
                            color: HexColor("#0984e3"),
                            onPressed: () {
                              StoreProvider.of<AppState>(context).dispatch(
                                CurrentColor(
                                  color: FlipperColor(
                                      (c) => c..hexCode = "#0984e3"),
                                ),
                              );
                            },
                            child: null,
                          ),
                        ),
                      ),
                      showCheck_1
                          ? IconButton(
                              icon: Icon(Icons.check),
                              onPressed: () {},
                            )
                          : Container()
                    ],
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#d63031"))),
                      color: HexColor("#d63031"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#d63031")));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#e84393"))),
                      color: HexColor("#e84393"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#e84393")));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#2d3436"))),
                      color: HexColor("#2d3436"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#2d3436")));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#6c5ce7"))),
                      color: HexColor("#6c5ce7"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#6c5ce7")));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#74b9ff"))),
                      color: HexColor("#74b9ff"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#74b9ff")));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#ff7675"))),
                      color: HexColor("#ff7675"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#ff7675")));
                      },
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: HexColor("#a29bfe"))),
                      color: HexColor("#a29bfe"),
                      child: null,
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                            CurrentColor(
                                color: FlipperColor(
                                    (c) => c..hexCode = "#a29bfe")));
                      },
                    ),
                  ),
                ],
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
}
