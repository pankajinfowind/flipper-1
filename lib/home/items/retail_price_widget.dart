import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class TTForm {
  String price;
  String sku;
  String description;
  String name;
}

class BuildRetailPriceWidget extends StatefulWidget {
  const BuildRetailPriceWidget({
    Key key,
    @required this.vm,
    @required this.context,
  }) : super(key: key);

  final CommonViewModel vm;
  final BuildContext context;

  @override
  _BuildRetailPriceWidgetState createState() => _BuildRetailPriceWidgetState();
}

class _BuildRetailPriceWidgetState extends State<BuildRetailPriceWidget> {
  final TTForm tForm = new TTForm();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        child: TextFormField(
          keyboardType: TextInputType.number,
          style: TextStyle(color: Colors.black),
          onChanged: (retailPrice) async {
            tForm.price = retailPrice;
            ItemTableData item = await widget.vm.database.itemDao
                .getItemBy('tmp', widget.vm.branch.id);

            VariationTableData variation = await widget.vm.database.variationDao
                .getVariationBy('tmp', widget.vm.branch.id);

            StoreProvider.of<AppState>(context).dispatch(
              SaveRegular(
                price: double.parse(retailPrice),
                costPrice: 0,
                itemId: item.id,
                name: variation.name,
              ),
            );
            //on typing here should save Regular Item variation
          },
          decoration: InputDecoration(
              hintText: S.of(context).retailPrice, focusColor: Colors.blue),
        ),
      ),
    );
  }
}
