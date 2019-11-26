import 'package:flutter/material.dart';
import 'package:paracord_flutter/user.dart';

User currentUser;

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  User _user;
  bool validEmail = true;
  bool validPassword = true;

  @override
  void initState() {
    super.initState();
    _user = User();
    _emailController.addListener(() {
      _user.email = _emailController.text;
      setState(() {
        validEmail = true;
      });
    });
    _passwordController.addListener(() {
      _user.password = _passwordController.text;
      setState(() {
        validPassword = true;
      });
    });
  }

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
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  errorText: validEmail ? null : 'Invalid Email',
                ),
              ),
              SizedBox(height: 12.0),
              // [Password]
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  errorText: validPassword ? null : 'Invalid Password',
                ),
                obscureText: true,
              ),
              ButtonBar(
                children: <Widget>[
                  FlatButton(
                    child: Text('REGISTER'),
                    onPressed: () async {
                      if (_user.email == null || _user.email.isEmpty) {
                        setState(() {
                          validEmail = false;
                        });
                        return;
                      }
                      if (_user.password == null || _user.password.isEmpty) {
                        setState(() {
                          validPassword = false;
                        });
                        return;
                      }
                      _user = await User.createUser(_user);
                      currentUser = _user;
                      Navigator.pop(context);
                    },
                  ),
                  FlatButton(
                    child: Text('CLEAR'),
                    onPressed: () {
                      _emailController.clear();
                      _passwordController.clear();
                    },
                  ),
                  RaisedButton(
                    child: Text('LOGIN'),
                    onPressed: () async {
                      if (!await _user.validateEmail()) {
                        setState(() {
                          validEmail = false;
                        });
                        return;
                      }
                      if (!await _user.validatePassword()) {
                        setState(() {
                          validPassword = false;
                        });
                        return;
                      }
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
