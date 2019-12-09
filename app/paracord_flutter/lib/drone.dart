import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:paracord_flutter/graphQL.dart';
import 'package:paracord_flutter/organizaiton.dart';

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

  static Future<Drone> createDrone(Drone drone) async {
    final String mutationName = "createDrone";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id"],
      variables: <String, dynamic>{
        "name": drone.name,
        "orgid": drone.orgid,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    drone.id = result.data[mutationName]['id'];
    return drone;
  }

  int id;
  int orgid;
  String name;

  Drone({
    this.id,
    this.orgid,
    this.name,
  });

  factory Drone.fromMap(Map<String, dynamic> data) => Drone(
        id: data['id'],
        orgid: data['orgid'],
        name: data['name'],
      );

  bool get validPost => name != null && name.isNotEmpty && orgid != null;
}

class NewDronePage extends StatefulWidget {
  final Organization organization;

  NewDronePage({Key key, @required this.organization})
      : assert(organization != null),
        super(key: key);

  _NewDronePageState createState() => _NewDronePageState();
}

class _NewDronePageState extends State<NewDronePage> {
  Drone _drone;

  final _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();

    _drone = Drone();
    _drone.orgid = widget.organization.id;

    _nameController.addListener(() {
      _drone.name = _nameController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Drone')),
      body: ListView(
        children: <Widget>[
          ListTile(
            title: TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name'),
            ),
          ),
        ],
      ),
      floatingActionButton: Builder(
        builder: (context) {
          return FloatingActionButton(
            child: Icon(Icons.save),
            onPressed: () async {
              if (!_drone.validPost) {
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text("Please complete all required fields"),
                ));
                return;
              }
              await Drone.createDrone(_drone);

              widget.organization.drones.add(_drone);

              Navigator.replaceRouteBelow(
                context,
                anchorRoute: ModalRoute.of(context),
                newRoute: MaterialPageRoute(
                  builder: (context) => OrganizationPage(
                    organization: widget.organization,
                    initialTab: 1,
                  ),
                ),
              );
              Navigator.pop(context);
            },
          );
        },
      ),
    );
  }
}
