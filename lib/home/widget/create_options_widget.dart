import 'package:flipper/model/flipper_color.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/theme.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flipper/util/flitter_color.dart';
import 'package:flutter/material.dart';

class CreateOptionsWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        width: 400,
        height: 200,
        child: Form(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Container(
                width: double.infinity,
                height: 60,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: FlatButton(
                    color: HexColor(FlipperColors.blue),
                    onPressed: () {
                      Router.navigator.pushNamed(Router.addItemScreen);
                    },
                    child: Text(
                      "Create Item",
                      style: AppTheme.createItem,
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  color: Colors.white70,
                  width: double.infinity,
                  child: OutlineButton(
                    onPressed: () {},
                    child: Text(
                      "Create Discount",
                      style: AppTheme.createDiscount,
                    ),
                  ),
                ),
              ),
              Container(
                width: double.infinity,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: FlatButton(
                    child: Text(
                      "Dismiss",
                      style: AppTheme.dismiss,
                    ),
                    onPressed: () {},
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
