import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          children: <Widget>[
            Center(
              heightFactor: 2.0,
              child: Column(
                children: <Widget>[
                  CircleAvatar(
                      radius: 45,
                      child: Text(
                        'SAMPLE\nLOGO',
                        textAlign: TextAlign.center,
                      )),
                  SizedBox(height: 8.0),
                  Text('PARACORD'),
                ],
              ),
            ),
            Column(children: <Widget>[
              // [Username]
              TextField(
                controller: _usernameController,
                decoration: InputDecoration(labelText: 'Username'),
              ),
              SizedBox(height: 12.0),
              // [Password]
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              ButtonBar(
                children: <Widget>[
                  FlatButton(
                    child: Text('CLEAR'),
                    onPressed: () {
                      _usernameController.clear();
                      _passwordController.clear();
                    },
                  ),
                  // FlatButton(
                  //   child: Text('REGISTER'),
                  //   onPressed: () {},
                  // ),
                  RaisedButton(
                    child: Text('LOGIN'),
                    onPressed: () {
                      
                      Navigator.pop(context);
                    },
                  )
                ],
              )
            ]),
          ],
        ),
      ),
    );
  }
}
