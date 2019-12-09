import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:paracord_flutter/session.dart';

import 'graphQL.dart';

class Flight {
  int id;
  String purpose;
  DateTime startTime;
  DateTime endTime;
  String description;
  String outcome;

  Flight({
    this.id,
    this.purpose,
    this.startTime,
    this.endTime,
    this.description,
    this.outcome,
  });

  factory Flight.fromMap(Map<String, dynamic> data) => Flight(
        id: data['id'],
        purpose: data['purpose'],
        startTime: DateTime.parse(data['startTime']),
        endTime:
            data['endTime'] != null ? DateTime.parse(data['endTime']) : null,
        description: data['description'],
        outcome: data['outcome'],
      );

  static Future<Flight> createFlight(Flight flight, int sessionId) async {
    final String mutationName = "createFlight";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id", "startTime"],
      variables: <String, dynamic>{
        "purpose": flight.purpose,
        "description": flight.description,
        "sessionid": sessionId,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    flight.id = result.data[mutationName]['id'];
    flight.startTime = DateTime.parse(result.data[mutationName]['startTime']);
    return flight;
  }

  static Future<Flight> endFlight(Flight flight) async {
    final String mutationName = "endFlight";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id", "endTime"],
      variables: <String, dynamic>{
        "id": flight.id,
        "outcome": flight.outcome,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    flight.id = result.data[mutationName]['id'];
    flight.endTime = DateTime.parse(result.data[mutationName]['endTime']);
    return flight;
  }
}

class FlightPage extends StatefulWidget {
  final Flight flight;

  FlightPage({Key key, @required this.flight})
      : assert(flight != null),
        super(key: key);

  @override
  _FlightPageState createState() => _FlightPageState();
}

class _FlightPageState extends State<FlightPage>
    with SingleTickerProviderStateMixin {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (widget.flight.endTime == null) {
          return await showDialog(
                context: context,
                builder: (context) => new AlertDialog(
                  title: new Text('Are you sure?'),
                  content: new Text('Do you want to end this flight?'),
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
                            builder: (context) => EndFlightPage(
                              flight: widget.flight,
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
          title: Text(widget.flight.purpose),
        ),
        body: Center(child: _buildDetails()),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            print("Sorry, this doesnt work yet");
          },
          tooltip: 'Edit Flight',
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
          subtitle: Text(widget.flight.purpose),
        ),
        Divider(),
        ListTile(
          title: Text("Description"),
          subtitle: Text(widget.flight.description),
        ),
        widget.flight.outcome != null
            ? ListTile(
                title: Text("Outcome"),
                subtitle: Text(widget.flight.outcome),
              )
            : Divider(),
        ListTile(
          title: Text("Start Time"),
          subtitle: Text(widget.flight.startTime.toString()),
        ),
        widget.flight.endTime != null
            ? ListTile(
                title: Text("End Time"),
                subtitle: Text(widget.flight.endTime.toString()))
            : Divider(),
      ],
    );
  }
}

class NewFlightPage extends StatefulWidget {
  final Session session;

  NewFlightPage({Key key, @required this.session})
      : assert(session != null),
        super(key: key);

  @override
  _NewFlightPageState createState() => _NewFlightPageState();
}

class _NewFlightPageState extends State<NewFlightPage> {
  Flight _flight;

  final _purposeController = TextEditingController();
  final _descriptionController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _flight = Flight();

    _purposeController.addListener(() {
      _flight.purpose = _purposeController.text;
    });

    _descriptionController.addListener(() {
      _flight.description = _descriptionController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Flight')),
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
          Flight.createFlight(_flight, widget.session.id);
          widget.session.flights.add(_flight);

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
                  builder: (context) => FlightPage(flight: _flight)),
            );
        },
      ),
    );
  }
}

class EndFlightPage extends StatefulWidget {
  final Flight flight;

  EndFlightPage({Key key, @required this.flight})
      : assert(flight != null),
        super(key: key);

  _EndFlightPageState createState() => _EndFlightPageState();
}

class _EndFlightPageState extends State<EndFlightPage> {
  final _outcomeController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _outcomeController.addListener(() {
      widget.flight.outcome = _outcomeController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Ending Flight')),
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
              if (widget.flight.outcome?.isEmpty ?? true) {
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text("Please complete all required fields"),
                ));
                return;
              }
              await Flight.endFlight(widget.flight);
              Navigator.pop(context, true);
            },
          );
        },
      ),
    );
  }
}
