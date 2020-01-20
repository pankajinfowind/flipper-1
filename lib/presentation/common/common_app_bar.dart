import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/theme.dart';
import "package:flutter/material.dart";
import "package:flutter/widgets.dart";

class CommonAppBar extends StatelessWidget implements PreferredSizeWidget {
  showTour(BuildContext context) async {
    OverlayState overlayState = Overlay.of(context);
    OverlayEntry overlayEntry = OverlayEntry(
        builder: (context) => Material(
              type: MaterialType.transparency,
              child: Center(
                  // Aligns the container to center
                  child: Container(
                // A simplified version of dialog.
                width: 100.0,
                height: 56.0,
                color: Colors.green,
                child: Text('aurole'),
              )),
            ));
    overlayState.insert(overlayEntry);
    await Future.delayed(Duration(seconds: 5));
    overlayEntry.remove();
  }

  @Deprecated("_action will be removed soon")
  final Widget _additionalText;
  final Widget _actionButton;
  @Deprecated("_leftAction will be removed soon")
  final Widget _leftAction;
  final String _title;
  @Deprecated("_subtitle will be removed soon")
  final String _subtitle;
  @Deprecated("_actionTitle will be removed soon")
  final String _actionTitle;
  final IconData _icon;
  final double _headerMultiplier;
  @Deprecated("_positioningActionButton will be removed soon")
  final double _positioningActionButton;
  @Deprecated("_bottomSpacer will be removed soon")
  final double _bottomSpacer;

  const CommonAppBar({
    Widget action,
    Widget actionButton,
    Widget leftAction,
    @required String title,
    String subtitle,
    String actionTitle,
    IconData icon,
    double multi,
    double positioningActionButton,
    double bottomSpacer,
    Key key,
  })  : _additionalText = action,
        _actionButton = actionButton,
        _leftAction = leftAction,
        _title = title,
        _subtitle = subtitle,
        _actionTitle = actionTitle,
        _icon = icon,
        _headerMultiplier = multi,
        _positioningActionButton = positioningActionButton,
        _bottomSpacer = bottomSpacer,
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        top: true,
        child: Container(
          height: _bottomSpacer,
          child: Column(
            children: <Widget>[
              ListTile(
                contentPadding: EdgeInsets.symmetric(horizontal: 0.5),
                leading: GestureDetector(
                  onTap: () {
                    //assume that this button always closes the current page!
                    Router.navigator.pop();
                  },
                  child: Icon(
                    _icon ?? Icons.close,
                    size: 30,
                  ),
                ),
                title: _title == null
                    ? Text("")
                    : Text(
                        _title,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(color: Colors.black),
                      ),
                trailing: _actionButton == null
                    ? Text("")
                    : SizedBox(
                        height: 52,
                        child: Container(
                          color: Colors.blue,
                          child: _actionButton,
                        ),
                      ),
                dense: true,
              ),
              Container(
                child: _additionalText,
              ),
              Expanded(
                child: Divider(
                  color: Colors
                      .black, //TODO: tweak this divider so it can be visible
                ),
              )
            ],
          ),
        ));
  }

  @override
  Size get preferredSize => Size.fromHeight(AppTheme.appBarSize *
      (_headerMultiplier == null ? 0.8 : _headerMultiplier));
}
