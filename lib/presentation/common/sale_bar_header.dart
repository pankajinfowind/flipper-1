import 'package:flipper/theme.dart';
import 'package:flutter/material.dart';

class SaleBarHeader extends StatelessWidget implements PreferredSizeWidget {
  final Widget _action;
  final Widget _leftAction;
  final String _title;
  final String _subtitle;

  const SaleBarHeader({
    Widget action,
    Widget leftAction,
    @required String title,
    String subtitle,
    Key key,
  })  : _action = action,
        _leftAction = leftAction,
        _title = title,
        _subtitle = subtitle,
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Container(
        height: 180,
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              offset: Offset(0.0, 1.0),
            )
          ],
        ),
        child: Stack(
          children: <Widget>[
            Positioned(
              top: 20,
              child: Visibility(
                visible: _leftAction == null,
                child: Container(
                  // Minimum size of a flat button
                  child: Row(
                    children: <Widget>[
                      SizedBox(
                        height: 20,
                      ),
                      IconButton(
                          icon: Icon(Icons.close),
                          iconSize: 40,
                          onPressed: () {
                            Navigator.of(context).pop();
                          }),
                      SizedBox(
                        child: FlatButton(
                          child: Text(
                            _title,
                            textAlign: TextAlign.center,
                            overflow: TextOverflow.ellipsis,
                            style: _subtitle == null
                                ? AppTheme.headerBarSale
                                : AppTheme.headerBarSale,
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 160,
                        height: 60,
                      ),
                      //TODO: merge this sale_bar_header with add_note_bar_header as the only uncommon thing is the bellow line.
                      SizedBox(
                        height: 52,
                        child: Container(
                            color: Colors.blue,
                            child: FlatButton(
                              child: Text(
                                "Done",
                                textAlign: TextAlign.center,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(color: Colors.white),
                              ),
                            )),
                      ),
                    ],
                  ),
                ),
                replacement: _leftAction ?? SizedBox.shrink(),
              ),
            ),
            Container(
              width: 200.0, // Minimum size of a flat button
              child: _action,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(AppTheme.appBarSize * 0.8);
}
