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
        leftSymbol: '\RWF ', decimalSeparator: ".");
    payable.updateValue(0);

    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Container(
          width: 380,
          height: 60,
          color: HexColor(FlipperColors.blue),
          child: StreamBuilder(
            stream: vm.database.cartDao.getCarts(vm.order.id),
            builder: (context, AsyncSnapshot<List<CartTableData>> snapshot) {
              int v = snapshot.data == null
                  ? 0
                  : snapshot.data.fold(0, (a, b) => a + (b.count * b.price));

              payable.updateValue(v.toDouble());
              return Row(
                children: <Widget>[
                  SizedBox(width: 10),
                  // SizedBox(
                  //   height: 120,
                  //   child: FlatButton(
                  //     color: HexColor(FlipperColors.blue),
                  //     onPressed: () {},
                  //     child: Text(
                  //       "Tickets",
                  //       style: TextStyle(
                  //         color: Colors.white,
                  //         fontSize: 20,
                  //       ),
                  //     ),
                  //   ),
                  // ),
                  SizedBox(width: 70),
                  //todo: on crick of the charge should record active order as status=completed,
                  //todo: clean carts so it does not appear
                  SizedBox(
                    height: 120,
                    child: FlatButton(
                        color: HexColor(FlipperColors.blue),
                        onPressed: () {
                          StoreProvider.of<AppState>(context).dispatch(
                            SavePayment(
                              note: "note",
                              cashReceived: 0,
                            ),
                          );
                        },
                        child: Row(
                          children: <Widget>[
                            Text(
                              "Charge",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 28,
                              ),
                            ),
                            SizedBox(
                              width: 20,
                            ),
                            Text(
                              payable.text,
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                              ),
                            )
                          ],
                        )),
                  )
                ],
              );
            },
          ),
        );
      },
    );
  }
}
