import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

class Flight {
  int userId;
  int id;
  String title;
  String body;

  Flight({this.userId, this.id, this.title = '', this.body = ''});

  factory Flight.fromJson(Map<String, dynamic> json) {
    return Flight(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}

Future<Iterable<Flight>> fetchFlights() async {
  final response = await get('https://jsonplaceholder.typicode.com/posts');

  if (response.statusCode == 200) {
    // If server returns an OK response, parse the JSON.
    return (List.from(json.decode(response.body))
        .map<Flight>((data) => Flight.fromJson(data)));
  } else {
    // If that response was not OK, throw an error.
    throw Exception('Failed to load post');
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
  //Future<Iterable<Flight>> _flights;
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: 2);
    //_flights = fetchFlights();
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
        title: Text(widget.flight.title),
      ),
      body: Center(child: _buildDetails()),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        tooltip: 'Edit Flight',
        child: Icon(Icons.edit),
      ),
    );
  }

  Widget _buildDetails() {
    return Text(widget.flight.body);
  }
}

class NewFlightPage extends StatefulWidget {
  @override
  _NewFlightPageState createState() => _NewFlightPageState();
}

class _NewFlightPageState extends State<NewFlightPage> {
  Flight _flight;

  final _bodyController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _flight = Flight();

    _bodyController.addListener(() {
      _flight.body = _bodyController.text;
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
              controller: _bodyController,
              decoration: InputDecoration(labelText: 'Body'),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.save),
        onPressed: () {
          // TODO confirmation
          // TODO post to database
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
                builder: (context) => FlightPage(flight: _flight)),
          );
        },
      ),
    );
  }
}
