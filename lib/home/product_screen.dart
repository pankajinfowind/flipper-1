import 'package:flipper/home/widget/create_options_widget.dart';
import 'package:flipper/presentation/widgets/payable_widget.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/validators.dart';
import 'package:flutter/material.dart';

class ProductScreen extends StatefulWidget {
  ProductScreen({Key key}) : super(key: key);
  @override
  _ProductScreenState createState() => _ProductScreenState();
}

List<Widget> getItems(List<int> itemList) {
  List<Widget> list = new List<Widget>();
  for (var i = 0; i < itemList.length; i++) {
    list.add(ListTile(
      title: Text(
        'Sun'+ i.toString(),
        style: TextStyle(color: Colors.black),
      ),
    ));
  }
  return list;
}

class _ProductScreenState extends State<ProductScreen> {
  Widget _myListView(BuildContext context) {
    final defaults = [1,2,3,4,5,6,7,8,10];
    return ListView(
      children: ListTile.divideTiles(
        context: context,
        tiles:getItems(defaults),
      ).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: <Widget>[

        Align(
          child: PayableWidget(),
        ),
        Center(
          child: Form(
            child: Column(
              children: <Widget>[
                TextFormField(
                  style: TextStyle(color: Colors.black),
                  validator: Validators.isStringHasMoreChars,
                  onSaved: (name) {

                  },
                  decoration: InputDecoration(
                      hintText: "Search..",
                      focusColor: Colors.blue),
                )
              ],
            ),
          ),
        ),
        Expanded(
          child: _myListView(context),
        ),
        GestureDetector(
          onTap: (){
            showDialog(context: context,builder: (BuildContext context){
              return CreateOptionsWidget();
            });
          },
          child: ListTile(
            leading: Icon(Icons.add),
            title: Text('Create new',style: TextStyle(color: Colors.black),),
          ),
        )
      ],
    ));
  }
}
