import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LandingPage extends StatefulWidget{

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _LandingPage();
  }
}

class _LandingPage extends State<LandingPage>{
  int number = 0;
  final TextEditingController _textnumber = TextEditingController();
   int initialValue = 0;

  Widget _uppderPart(){
    return Material(
      // first column
    );
  }

  Widget _btnAddition(){
    return RaisedButton(
      onPressed: (){
        print(initialValue = initialValue+1);
      },
    );
  }

  @override
  Widget build(BuildContext context){
    return Container(
      color: Colors.purpleAccent,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _uppderPart(),
            _btnAddition()

          ],
        ),
    );
  }
}