import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:paracord_flutter/graphQL.dart';

class CurrentUserModel extends ChangeNotifier {
  User _currentUser;

  User get currentUser => _currentUser;
  set currentUser(User user) {
    _currentUser = user;
    notifyListeners();
  }

  void initUser() {
    _currentUser = User();
  }
}

class User {
  static final String _queryName = "users";
  static final String _userQuery = "query{$_queryName{id,email}}";

  static Future<Iterable<User>> fetchUsers() async {
    QueryResult result = await client.query(QueryOptions(document: _userQuery));
    if (result.hasErrors) throw result.errors;
    return (result.data[_queryName] as Iterable)
        .map((userData) => User.fromMap(userData as Map));
  }

  static Future<User> fetchByEmail(User user) async {
    final queryName = "returnUserByEmail";
    QueryResult result = await client.query(QueryOptionsWrapper(
      queryName: queryName,
      queries: ["id", "password"],
      variables: <String, dynamic>{"email": user.email},
    ).options);
    if (result.hasErrors) throw result.errors;
    user.id = result.data[queryName]['id'];
    user.password = result.data[queryName]['password'];
    return user;
  }

  /// Creates the user in the databases
  static Future<User> createUser(User user) async {
    final mutationName = "createUser";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id"],
      variables: <String, dynamic>{
        "email": user.email,
        "password": user.password,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    user.id = result.data[mutationName]['id'];
    return user;
  }

  int id;
  String email;
  String password;

  User({
    this.id,
    this.email,
    this.password,
  });

  factory User.fromMap(Map<String, dynamic> data) => User(
        id: data['id'],
        email: data['email'],
        password: data['password'],
      );

  Future<bool> validateEmail() async {
    if (this.email == null) return false;
    User test = User(email: this.email);
    try {
      await fetchByEmail(test);
    } catch (e) {
      return false;
    }
    return true;
  }

  Future<bool> validatePassword() async {
    if (this.password == null) return false;
    User test = User(email: this.email);
    try {
      await fetchByEmail(test);
    } catch (e) {
      return false;
    }
    if (this.password == test.password) return true;
    return false;
  }

  CircleAvatar get avatar => CircleAvatar(
        child: Text(this.email[0]?.toUpperCase() ?? 'User\nNull'),
        foregroundColor: Colors.white,
        backgroundColor:
            Colors.accents[(this.email?.hashCode ?? 0) % Colors.accents.length],
      );
}
