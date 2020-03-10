import 'package:graphql/client.dart';

final _httpLink = HttpLink(
  uri: "http://192.168.99.101/graphql", // TODO get an actual domain name
);

final client = GraphQLClient(
  cache: InMemoryCache(),
  link: _httpLink,
);

String getGraphQLType(dynamic value) {
  if (value == null) {
    throw "value is null";
  } else if (value is String) {
    return "String";
  } else if (value is int) {
    return "Int";
  } else {
    throw "bad type";
  }
}

class QueryOptionsWrapper {
  String queryName;
  Map<String, dynamic> variables;
  List<String> queries;

  QueryOptionsWrapper({this.queryName, this.variables, this.queries});

  Map<String, String> _getGraphQLVariableTypes() =>
      variables.map<String, String>((k, v) => MapEntry(k, getGraphQLType(v)));

  QueryOptions get options {
    StringBuffer queryBuffer = StringBuffer();
    queries.forEach((item) => queryBuffer.write("$item,"));

    if (variables == null) {
      String document = "query{$queryName{${queryBuffer.toString()}}}";
      return QueryOptions(document: document);
    } else {
      var vars = _getGraphQLVariableTypes();
      StringBuffer varBuffer = StringBuffer();
      vars.forEach((k, v) => varBuffer.write("\$$k:$v!,"));

      StringBuffer argBuffer = StringBuffer();
      variables.forEach((k, v) => argBuffer.write("$k:\$$k,"));

      String document =
          "query(${varBuffer.toString()}){$queryName(${argBuffer.toString()}){${queryBuffer.toString()}}}";
      return QueryOptions(
        document: document,
        variables: variables,
      );
    }
  }
}

class MutationOptionsWrapper {
  String mutationName;
  Map<String, dynamic> variables;
  List<String> queries;
  MutationOptionsWrapper({this.mutationName, this.variables, this.queries});

  Map<String, String> _getGraphQLVariableTypes() =>
      variables.map<String, String>((k, v) => MapEntry(k, getGraphQLType(v)));

  MutationOptions get options {
    var vars = _getGraphQLVariableTypes();
    StringBuffer varBuffer = StringBuffer();
    vars.forEach((k, v) => varBuffer.write("\$$k:$v!,"));

    StringBuffer queryBuffer = StringBuffer();
    queries.forEach((item) => queryBuffer.write("$item,"));

    StringBuffer argBuffer = StringBuffer();
    variables.forEach((k, v) => argBuffer.write("$k:\$$k,"));

    String document =
        "mutation(${varBuffer.toString()}){$mutationName(${argBuffer.toString()}){${queryBuffer.toString()}}}";
    return MutationOptions(
      document: document,
      variables: variables,
    );
  }
}
