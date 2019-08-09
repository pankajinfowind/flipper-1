import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Cart extends StatefulWidget {
  @override
  _CartState createState() => _CartState();
}

class _CartState extends State<Cart> {
  static final TextEditingController _textController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _textController.text = "1";
  }

  @override
  Widget build(BuildContext context) {
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
                    height: 40,
                    child: TextField(
                      autofocus: true,
                      controller: _textController,
                      decoration: InputDecoration(
                        fillColor: Colors.white,
                        labelText: 'Qty',
                        filled: true,
                        border: OutlineInputBorder(),
                      ),
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
