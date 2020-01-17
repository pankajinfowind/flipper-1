import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/theme.dart';
import 'package:flipper/util/HexColor.dart';
import "package:flutter/material.dart";
import "package:flutter_redux/flutter_redux.dart";

class BusinessList extends StatefulWidget {
//  final Function(DrawerState) stateChangeCallback;
  final CommonViewModel vm;
  const BusinessList({Key key, this.vm}) : super(key: key);

  @override
  _BusinessListState createState() => _BusinessListState();
}

class _BusinessListState extends State<BusinessList> {
  bool _calendarSelected = false;

  _buildFirstSectionFlipperLogo(BuildContext context) {
    return Container(
        height: _Style.firstSectionHeight,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Container(
                child: Row(children: <Widget>[
              ..._buildSelectionHighlight(_calendarSelected, Colors.white),
              _selectableListItem(
                  icon: Image.asset("assets/graphics/drawer/events.png"),
                  isSquareShape: _calendarSelected,
                  action: () {
                    setState(() {
                      _calendarSelected = true;
                    });
                  }),
            ])),
            Padding(
              padding: EdgeInsets.only(
                top: _Style.padding,
              ),
            ),
            Container(
              color: AppTheme.colorDarkGreen,
              height: _Style.separatorHeight,
              width: _Style.separatorWidth,
            ),
          ],
        ));
  }

  _buildThirdSection(BuildContext context) {
    return Container(
        height: _Style.thirdSectionHeight,
        child: Column(
          children: <Widget>[
            _Style.defaultPadding,
            _GroupSettingsButton(
                Image.asset("assets/graphics/drawer/create_topic.png"), () {
              //TODO: fix overflow when loading more than 7 businesses for now we are not alloing user to create more than2 business
              if (widget.vm.businesses.length >= 3) {
                //TODO:show a toast here that we can not create additional business...
                return;
              }
              Router.navigator.pushNamed(Router.createBusiness);
            }),
          ],
        ));
  }

  _buildFourthSection(BuildContext context) {
    return Container(
      height: _Style.fourthSectionHeight,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          _Style.defaultPadding,
          _GroupSettingsButton(
            Image.asset("assets/graphics/drawer/account.png"),
            () {
              _openUserAccount(context);
            },
          ),
          _Style.defaultPadding,
        ],
      ),
    );
  }

  _buildSecondSectionBusinessList(BuildContext context,
      {onClick: true, hasNotification: true, data}) {
    return Container(
      height: _Style.itemHeight,
      child: Padding(
        padding:
            const EdgeInsets.only(top: _Style.padding, right: _Style.padding),
        child: _GroupButton(data, (id) {
          //todo: set the business as highlighted on first creation
          //todo: on auth set highlighted business in store.
          //todo: reset other highlighted business and set this one with the ID.
        }, onClick, hasNotification),
      ),
    );
  }

  Widget getRenderableBusinessList(List<Business> businesses) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < businesses.length; i++) {
      list.add(_buildSecondSectionBusinessList(context,
          onClick: false, data: businesses[i]));
    }
    return Expanded(
      child: Column(children: list),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: HexColor("#130f1f"),
      child: Column(
        children: <Widget>[
          _buildFirstSectionFlipperLogo(context),
          getRenderableBusinessList(widget.vm.businesses),
          //setting on click set highlight on side.
          _buildThirdSection(context),
          _buildFourthSection(context)
        ],
      ),
    );
  }

  void _openUserAccount(BuildContext context) {
    final uid = StoreProvider.of<AppState>(context).state.user.id;
    //FIXME: should use Router.navigator.pushNamed(Router.dashboard); to navigate ASAP;
//    Navigator.of(context).pushNamed(Routes.user, arguments: uid);
  }
}

class _GroupSettingsButton extends StatelessWidget {
  final Image image;
  final Function onPressed;

