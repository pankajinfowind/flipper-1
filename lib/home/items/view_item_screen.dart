import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
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
          body: Text("can view Items"),
        );
      },
    );
  }
}
