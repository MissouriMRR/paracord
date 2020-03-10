import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:paracord_flutter/session.dart';

import 'graphQL.dart';

class Mission {
  int id;
  String purpose;
  DateTime startTime;
  DateTime endTime;
  String description;
  String outcome;

  Mission({
    this.id,
    this.purpose,
    this.startTime,
    this.endTime,
    this.description,
    this.outcome,
  });

  factory Mission.fromMap(Map<String, dynamic> data) => Mission(
        id: data['id'],
        purpose: data['purpose'],
        startTime: DateTime.parse(data['startTime']),
        endTime:
            data['endTime'] != null ? DateTime.parse(data['endTime']) : null,
        description: data['description'],
        outcome: data['outcome'],
      );

  static Future<Mission> createMission(Mission mission, int sessionId) async {
    final String mutationName = "createMission";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id", "startTime"],
      variables: <String, dynamic>{
        "purpose": mission.purpose,
        "description": mission.description,
        "sessionid": sessionId,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    mission.id = result.data[mutationName]['id'];
    mission.startTime = DateTime.parse(result.data[mutationName]['startTime']);
    return mission;
  }
}

class MissionPage extends StatefulWidget {
  final Mission mission;

  MissionPage({Key key, @required this.mission})
      : assert(mission != null),
        super(key: key);

  @override
  _MissionPageState createState() => _MissionPageState();
}

class _MissionPageState extends State<MissionPage>
    with SingleTickerProviderStateMixin {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (widget.mission.endTime == null) {
          return await showDialog(
                context: context,
                builder: (context) => new AlertDialog(
                  title: new Text('Are you sure?'),
                  content: new Text('Do you want to end this mission?'),
                  actions: <Widget>[
                    new FlatButton(
                      onPressed: () => Navigator.of(context).pop(false),
                      child: new Text('No'),
                    ),
                    new FlatButton(
                      onPressed: () => Navigator.of(context).pop(true),
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
          title: Text(widget.mission.purpose),
        ),
        body: Center(child: _buildDetails()),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            print("Sorry, this doesnt work yet");
          },
          tooltip: 'Edit Mission',
          child: Icon(Icons.edit),
        ),
      ),
    );
  }

  Widget _buildDetails() {
    return ListView(
      children: <Widget>[
        ListTile(
          title: Text("Purpose"),
          subtitle: Text(widget.mission.purpose),
        ),
        Divider(),
        ListTile(
          title: Text("Description"),
          subtitle: Text(widget.mission.description),
        ),
        widget.mission.outcome != null
            ? ListTile(
                title: Text("Outcome"),
                subtitle: Text(widget.mission.outcome),
              )
            : Divider(),
        ListTile(
          title: Text("Start Time"),
          subtitle: Text(widget.mission.startTime.toString()),
        ),
        widget.mission.endTime != null
            ? ListTile(
                title: Text("End Time"),
                subtitle: Text(widget.mission.endTime.toString()))
            : Divider(),
      ],
    );
  }
}

class EditMissionPage extends StatefulWidget {
  final Session session;

  EditMissionPage({Key key, @required this.session})
      : assert(session != null),
        super(key: key);

  @override
  _EditMissionPageState createState() => _EditMissionPageState();
}

class _EditMissionPageState extends State<EditMissionPage> {
  Mission _mission;

  final _purposeController = TextEditingController();
  final _descriptionController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _mission = Mission();

    _purposeController.addListener(() {
      _mission.purpose = _purposeController.text;
    });

    _descriptionController.addListener(() {
      _mission.description = _descriptionController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Mission')),
      body: ListView(
        children: <Widget>[
          ListTile(
            title: TextField(
              controller: _purposeController,
              decoration: InputDecoration(labelText: 'Purpose'),
            ),
          ),
          ListTile(
            title: TextField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.save),
        onPressed: () {
          Mission.createMission(_mission, widget.session.id);
          widget.session.missions.add(_mission);

          Navigator.of(context)
            ..replaceRouteBelow(
              anchorRoute: ModalRoute.of(context),
              newRoute: MaterialPageRoute(
                builder: (context) => SessionPage(
                  session: widget.session,
                  initialTab: 1,
                ),
              ),
            )
            ..pushReplacement(
              MaterialPageRoute(
                  builder: (context) => MissionPage(mission: _mission)),
            );
        },
      ),
    );
  }
}
