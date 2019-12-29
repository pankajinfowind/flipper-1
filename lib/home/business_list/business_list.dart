import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/theme.dart';
import 'package:flipper/util/HexColor.dart';
import "package:flutter/material.dart";
import "package:flutter_redux/flutter_redux.dart";

import '../../routes.dart';

class BusinessList extends StatefulWidget {
//  final Function(DrawerState) stateChangeCallback;

  const BusinessList();

  @override
  _BusinessListState createState() => _BusinessListState();
}

class _BusinessListState extends State<BusinessList> {
  bool _calendarSelected = false;

  //TODO: replace dummy data with real data from source!
  Business dummyBusiness = Business((c) => c
    ..id = 1
    ..name = "B"
    ..hexColor = "#f5a623" //orange
    ..image = "image"
    ..abbreviation = "Yegobox"
    ..type = BusinessType.NORMAL);

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
                Image.asset("assets/graphics/drawer/create_topic.png"), () {}),
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
      {onClick: true, hasNotification: true}) {
    return Container(
      height: _Style.itemHeight,
      child: Padding(
        padding:
            const EdgeInsets.only(top: _Style.padding, right: _Style.padding),
        child: _GroupButton(dummyBusiness, (id) {}, onClick, hasNotification),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: HexColor("#130f1f"),
      child: Column(
        children: <Widget>[
          _buildFirstSectionFlipperLogo(context),
//         TODO: start simulating more business loaded.
          _buildSecondSectionBusinessList(context),
          //setting on click set highlight on side.
          _buildSecondSectionBusinessList(context, onClick: false),
          _buildSecondSectionBusinessList(context, onClick: false),
          _buildSecondSectionBusinessList(context, onClick: false),
          _buildSecondSectionBusinessList(context, onClick: false),
          _buildSecondSectionBusinessList(context, onClick: false),

//        FIXME:  will handle the case of many business loaded later in v2.
          _buildThirdSection(context),
          _buildFourthSection(context)
        ],
      ),
    );
  }

  void _openUserAccount(BuildContext context) {
    final uid = StoreProvider.of<AppState>(context).state.user.id;
    Navigator.of(context).pushNamed(Routes.user, arguments: uid);
  }
}

class _GroupListItem extends StatelessWidget {
  final Business _group;
  final bool _selected;
  final bool _hasUpdates;
  final Function _selectionCallback;

  const _GroupListItem(
    group,
    selected,
    hasUpdates,
    selectionCallback, {
    Key key,
  })  : _group = group,
        _selected = selected,
        _hasUpdates = hasUpdates,
        _selectionCallback = selectionCallback,
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        height: _Style.itemHeight,
        child: Padding(
          padding: const EdgeInsets.only(
            top: _Style.padding,
            right: _Style.padding,
          ),
          child: _GroupButton(
            _group,
            (id) {
              _selectionCallback();
              _selectGroup(context, id);
            },
            _selected,
            _hasUpdates,
          ),
        ));
  }

  void _selectGroup(
    BuildContext context,
    int id,
  ) {}
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
    final _circleColor = HexColor(business.hexColor);
    final _groupText = business.abbreviation.substring(0, 2).toUpperCase();

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
