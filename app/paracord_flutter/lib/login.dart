import 'package:flutter/material.dart';
import 'package:paracord_flutter/user.dart';
import 'package:provider/provider.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  String _emailError;
  String _passwordError;

  @override
  void initState() {
    super.initState();
    Provider.of<CurrentUserModel>(context, listen: false).currentUser = User();
    _emailController.addListener(() {
      Provider.of<CurrentUserModel>(
        context,
        listen: false,
      ).currentUser.email = _emailController.text;
      setState(() {
        _emailError = null;
      });
    });
    _passwordController.addListener(() {
      Provider.of<CurrentUserModel>(
        context,
        listen: false,
      ).currentUser.password = _passwordController.text;
      setState(() {
        _passwordError = null;
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
                  errorText: _emailError,
                ),
              ),
              SizedBox(height: 12.0),
              // [Password]
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  errorText: _passwordError,
                ),
                obscureText: true,
              ),
              ButtonBar(
                children: <Widget>[
                  FlatButton(
                    child: Text('REGISTER'),
                    onPressed: _register,
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
                    onPressed: _login,
                  )
                ],
              )
            ]),
          ],
        ),
      ),
    );
  }

  void _login() async {
    User _currentUser =
        Provider.of<CurrentUserModel>(context, listen: false).currentUser;
    if (!await _currentUser.validateEmail()) {
      setState(() {
        _emailError = 'User not found';
      });
      return;
    }
    if (!await _currentUser.validatePassword()) {
      setState(() {
        _passwordError = 'Invalid password';
      });
      return;
    }

    Provider.of<CurrentUserModel>(context, listen: false).currentUser =
        await User.fetchByEmail(_currentUser);

    Navigator.pop(context);
  }

  void _register() async {
    User _currentUser =
        Provider.of<CurrentUserModel>(context, listen: false).currentUser;
    if (_currentUser.email == null || _currentUser.email.isEmpty) {
      setState(() {
        _emailError = 'Invalid Email';
      });
      return;
    } else if (false /* TODO check if taken */) {
      setState(() {
        _emailError = 'That email is taken';
      });
      return;
    }
    if (_currentUser.password == null || _currentUser.password.isEmpty) {
      setState(() {
        _passwordError = 'Invalid Password';
      });
      return;
    }

    Provider.of<CurrentUserModel>(context, listen: false).currentUser =
        await User.createUser(_currentUser);

    Navigator.pop(context);
  }
}
