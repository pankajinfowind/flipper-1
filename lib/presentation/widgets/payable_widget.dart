import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_actions/actions.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/flitter_color.dart';
import 'package:flutter/material.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';
import 'package:flutter_redux/flutter_redux.dart';

class PayableWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var payable = new MoneyMaskedTextController(
        leftSymbol: '\RWF ', decimalSeparator: ".", thousandSeparator: ",");
    payable.updateValue(0);

    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Container(
          height: 66,
          color: HexColor(FlipperColors.blue),
          child: StreamBuilder(
            stream: vm.database.cartDao.getCarts(vm.order.id),
            builder: (context, AsyncSnapshot<List<CartTableData>> snapshot) {
              int cashReceived = snapshot.data == null
                  ? 0
                  : snapshot.data.fold(0, (a, b) => a + (b.count * b.price));

              payable.updateValue(cashReceived.toDouble());
              return Row(
                children: <Widget>[
                  FlatButton(
                      color: HexColor(FlipperColors.blue),
                      onPressed: () {
                        StoreProvider.of<AppState>(context).dispatch(
                          SavePayment(
                            note: "note",
                            cashReceived: cashReceived,
                          ),
                        );
                      },
                      child: Row(
                        children: <Widget>[
                          Padding(
                            padding: EdgeInsets.fromLTRB(85, 0, 0, 0),
                            child: Row(
                              children: <Widget>[
                                Text(
                                  "Charge  ",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 28,
                                  ),
                                ),
                                Text(
                                  payable.text,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20,
                                  ),
                                )
                              ],
                            ),
                          )
                        ],
                      ))
                ],
              );
            },
          ),
        );
      },
    );
  }
}
