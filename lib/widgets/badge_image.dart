import 'package:flutter/material.dart';

// ignore: must_be_immutable
class BadgeCircleImage extends StatefulWidget {
  final String image;
  final double size;
  final Color color;
  int notificationCount;

  BadgeCircleImage(
      {Key key,
      @required this.image,
      this.notificationCount = 16,
      this.size,
      this.color})
      : super(key: key);

  @override
  _BadgeCircleImageState createState() => _BadgeCircleImageState();
}

class _BadgeCircleImageState extends State<BadgeCircleImage> {
  int counter = 0;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        CircleAvatar(
          //TODO: add ability for widget to use local assets or network image on demand.
          backgroundImage: AssetImage(
            widget.image,
          ),
          radius: 25,
        ),
        Positioned(
          right: 0.0,
          child: Container(
            padding: EdgeInsets.all(1),
            decoration: BoxDecoration(
              color: Colors.red,
              borderRadius: BorderRadius.circular(6),
            ),
            constraints: BoxConstraints(
              minWidth: 11,
              minHeight: 11,
            ),
            child: Padding(
              padding: EdgeInsets.only(top: 1),
              child: Text(
                widget.notificationCount.toString(),
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 9,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
