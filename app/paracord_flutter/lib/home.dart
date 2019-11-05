import 'package:flutter/material.dart';
import 'package:paracord_flutter/session.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Future<Iterable<Session>> _sessions;

  @override
  void initState() {
    super.initState();
    _sessions = fetchSessions();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: _buildDrawer(),
      appBar: AppBar(
        title: Text('Paracord'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.tune),
            onPressed: () {},
          )
        ],
      ),
      body: Center(child: _buildSessionList()),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => NewSessionPage()),
          );
        },
        tooltip: 'Add Session',
        child: Icon(Icons.add),
      ),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: Column(
        children: <Widget>[
          UserAccountsDrawerHeader(
            currentAccountPicture: CircleAvatar(child: Text('B')),
            accountName: Text('bob'),
            accountEmail: Text('bob@bob.com'),
          ),
          ListTile(
            title: Text('Organizations'),
            onTap: () {},
          ),
          ListTile(
            title: Text('Logout'),
            trailing: Icon(Icons.exit_to_app),
            onTap: () {
              Navigator.pushNamed(context, '/login');
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSessionList() {
    return FutureBuilder<Iterable<Session>>(
      future: _sessions,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return ListView.separated(
            itemCount: snapshot.data.length,
            itemBuilder: (context, index) => ListTile(
              title: Text(
                snapshot.data.elementAt(index).test_purpose,
                maxLines: 1,
                softWrap: false,
                overflow: TextOverflow.ellipsis,
              ),
              subtitle: Text(snapshot.data.elementAt(index).start_time),
              trailing: Icon(Icons.chevron_right),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          SessionPage(session: snapshot.data.elementAt(index))),
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