  const _GroupSettingsButton(
    this.image,
    this.onPressed, {
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: _Style.circleButtonWidth,
        height: _Style.circleButtonWidth,
        child: FittedBox(
            fit: BoxFit.cover,
            child: FlatButton(
              shape: CircleBorder(),
              child: image,
              onPressed: onPressed,
            )));
  }
}

class _GroupButton extends StatelessWidget {
  final Business business;
  final Function(int) onPressedCircle;
  final bool isSquareShape;
  final bool hasUpdates;

  const _GroupButton(
    this.business,
    this.onPressedCircle,
    this.isSquareShape,
    this.hasUpdates, {
    Key key,
  })  : assert(business != null),
        assert(onPressedCircle != null),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    final _circleColor =
        HexColor(business.hexColor); //TODO: make this color comes from setting in v.2
    final _groupText = business.abbreviation.toUpperCase();

    return Container(
      child: Row(
        children: <Widget>[
          ..._buildSelectionHighlight(isSquareShape, _circleColor),
          _selectableListItem(
            color: _circleColor,
            text: _groupText,
            action: () {
              onPressedCircle(business.id);
            },
            updateIndicatorVisible: hasUpdates,
            isSquareShape: true, //set to true by default
          ),
        ],
      ),
    );
  }
}

_selectableListItem({
  Color color = Colors.white,
  String text = "",
  Image icon,
  Function action,
  bool updateIndicatorVisible = false,
  bool isSquareShape = false,
}) {
  return AnimatedContainer(
    duration: Duration(milliseconds: 100),
    width: _Style.circleButtonWidth,
    height: _Style.circleButtonWidth,
    decoration: BoxDecoration(
      color: color,
      borderRadius:
          BorderRadius.all(Radius.circular(isSquareShape ? 8.0 : 22.0)),
    ),
    child: Stack(
      overflow: Overflow.visible,
      children: <Widget>[
        InkWell(
          child: Center(
              child: Container(
            alignment: Alignment(0, 0.2),
            width: _Style.circleButtonWidth,
            height: _Style.circleButtonWidth,
            child: icon == null
                ? Text(text, style: AppTheme.circleMenuAbbreviationText)
                : icon,
          )),
          onTap: action,
        ),
        Visibility(
          visible: updateIndicatorVisible,
          child: Positioned(
            top: -2,
            right: -2,
            height: _Style.circleUnreadIndicatorWidth,
            width: _Style.circleUnreadIndicatorWidth,
            child: Image.asset(
              "assets/graphics/update_indicator_darkgreen.png",
            ),
          ),
        ),
      ],
    ),
  );
}

List<Widget> _buildSelectionHighlight(isSelected, circleColor) {
  final List<Widget> widgets = [];
  if (isSelected) {
    final highlight = ClipRRect(
        borderRadius: BorderRadius.only(
            topRight: Radius.circular(_Style.circleHighlightBorderRadius),
            bottomRight: Radius.circular(_Style.circleHighlightBorderRadius)),
        child: Container(
          width: _Style.circleHighlightWidth,
          height: _Style.circleButtonWidth,
          color: circleColor,
        ));
    widgets.add(highlight);
  }

  final sizedBoxSpace = SizedBox(
    width: (isSelected ? 11 : 15),
  );

  widgets.add(sizedBoxSpace);
  return widgets;
}

class _Style {
  static const listWidth = 72.0;
  static const circleButtonWidth = 44.0;

  static const circleHighlightWidth = 4.0;
  static const circleHighlightBorderRadius = 10.0;
  static const circleUnreadIndicatorWidth = 14.0;

  static const separatorHeight = 2.0;
  static const separatorWidth = 48.0;
  static const padding = 8.0;
  static const defaultPadding = Padding(padding: EdgeInsets.only(top: padding));

  static const itemHeight = 52.0;
  static const firstSectionHeight = 100.0;
  static const thirdSectionHeight = 60.0;
  static const fourthSectionHeight = 180.0;
  static const totalStaticSectionHeight =
      340.0; // Sum of all sections without itemHeight
}
