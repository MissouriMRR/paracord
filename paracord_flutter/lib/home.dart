import 'package:flutter/material.dart';
import 'package:graphql/internal.dart';
import 'package:paracord_flutter/session.dart';
import 'package:paracord_flutter/user.dart';
import 'package:provider/provider.dart';

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
      if (result.hasErrors) throw result.errors;
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
          Consumer<CurrentUserModel>(
            builder: (context, user, child) => UserAccountsDrawerHeader(
              currentAccountPicture: user.currentUser.avatar,
              accountName: Text(user.currentUser?.email ?? ''),
              
            ),
          ),
          ListTile(
            title: Text('Logout'),
            trailing: Icon(Icons.exit_to_app),
            onTap: () {
              Provider.of<CurrentUserModel>(context, listen: false)
                  .currentUser = null;
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
                    snapshot.data.elementAt(index).startTime?.toString() ??
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
