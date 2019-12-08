import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:graphql/internal.dart';
import 'package:paracord_flutter/drone.dart';
import 'package:paracord_flutter/flight.dart';
import 'package:paracord_flutter/graphQL.dart';
import 'package:paracord_flutter/transition.dart';

class Session {
  static final String _queryName = "sessions";
  static final String _queryArgs = "id,purpose,startTime,description";
  static final String _queryDocument = "query{$_queryName{$_queryArgs}}";

  static Future<Iterable<Session>> fetchSessions() async {
    QueryResult result =
        await client.query(QueryOptions(document: _queryDocument));
    if (result.hasErrors) throw result.errors;
    return (result.data[_queryName] as Iterable)
        .map((sessionData) => Session.fromMap(sessionData as Map));
  }

  static ObservableQuery watchSessions() {
    // TODO gql subscriptions
    return client.watchQuery(WatchQueryOptions(document: _queryDocument));
  }

  static Future<Session> createSession(Session session) async {
    final String mutationName = "createSession";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id", "startTime"],
      variables: <String, dynamic>{
        "purpose": session.purpose,
        "description": session.description,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    session.id = result.data[mutationName]['id'];
    session.startTime = DateTime.parse(result.data[mutationName]['startTime']);
    return session;
  }

  static Future<Session> endSession(Session session) async {
    final String mutationName = "endSession";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id", "endTime"],
      variables: <String, dynamic>{
        "id": session.id,
        "outcome": session.outcome,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    session.id = result.data[mutationName]['id'];
    session.endTime = DateTime.parse(result.data[mutationName]['endTime']);
    return session;
  }

  String id;
  String purpose;
  DateTime startTime;
  DateTime endTime;
  String description;
  String droneId;
  String outcome;
  String userId;
  String location;
  String weather;
  String terrain;

  Session({
    this.id,
    this.purpose,
    this.startTime,
    this.endTime,
    this.description,
    this.droneId,
    this.outcome,
    this.userId,
    this.location,
    this.weather,
    this.terrain,
  });

  factory Session.fromMap(Map<String, dynamic> data) => Session(
        id: data['id'],
        purpose: data['purpose'],
        startTime: DateTime.parse(data['startTime']),
        endTime: DateTime.parse(data['endTime']),
        description: data['description'],
        droneId: data['droneId'],
        outcome: data['outcome'],
        userId: data['userId'],
        location: data['location'],
        weather: data['weather'],
        terrain: data['terrain'],
      );

  /// true if all fields required to post are non-null
  get validPost => purpose != null && description != null && droneId != null;
}

class SessionPage extends StatefulWidget {
  final Session session;

  SessionPage({Key key, @required this.session})
      : assert(session != null),
        super(key: key);

  @override
  _SessionPageState createState() => _SessionPageState();
}

class _SessionPageState extends State<SessionPage>
    with SingleTickerProviderStateMixin {
  Future<Iterable<Flight>> _flights;
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: 2);
    _flights = fetchFlights();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.session.purpose),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'DETAILS'),
            Tab(text: 'FLIGHTS'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [_buildDetailsTab(), _buildFlightList()],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          switch (_tabController.index) {
            case 0:
              // TODO edit page
              break;
            case 1:
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => NewFlightPage()));
              break;
          }
        },
        tooltip: 'TODO',
        child: SwapTransition(
          progress: _tabController.animation,
          children: [
            Icon(Icons.edit),
            Icon(Icons.add),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailsTab() {
    return ListView(
      children: <Widget>[
        ListTile(
          title: Text("Purpose"),
          subtitle: Text(widget.session.purpose),
        ),
        Divider(),
        ListTile(
          title: Text("Description"),
          subtitle: Text(widget.session.description),
        ),
        Divider(),
        ListTile(
          title: Text("Date"),
          subtitle: Text(widget.session.startTime.toString()),
        )
      ],
    );
  }

  Widget _buildFlightList() {
    return FutureBuilder<Iterable<Flight>>(
      future: _flights,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return ListView.separated(
            itemCount: snapshot.data.length,
            itemBuilder: (context, index) => ListTile(
              title: Text(
                snapshot.data.elementAt(index).title,
                maxLines: 1,
                softWrap: false,
                overflow: TextOverflow.ellipsis,
              ),
              subtitle: Text("Lorem ipsum dolor sit amet."),
              trailing: Icon(Icons.chevron_right),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          FlightPage(flight: snapshot.data.elementAt(index))),
                );
              },
            ),
            separatorBuilder: (context, index) => Divider(),
          );
        }
        return CircularProgressIndicator();
      },
    );
  }
}

class NewSessionPage extends StatefulWidget {
  @override
  _NewSessionPageState createState() => _NewSessionPageState();
}

class _NewSessionPageState extends State<NewSessionPage> {
  Session _session;

  Future<Iterable<Drone>> _drones;

  final _purposeController = TextEditingController();
  final _locationController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _weatherController = TextEditingController();
  final _terrainController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _drones = Drone.fetchDrones();
    _session = Session();

    _purposeController.addListener(() {
      _session.purpose = _purposeController.text;
    });
    _descriptionController.addListener(() {
      _session.description = _descriptionController.text;
    });
    _locationController.addListener(() {
      _session.location = _locationController.text;
    });
    _weatherController.addListener(() {
      _session.weather = _weatherController.text;
    });
    _terrainController.addListener(() {
      _session.terrain = _terrainController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Session')),
      body: DropdownButtonHideUnderline(
        child: ListView(
          children: <Widget>[
            ListTile(
              title: InputDecorator(
                isEmpty: _session.userId == null,
                decoration: InputDecoration(labelText: 'Drone'),
                child: FutureBuilder<Iterable<Drone>>(
                  future: _drones,
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) return Text('Loading...');
                    if (snapshot.data.isEmpty)
                      return Text('No Drones Available');
                    List<DropdownMenuItem<String>> droneItems =
                        snapshot.requireData
                            .map((drone) => DropdownMenuItem(
                                  value: drone.id,
                                  child: Text(drone.name),
                                ))
                            .toList();
                    return DropdownButton<String>(
                      isDense: true,
                      value: _session.droneId,
                      onChanged: (newValue) {
                        setState(() {
                          _session.droneId = newValue;
                        });
                      },
                      items: droneItems,
                    );
                  },
                ),
              ),
            ),
            ListTile(
              title: TextField(
                controller: _purposeController,
                decoration: InputDecoration(labelText: 'Purpose'),
              ),
            ),
            ListTile(
                title: TextField(
              maxLines: null,
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            )),
            ListTile(
              title: TextField(
                controller: _locationController,
                decoration: InputDecoration(labelText: 'Location'),
              ),
            ),
            ListTile(
              title: TextField(
                controller: _weatherController,
                decoration: InputDecoration(labelText: 'Weather'),
              ),
            ),
            ListTile(
              title: TextField(
                controller: _terrainController,
                decoration: InputDecoration(labelText: 'Terrain'),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: Builder(
        builder: (context) {
          return FloatingActionButton(
            child: Icon(Icons.save),
            onPressed: () async {
              if (!_session.validPost) {
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text("Please complete all required fields"),
                ));
                return;
              }
              await Session.createSession(_session);
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) => SessionPage(session: _session)),
              );
            },
          );
        },
      ),
    );
  }
}
