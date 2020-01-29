// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

class S {
  S(this.localeName);
  
  static const AppLocalizationDelegate delegate =
    AppLocalizationDelegate();

  static Future<S> load(Locale locale) {
    final String name = locale.countryCode.isEmpty ? locale.languageCode : locale.toString();
    final String localeName = Intl.canonicalizedLocale(name);
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      return S(localeName);
    });
  } 

  static S of(BuildContext context) {
    return Localizations.of<S>(context, S);
  }

  final String localeName;

  String get save {
    return Intl.message(
      'Save',
      name: 'save',
      desc: '',
      args: [],
    );
  }

  String get unityType {
    return Intl.message(
      'Unit Type',
      name: 'unityType',
      desc: '',
      args: [],
    );
  }

  String get category {
    return Intl.message(
      'Category',
      name: 'category',
      desc: '',
      args: [],
    );
  }

  String get createItem {
    return Intl.message(
      'Create Item',
      name: 'createItem',
      desc: '',
      args: [],
    );
  }

  String get signup {
    return Intl.message(
      'Sign up',
      name: 'signup',
      desc: '',
      args: [],
    );
  }

  String get createCategory {
    return Intl.message(
      'Create Category',
      name: 'createCategory',
      desc: '',
      args: [],
    );
  }

  String get addVariation {
    return Intl.message(
      'Add Variation',
      name: 'addVariation',
      desc: '',
      args: [],
    );
  }

  String get name {
    return Intl.message(
      'Name',
      name: 'name',
      desc: '',
      args: [],
    );
  }

  String get price {
    return Intl.message(
      'Price',
      name: 'price',
      desc: '',
      args: [],
    );
  }

  String get sKU {
    return Intl.message(
      'SKU',
      name: 'sKU',
      desc: '',
      args: [],
    );
  }

  String get stock {
    return Intl.message(
      'Stock',
      name: 'stock',
      desc: '',
      args: [],
    );
  }

  String get leavePriceBlank {
    return Intl.message(
      'Leave the price blank to enter at the time of sale.',
      name: 'leavePriceBlank',
      desc: '',
      args: [],
    );
  }

  String get receiveStock {
    return Intl.message(
      'Receive Stock',
      name: 'receiveStock',
      desc: '',
      args: [],
    );
  }

  String get addStock {
    return Intl.message(
      'Add Stock',
      name: 'addStock',
      desc: '',
      args: [],
    );
  }

  String get reedeemRewards {
    return Intl.message(
      'Reedeem Rewards',
      name: 'reedeemRewards',
      desc: '',
      args: [],
    );
  }

  String get createNew {
    return Intl.message(
      'Create new',
      name: 'createNew',
      desc: '',
      args: [],
    );
  }

  String get newItem {
    return Intl.message(
      'New Item',
      name: 'newItem',
      desc: '',
      args: [],
    );
  }

  String get selectCategory {
    return Intl.message(
      'Select Category',
      name: 'selectCategory',
      desc: '',
      args: [],
    );
  }

  String get priceAndInventory {
    return Intl.message(
      'PRICE AND INVENTORY',
      name: 'priceAndInventory',
      desc: '',
      args: [],
    );
  }

  String get unity_type {
    return Intl.message(
      'Unit Type',
      name: 'unity_type',
      desc: '',
      args: [],
    );
  }

  String get perItem {
    return Intl.message(
      'Per Item',
      name: 'perItem',
      desc: '',
      args: [],
    );
  }

  String get description {
    return Intl.message(
      'Description',
      name: 'description',
      desc: '',
      args: [],
    );
  }

  String get inStock {
    return Intl.message(
      'in Stock',
      name: 'inStock',
      desc: '',
      args: [],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<S> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale('en', ''), Locale('fr', ''), Locale('rw', ''), Locale('zh', ''),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<S> load(Locale locale) => S.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    if (locale != null) {
      for (Locale supportedLocale in supportedLocales) {
        if (supportedLocale.languageCode == locale.languageCode) {
          return true;
        }
      }
    }
    return false;
  }
}