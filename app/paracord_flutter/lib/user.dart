import 'package:graphql/client.dart';
import 'package:paracord_flutter/graphQL.dart';

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
        email: data['name'],
        password: data['password'],
      );

  Future<bool> validateEmail() async {
    if (this.email == null) return false;
    try {
      await fetchByEmail(this);
    } catch (e) {
      return false;
    }
    return true;
  }

  Future<bool> validatePassword() async {
    return false; // TODO
  }
}
