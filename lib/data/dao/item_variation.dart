import 'package:flipper/data/item_table.dart';
import 'package:flipper/data/variation_table.dart';
import 'package:flutter/cupertino.dart';

class ItemVariation {
  final VariationTable variation;
  final ItemTable item;

  ItemVariation({
    @required this.variation,
    @required this.item,
  });
}
