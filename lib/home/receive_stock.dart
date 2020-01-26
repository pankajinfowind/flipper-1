import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class ReceiveStock extends StatefulWidget {
  ReceiveStock({Key key}) : super(key: key);

  @override
  _ReceiveStockState createState() => _ReceiveStockState();
}

class _ReceiveStockState extends State<ReceiveStock> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: "Receive stock",
            showActionButton: true,
            actionButtonName: S.of(context).save,
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: Container(
            child:
                Text("yeah receive it. ensure you do have the variation id."),
          ),
        );
      },
    );
  }
}
