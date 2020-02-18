import 'package:flipper/data/main_database.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';

class VariationWidget extends StatefulWidget {
  const VariationWidget(
      {Key key,
      @required this.variation,
      @required this.context,
      @required this.vm})
      : super(key: key);

  final VariationTableData variation;
  final BuildContext context;
  final CommonViewModel vm;

  @override
  _VariationWidgetState createState() => _VariationWidgetState();
}

class _VariationWidgetState extends State<VariationWidget> {
  @override
  Widget build(BuildContext context) {
    return ListView(children: <Widget>[
      GestureDetector(
        onTap: () {
          Router.navigator.pushNamed(
            Router.editVariationScreen,
            arguments: EditVariationScreenArguments(
                variationId: widget.variation.id, unitId: 1),
          );
        },
        child: StreamBuilder(
            stream: widget.vm.database.stockDao.getStockByVariantByItemIdStream(
                branchId: widget.vm.branch.id, itemId: widget.variation.id),
            builder: (context, AsyncSnapshot<List<StockTableData>> snapshot) {
              if (snapshot.data == null) {
                return Text("");
              }
              return ListTile(
                leading: Icon(
                  Icons.dehaze,
                ),
                subtitle: Text("${snapshot.data[0].retailPrice} \nRWF"),
                trailing:
                    Row(mainAxisSize: MainAxisSize.min, children: <Widget>[
                  FlatButton(
                    child: Text(
                      snapshot.data.length == 0
                          ? S.of(context).receiveStock
                          : snapshot.data[0].currentStock.toString() +
                              S.of(context).inStock,
                    ),
                    onPressed: () {},
                  )
                ]),
                dense: true,
              );
            }),
      )
    ]);
  }
}
