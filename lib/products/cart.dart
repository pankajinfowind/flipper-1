import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Cart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title: Text("POS"),
      ),
      body: Container(
        child: Card(
          child: Column(
            children: [
              Row(
                children: <Widget>[
                  SizedBox(width: 20),
                  SizedBox(
                    width: 100,
                    child: FlatButton(
                      color: Colors.blue[500],
                      child: Center(
                        child: Text(
                          "+",
                          textAlign: TextAlign.center,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(width: 30),
                  SizedBox(
                    width: 100,
                    child: FlatButton(
                      color: Colors.blue[500],
                      child: Center(
                        child: Text(
                          "10",
                          textAlign: TextAlign.center,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(width: 40),
                  SizedBox(
                    width: 100,
                    child: FlatButton(
                      color: Colors.blue[500],
                      child: Center(
                        child: Text(
                          "-",
                          textAlign: TextAlign.center,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  )
                ],
              ),
              Divider(),
              Row(
                children: <Widget>[
                  SizedBox(width: 20),
                  SizedBox(
                    width: 100,
                    child: FlatButton(
                      color: Colors.blue[500],
                      child: Center(
                        child: Text(
                          "+",
                          textAlign: TextAlign.center,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(width: 30),
                  SizedBox(
                    width: 100,
                    child: FlatButton(
                      color: Colors.blue[500],
                      child: Center(
                        child: Text(
                          "10",
                          textAlign: TextAlign.center,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  ),
                  SizedBox(width: 40),
                  SizedBox(
                    width: 100,
                    child: FlatButton(
                      color: Colors.blue[500],
                      child: Center(
                        child: Text(
                          "-",
                          textAlign: TextAlign.center,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
