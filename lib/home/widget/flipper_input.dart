import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class FlipperInput extends StatelessWidget {
  final String _hint;
  final String validationMessage;
  const FlipperInput({
    String hint,
    this.validationMessage,
    Key key,
  })  : _hint = hint,
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Padding(
          padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
          child: Container(
            width: 300,
            child: TextFormField(
              style: TextStyle(color: Colors.black),
              autofocus: true,
              validator: (value) {
                if (value.isEmpty) {
                  return this.validationMessage;
                }
                return null;
              },
              onChanged: (note) {
                // vm.order.id
                vm.database.orderDao.updateOrder(
                  OrderTableData(
                    branchId: vm.order.branchId,
                    id: vm.order.id,
                    status: vm.order.status,
                    userId: vm.order.userId,
                    cashReceived: vm.order.cashReceived,
                    customerChangeDue: vm.order.customerChangeDue,
                    customerSaving: vm.order.customerSaving,
                    deliverDate: vm.order.deliverDate,
                    discountAmount: vm.order.discountAmount,
                    discountRate: vm.order.discountRate,
                    orderNote: note,
                    orderNUmber: vm.order.orderNUmber,
                    paymentId: vm.order.paymentId,
                    saleTotal: vm.order.saleTotal,
                    subTotal: vm.order.subTotal,
                    supplierId: vm.order.supplierId,
                    supplierInvoiceNumber: vm.order.supplierInvoiceNumber,
                    taxAmount: vm.order.taxAmount,
                    taxRate: vm.order.taxRate,
                  ),
                );
              },
              decoration: InputDecoration(hintText: _hint ?? ""),
            ),
          ),
        );
      },
    );
  }
}
