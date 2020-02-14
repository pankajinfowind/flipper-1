import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/home/widget/create_options_widget.dart';
import 'package:flipper/model/item.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
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
    @required this.showCreateItemOnTop,
    @required this.createButtonName,
    @required this.shouldSeeItem,
  }) : super(key: key);

  final BuildContext context;
  final List<ItemTableData> data;
  final CommonViewModel vm;
  final bool showCreateItemOnTop;
  final String createButtonName;
  final bool shouldSeeItem;

  @override
  _ItemsViewState createState() => _ItemsViewState();
}

class _ItemsViewState extends State<ItemsView> {
  List<Widget> getItems(
      List<ItemTableData> itemList, BuildContext context, CommonViewModel vm) {
    List<Widget> list = new List<Widget>();

    if (widget.showCreateItemOnTop) {
      addItemRow(list, context, widget.createButtonName);
    }
    if (!widget.showCreateItemOnTop) {
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
    }
    ;

    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].name != "custom") {
        list.add(
          GestureDetector(
            onTap: () {
              if (widget.shouldSeeItem) {
                Router.navigator.pushNamed(Router.viewSingleItem,
                    arguments: ViewItemScreenArguments(
                        itemId: itemList[i].id, itemName: itemList[i].name));
              } else {
                dispatchNeedItemVariation(context, itemList, i);
              }
            },
            onLongPress: () {
              if (widget.shouldSeeItem) {
                Router.navigator.pushNamed(Router.viewSingleItem,
                    arguments: ViewItemScreenArguments(
                        itemId: itemList[i].id, itemName: itemList[i].name));
              } else {
                dispatchNeedItemVariation(context, itemList, i);
              }
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
    if (!widget.showCreateItemOnTop) {
      addItemRow(list, context, widget.createButtonName);
    }
    ;
    return list;
  }

  void dispatchNeedItemVariation(
      BuildContext context, List<ItemTableData> itemList, int i) {
    return StoreProvider.of<AppState>(context).dispatch(
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
  }

  void addItemRow(
      List<Widget> list, BuildContext context, String createButtonName) {
    return list.add(
      GestureDetector(
        onTap: () {
          //clearn state first
          StoreProvider.of<AppState>(context).dispatch(CleanVariation());
          StoreProvider.of<AppState>(context).dispatch(CleanAppActions());
          StoreProvider.of<AppState>(context).dispatch(CleanCurrentColor());

          showDialog(
              context: context,
              builder: (BuildContext context) {
                return CreateOptionsWidget();
              });
        },
        child: ListTile(
          leading: Icon(Icons.add),
          title: Text(
            createButtonName,
            style: TextStyle(color: Colors.black),
          ),
        ),
      ),
    );
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
