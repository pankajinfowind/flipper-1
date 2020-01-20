import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';

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
                              fillColor: Colors.yellow,
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
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.red)),
                      color: Colors.red,
                      onPressed: () {},
                      child: null,
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.yellow)),
                      color: Colors.yellow,
                      child: null,
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.brown)),
                      color: Colors.brown,
                      child: null,
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.blue)),
                      color: Colors.blue,
                      child: null,
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.purpleAccent)),
                      color: Colors.purpleAccent,
                      child: null,
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.purple)),
                      color: Colors.purple,
                      child: null,
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.black)),
                      color: Colors.black,
                      child: null,
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(
                    height: 80,
                    width: 120,
                    child: FlatButton(
                      shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.blueAccent)),
                      color: Colors.blueAccent,
                      child: null,
                      onPressed: () {},
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
