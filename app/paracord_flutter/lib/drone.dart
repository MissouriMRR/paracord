import 'package:graphql/client.dart';
import 'package:paracord_flutter/graphQL.dart';

class Drone {
  static final String _queryName = "drones";
  static final String _droneQuery = "query{$_queryName{id,name}}";

  static Future<Iterable<Drone>> fetchDrones() async {
    QueryResult result =
        await client.query(QueryOptions(document: _droneQuery));
    if (result.hasErrors) throw result.errors;
    return (result.data[_queryName] as Iterable)
        .map((droneData) => Drone.fromMap(droneData as Map));
  }

  String id;
  String name;

  Drone({this.id, this.name});
  factory Drone.fromMap(Map<String, dynamic> data) =>
      Drone(id: data['id'], name: data['name']);
}
