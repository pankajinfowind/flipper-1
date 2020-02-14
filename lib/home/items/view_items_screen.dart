import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/home/items/item_view_widget.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ViewItemsScreen extends StatefulWidget {
  ViewItemsScreen({Key key}) : super(key: key);

  @override
  _ViewItemsScreenState createState() => _ViewItemsScreenState();
}

class _ViewItemsScreenState extends State<ViewItemsScreen> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: S.of(context).allItems,
            showActionButton: false,
            onPressedCallback: () async {},
            icon: Icons.close,
            multi: 1,
            bottomSpacer: 48,
          ),
          body: Column(
            children: <Widget>[
              Expanded(
                child: StreamBuilder(
                  stream: vm.database.itemDao.getItemsStream(),
                  builder:
                      (context, AsyncSnapshot<List<ItemTableData>> snapshot) {
                    if (snapshot.data == null) {
                      return Text("");
                    }
                    return ItemsView(
                      context: context,
                      shouldSeeItem: true,
                      data: snapshot.data,
                      vm: vm,
                      showCreateItemOnTop: true,
                      createButtonName: S.of(context).createItem,
                    );
                  },
                ),
              )
            ],
          ),
        );
      },
    );
  }
}
