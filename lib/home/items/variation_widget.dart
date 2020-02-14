import 'package:flipper/data/main_database.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';

class VariationWidget extends StatefulWidget {
  const VariationWidget({
    Key key,
    @required this.variation,
    @required this.context,
  }) : super(key: key);

  final VariationTableData variation;
  final BuildContext context;

  @override
  _VariationWidgetState createState() => _VariationWidgetState();
}

class _VariationWidgetState extends State<VariationWidget> {
  @override
  Widget build(BuildContext context) {
    return ListView(children: <Widget>[
      ListTile(
        leading: Icon(
          Icons.dehaze,
        ),
        subtitle:
            Text("${widget.variation.name} \nRWF ${widget.variation.price}"),
        trailing: Row(mainAxisSize: MainAxisSize.min, children: <Widget>[
          FlatButton(
            child: Text(
              widget.variation.count == 0
                  ? S.of(context).receiveStock
                  : widget.variation.count.toString() + S.of(context).inStock,
            ),
            onPressed: () {
              Router.navigator.pushNamed(Router.receiveStock,
                  arguments: widget.variation.id);
            },
          )
        ]),
        dense: true,
      )
    ]);
  }
}
