import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:paracord_flutter/flight.dart';
import 'package:paracord_flutter/transition.dart';

class Session {
  int id;
  int air_frame;
  String start_time;
  String end_time;
  String preparer;
  String pilot;
  String test_purpose;
  String location;

  Session({
    this.id,
    this.air_frame,
    this.preparer,
    this.pilot,
    this.test_purpose,
    this.start_time,
    this.end_time,
    this.location,
  });

  factory Session.fromJson(Map<String, dynamic> json) {
    return Session(
      id: json['id'],
      air_frame: json['air_frame'],
      preparer: json['preparer'],
      pilot: json['pilot'],
      test_purpose: json['test_purpose'],
      start_time: json['start_time'],
    );
  }
}

Future<Iterable<Session>> fetchSessions() async {
  final response = await get('http://192.168.99.100/api/v1/sessions/');

  if (response.statusCode == 200) {
    // If server returns an OK response, parse the JSON.
    return (List.from(json.decode(response.body))
        .map<Session>((data) => Session.fromJson(data)));
  } else {
    // If that response was not OK, throw an error.
    throw Exception('Failed to load post');
  }
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
        title: Text(widget.session.test_purpose),
        
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
    return Column(children: [Text(widget.session.toString())]);
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

  final _preparerController = TextEditingController();
  final _pilotController = TextEditingController();
  final _purposeController = TextEditingController();
  final _locationController = TextEditingController();

  String _droneValue;

  @override
  void initState() {
    super.initState();
    _session = Session();

    _preparerController.addListener(() {
      _session.preparer = _preparerController.text;
    });
    _pilotController.addListener(() {
      _session.pilot = _pilotController.text;
    });
    _purposeController.addListener(() {
      _session.test_purpose = _purposeController.text;
    });
    _locationController.addListener(() {
      _session.location = _locationController.text;
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
              title: TextField(
                // TODO User.name
                controller: _preparerController,
                decoration: InputDecoration(labelText: 'Preparer'),
              ),
            ),
            ListTile(
              title: TextField(
                controller: _pilotController,
                decoration: InputDecoration(labelText: 'Pilot'),
              ),
            ),
            ListTile(
              title: InputDecorator(
                isEmpty: _droneValue == null, // TODO _session.drone
                decoration: InputDecoration(labelText: 'Drone'),
                child: DropdownButton(
                  isDense: true,
                  value: _droneValue,
                  onChanged: (newValue) {
                    setState(() {
                      _droneValue = newValue;
                      _session.air_frame =
                          newValue; // TODO _session.drone = newValue;
                    });
                  },
                  items: [
                    DropdownMenuItem(
                      value: 'lorem',
                      child: Text('lorem'),
                    ),
                    DropdownMenuItem(
                      value: 'ipsum',
                      child: Text('ipsum'),
                    )
                  ],
                ),
              ),
            ),
            ListTile(
              title: TextField(
                maxLines: null,
                controller: _purposeController,
                decoration: InputDecoration(labelText: 'Purpose'),
              ),
            ),
            ListTile(
              title: TextField(
                controller: _locationController,
                decoration: InputDecoration(labelText: 'Location'),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.save),
        onPressed: () {
          // TODO confirmation
          // TODO post to database
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
                builder: (context) => SessionPage(session: _session)),
          );
        },
      ),
    );
  }
}
