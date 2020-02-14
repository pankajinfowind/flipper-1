import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/home/widget/create_options_widget.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/flitter_color.dart';
import 'package:flipper/util/logger.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ItemsView extends StatefulWidget {
  const ItemsView({
    Key key,
    @required this.context,
    @required this.data,
    @required this.vm,
  }) : super(key: key);

  final BuildContext context;
  final List<ItemTableData> data;
  final CommonViewModel vm;

  @override
  _ItemsViewState createState() => _ItemsViewState();
}

class _ItemsViewState extends State<ItemsView> {
  List<Widget> getItems(
      List<ItemTableData> itemList, BuildContext context, CommonViewModel vm) {
    List<Widget> list = new List<Widget>();

    list.add(
      ListTile(
        contentPadding: EdgeInsets.all(0),
        leading: Container(
          width: 50,
          color: HexColor(FlipperColors.gray),
          child: IconButton(
            icon: Icon(Icons.star_border),
            color: Colors.white,
            onPressed: () {},
          ),
        ),
        title: Text(
          S.of(context).reedeemRewards,
          style: TextStyle(color: Colors.black),
        ),
      ),
    );

    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].name != "custom") {
        list.add(
          GestureDetector(
            onTap: () {
              StoreProvider.of<AppState>(context).dispatch(
                NeedItemVariation(
                  item: Item(
                    (y) => y
                      ..id = itemList[i].id
                      ..name = itemList[i].name
                      ..branchId = itemList[i].branchId
                      ..unitId = itemList[i].unitId
                      ..categoryId = itemList[i].categoryId,
                  ),
                ),
              );
            },
            onLongPress: () {
              StoreProvider.of<AppState>(context).dispatch(
                NeedItemVariation(
                  item: Item(
                    (y) => y
                      ..id = itemList[i].id
                      ..name = itemList[i].name
                      ..branchId = itemList[i].branchId
                      ..unitId = itemList[i].unitId
                      ..categoryId = itemList[i].categoryId,
                  ),
                ),
              );
            },
            child: ListTile(
                contentPadding: EdgeInsets.fromLTRB(0, 0, 10, 0),
                leading: Container(
                  width: 50,
                  color: HexColor(itemList[i].color),
                  child: FlatButton(
                    child: Text(
                      itemList[i].name.length > 2
                          ? itemList[i].name.substring(0, 2)
                          : itemList[i].name,
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                    onPressed: () {},
                  ),
                ),
                title: Text(
                  itemList[i].name,
                  style: TextStyle(color: Colors.black),
                ),
                trailing: StreamBuilder(
                  stream: vm.database.variationDao
                      .getVariantByItemIdStream(itemList[i].id),
                  builder: (context,
                      AsyncSnapshot<List<VariationTableData>> snapshot) {
                    if (snapshot.data == null) {
                      return Text("");
                    }
                    return snapshot.data.length == 1
                        ? Text(
                            "RWF" + snapshot.data[0].price.toString(),
                            style: TextStyle(color: Colors.black),
                          )
                        : Text(
                            snapshot.data.length.toString() + " Prices",
                            style: TextStyle(color: Colors.black),
                          );
                  },
                )),
          ),
        );
      } else {
        Logger.d("duplicated item${itemList[i].name}");
      }
    }
    list.add(GestureDetector(
      onTap: () {
        //clearn state first
        StoreProvider.of<AppState>(context).dispatch(CleanVariation());
        StoreProvider.of<AppState>(context).dispatch(CleanAppActions());
        StoreProvider.of<AppState>(context).dispatch(CleanCurrentColor());
        //end of cleaning app state.
        showDialog(
            context: context,
            builder: (BuildContext context) {
              return CreateOptionsWidget();
            });
      },
      child: ListTile(
        leading: Icon(Icons.add),
        title: Text(
          S.of(context).createNew,
          style: TextStyle(color: Colors.black),
        ),
      ),
    ));
    return list;
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: ListTile.divideTiles(
        context: context,
        tiles: getItems(widget.data, context, widget.vm),
      ).toList(),
    );
  }
}
