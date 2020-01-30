import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class EditQuantityItemScreen extends StatefulWidget {
  final Item item;
  EditQuantityItemScreen({Key key, this.item}) : super(key: key);

  @override
  _EditQuantityItemScreenState createState() => _EditQuantityItemScreenState();
}

class _EditQuantityItemScreenState extends State<EditQuantityItemScreen> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            disableButton: false,
            showActionButton: true,
            actionButtonName: S.of(context).add,
            title: widget.item.name + " 200 RWF",
            onPressedCallback: () {
              //todo: go ahead and insert the new quantity to a sale.
            },
          ),
          body: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Text(S.of(context).quantity),
              ),
              ListTile(
                dense: true,
                title: Center(
                  child: Container(
                    width: 40,
                    child: TextFormField(
                      keyboardType: TextInputType.number,
                      textAlign: TextAlign.center,
                      initialValue: "1",
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                ),
                leading: IconButton(
                  icon: Icon(Icons.add),
                  onPressed: () {},
                ),
                trailing: IconButton(
                  icon: Icon(Icons.remove),
                  onPressed: () {},
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Text(S.of(context).notes),
              ),
              Container(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child:
                    Text("Description here should come from item object too."),
              )
            ],
          ),
        );
      },
    );
  }
}
