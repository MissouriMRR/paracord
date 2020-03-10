import 'package:flutter/material.dart';

import 'package:paracord_flutter/home.dart';
import 'package:paracord_flutter/login.dart';
import 'package:paracord_flutter/user.dart';
import 'package:provider/provider.dart';

void main() => runApp(ChangeNotifierProvider(
      create: (context) => CurrentUserModel(),
      child: ParacordApp(),
    ));

class ParacordApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Paracord',
      theme: _kParacordTheme,
      home: HomePage(),
      initialRoute: '/login',
      onGenerateRoute: _getRoute,
    );
  }

  Route _getRoute(RouteSettings settings) {
    if (settings.name != '/login') return null;

    return MaterialPageRoute(
      settings: settings,
      builder: (BuildContext context) => LoginPage(),
      fullscreenDialog: true,
    );
  }
}

final _kParacordTheme = _buildParacordTheme();

ThemeData _buildParacordTheme() => ThemeData(
      primarySwatch: Colors.green,
      inputDecorationTheme: InputDecorationTheme(border: OutlineInputBorder()),
    );
