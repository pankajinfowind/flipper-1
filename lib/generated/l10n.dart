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

  String get AddVariation {
    return Intl.message(
      'Add Variation',
      name: 'AddVariation',
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

  String get Price {
    return Intl.message(
      'Price',
      name: 'Price',
      desc: '',
      args: [],
    );
  }

  String get SKU {
    return Intl.message(
      'SKU',
      name: 'SKU',
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