import 'package:flutter/material.dart';
import 'package:graphql/internal.dart';
import 'package:paracord_flutter/login.dart';
import 'package:paracord_flutter/session.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Stream<Iterable<Session>> _sessionStream;
  ObservableQuery _sessionQuery;

  @override
  void initState() {
    super.initState();
    _sessionQuery = Session.watchSessions();
    _sessionStream = _sessionQuery.stream.map<Iterable<Session>>((result) {
      if (result.loading) return null;
      return (result.data["sessions"] as Iterable)
          .map((sessionData) => Session.fromMap(sessionData as Map));
    });
    _sessionQuery.fetchResults();
    _sessionQuery.startPolling(10);
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
            currentAccountPicture: CircleAvatar(
              child: Text((currentUser?.email != null
                      ? currentUser.email[0]?.toUpperCase()
                      : null) ??
                  'undefined'),
              foregroundColor: Colors.white,
              backgroundColor: Colors.accents[
                  currentUser?.email?.hashCode ?? 0 % Colors.accents.length],
            ),
            accountName: Text(currentUser?.email ?? ''),
            accountEmail: Text(currentUser?.password ?? ''),
          ),
          ListTile(
            title: Text('Organizations'),
            onTap: () {},
          ),
          ListTile(
            title: Text('Logout'),
            trailing: Icon(Icons.exit_to_app),
            onTap: () {
              currentUser = null;
              Navigator.pushNamed(context, '/login');
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSessionList() {
    return StreamBuilder<Iterable<Session>>(
      stream: _sessionStream,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Text("Error: ${snapshot.error.toString()}");
        }
        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            return CircularProgressIndicator();
          case ConnectionState.active:
            if (!snapshot.hasData) return CircularProgressIndicator();
            if (snapshot.data.isEmpty) {
              return Text("No Sessions Available");
            }
            return ListView.separated(
              itemCount: snapshot.data.length,
              itemBuilder: (context, index) => ListTile(
                title: Text(
                  snapshot.data.elementAt(index).purpose ?? "Untitled Session",
                  maxLines: 1,
                  softWrap: false,
                  overflow: TextOverflow.ellipsis,
                ),
                subtitle: Text(
                    snapshot.data.elementAt(index).date?.toString() ??
                        DateTime.fromMillisecondsSinceEpoch(0)),
                trailing: Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => SessionPage(
                            session: snapshot.data.elementAt(index))),
                  );
                },
              ),
              separatorBuilder: (context, index) => Divider(),
            );
          default:
            return Text("An Error has occured");
        }
      },
    );
  }
}
