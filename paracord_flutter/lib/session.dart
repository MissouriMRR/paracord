import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:graphql/internal.dart';
import 'package:paracord_flutter/frame.dart';
import 'package:paracord_flutter/mission.dart';
import 'package:paracord_flutter/graphQL.dart';
import 'package:paracord_flutter/transition.dart';
import 'package:paracord_flutter/user.dart';
import 'package:provider/provider.dart';

class Session {
  static final String _queryName = "sessions";
  static final String _queryArgs =
      "id,purpose,startTime,description,endTime,location,terrain,weather,outcome,missions{id,purpose,description,startTime,endTime}";
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
        "userid": session.userId,
        "terrain": session.terrain,
        "weather": session.weather,
        "location": session.location,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    session.id = result.data[mutationName]['id'];
    session.startTime = DateTime.parse(result.data[mutationName]['startTime']);
    session.missions = [];
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

  int id;
  String purpose;
  DateTime startTime;
  DateTime endTime;
  String description;
  int frameId;
  String outcome;
  int userId;
  String location;
  String weather;
  String terrain;
  List<Mission> missions;

  Session({
    this.id,
    this.purpose,
    this.startTime,
    this.endTime,
    this.description,
    this.frameId,
    this.outcome,
    this.userId,
    this.location,
    this.weather,
    this.terrain,
    this.missions,
  });

  factory Session.fromMap(Map<String, dynamic> data) => Session(
        id: data['id'],
        purpose: data['purpose'],
        startTime: DateTime.parse(data['startTime']),
        endTime:
            data['endTime'] != null ? DateTime.parse(data['endTime']) : null,
        description: data['description'],
        frameId: data['frameId'],
        outcome: data['outcome'],
        userId: data['userId'],
        location: data['location'],
        weather: data['weather'],
        terrain: data['terrain'],
        missions: (data['missions'] as List<dynamic>)
            .map((missionData) => Mission.fromMap(missionData))
            .toList(),
      );

  /// true if all fields required to post are non-null
  get validPost =>
      userId != null &&
      purpose != null &&
      description != null &&
      frameId != null &&
      location != null &&
      weather != null &&
      terrain != null;
}

class SessionPage extends StatefulWidget {
  final Session session;
  final int initialTab;

  SessionPage({Key key, @required this.session, this.initialTab = 0})
      : assert(session != null),
        super(key: key);

  @override
  _SessionPageState createState() => _SessionPageState();
}

class _SessionPageState extends State<SessionPage>
    with SingleTickerProviderStateMixin {
  Iterable<Mission> _missions;
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: 2)
      ..index = widget.initialTab;
    _missions = widget.session.missions;
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
      onWillPop: () async {
        if (widget.session.endTime == null) {
          return await showDialog(
                context: context,
                builder: (context) => new AlertDialog(
                  title: new Text('Are you sure?'),
                  content: new Text('Do you want to end this session?'),
                  actions: <Widget>[
                    new FlatButton(
                      onPressed: () => Navigator.of(context).pop(false),
                      child: new Text('No'),
                    ),
                    new FlatButton(
                      onPressed: () async {
                        bool value = await Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => EndSessionPage(
                              session: widget.session,
                            ),
                          ),
                        );
                        Navigator.of(context).pop(value);
                      },
                      child: new Text('Yes'),
                    ),
                  ],
                ),
              ) ??
              false;
        }
        return true;
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(widget.session.purpose),
          bottom: TabBar(
            controller: _tabController,
            tabs: [
              Tab(text: 'DETAILS'),
              Tab(text: 'MISSIONS'),
            ],
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: [_buildDetailsTab(), _buildMissionList()],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            switch (_tabController.index) {
              case 0:
                // TODO edit page
                print("Sorry, this doesnt work yet");
                break;
              case 1:
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        EditMissionPage(session: widget.session),
                  ),
                );
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
        widget.session.outcome != null
            ? ListTile(
                title: Text("Outcome"),
                subtitle: Text(widget.session.outcome),
              )
            : Divider(),
        ListTile(
          title: Text("Start Time"),
          subtitle: Text(widget.session.startTime.toString()),
        ),
        widget.session.endTime != null
            ? ListTile(
                title: Text("End Time"),
                subtitle: Text(widget.session.endTime.toString()),
              )
            : Divider(),
        ListTile(
          title: Text("Location"),
          subtitle: Text(widget.session.location),
        ),
        Divider(),
        ListTile(
          title: Text("Weather"),
          subtitle: Text(widget.session.weather),
        ),
        Divider(),
        ListTile(
          title: Text("Terrain"),
          subtitle: Text(widget.session.terrain),
        )
      ],
    );
  }

  Widget _buildMissionList() {
    return ListView.separated(
      itemCount: _missions.length,
      itemBuilder: (context, index) => ListTile(
        title: Text(
          _missions.elementAt(index).purpose,
          maxLines: 1,
          softWrap: false,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Text(_missions.elementAt(index).startTime.toString()),
        trailing: Icon(Icons.chevron_right),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) =>
                    MissionPage(mission: _missions.elementAt(index))),
          );
        },
      ),
      separatorBuilder: (context, index) => Divider(),
    );
  }
}

class NewSessionPage extends StatefulWidget {
  @override
  _NewSessionPageState createState() => _NewSessionPageState();
}

class _NewSessionPageState extends State<NewSessionPage> {
  Session _session;

  Future<Iterable<Frame>> _frames;

  final _purposeController = TextEditingController();
  final _locationController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _weatherController = TextEditingController();
  final _terrainController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _frames = Frame.fetchFrames();
    _session = Session(
      userId:
          Provider.of<CurrentUserModel>(context, listen: false).currentUser.id,
    );

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
                isEmpty: _session.frameId == null,
                decoration: InputDecoration(labelText: 'Frame'),
                child: FutureBuilder<Iterable<Frame>>(
                  future: _frames,
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) return Text('Loading...');
                    if (snapshot.data.isEmpty)
                      return Text('No Frames Available');
                    List<DropdownMenuItem<int>> frameItems =
                        snapshot.requireData
                            .map((frame) => DropdownMenuItem(
                                  value: frame.id,
                                  child: Text(frame.name),
                                ))
                            .toList();
                    return DropdownButton<int>(
                      isDense: true,
                      value: _session.frameId,
                      onChanged: (newValue) {
                        setState(() {
                          _session.frameId = newValue;
                        });
                      },
                      items: frameItems,
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

class EndSessionPage extends StatefulWidget {
  final Session session;

  EndSessionPage({Key key, @required this.session})
      : assert(session != null),
        super(key: key);

  _EndSessionPageState createState() => _EndSessionPageState();
}

class _EndSessionPageState extends State<EndSessionPage> {
  final _outcomeController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _outcomeController.addListener(() {
      widget.session.outcome = _outcomeController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Ending Session')),
      body: ListView(
        children: <Widget>[
          ListTile(
            title: TextField(
              controller: _outcomeController,
              decoration: InputDecoration(labelText: 'Outcome'),
              maxLines: null,
            ),
          ),
        ],
      ),
      floatingActionButton: Builder(
        builder: (context) {
          return FloatingActionButton(
            child: Icon(Icons.save),
            onPressed: () async {
              if (widget.session.outcome?.isEmpty ?? true) {
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text("Please complete all required fields"),
                ));
                return;
              }
              await Session.endSession(widget.session);
              Navigator.pop(context, true);
            },
          );
        },
      ),
    );
  }
}
