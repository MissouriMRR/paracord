import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:graphql/internal.dart';
import 'package:paracord_flutter/drone.dart';
import 'package:paracord_flutter/graphQL.dart';
import 'package:paracord_flutter/transition.dart';
import 'package:paracord_flutter/user.dart';
import 'package:provider/provider.dart';

class Organization {
  static final String _queryName = "organizations";
  static final String _queryArgs = "id,name,users{id,email},drones{id,name}";
  static final String _queryDocument = "query{$_queryName{$_queryArgs}}";

  static Future<Iterable<Organization>> fetchOrganizations() async {
    QueryResult result =
        await client.query(QueryOptions(document: _queryDocument));
    if (result.hasErrors) throw result.errors;
    return (result.data[_queryName] as Iterable).map(
        (organizationData) => Organization.fromMap(organizationData as Map));
  }

  static ObservableQuery watchOrganizations() {
    // TODO gql subscriptions
    return client.watchQuery(WatchQueryOptions(document: _queryDocument));
  }

  static Future<Organization> createOrganization(
      Organization organization) async {
    final String mutationName = "createOrganization";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id", "name"],
      variables: <String, dynamic>{"name": organization.name},
    ).options);
    if (result.hasErrors) throw result.errors;
    organization = Organization.fromMap(result.data);
    organization.users = [];
    organization.drones = [];
    return organization;
  }

  static Future<void> addUserToOrganization(
      Organization organization, User user) async {
    final String mutationName = "addUserToOrganization";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id"],
      variables: <String, dynamic>{
        "orgid": organization.id,
        "userid": user.id,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
  }

  

  int id;
  String name;
  List<User> users;
  List<Drone> drones;

  Organization({
    this.id,
    this.name,
    this.users,
    this.drones,
  });

  factory Organization.fromMap(Map<String, dynamic> data) => Organization(
        id: data['id'],
        name: data['name'],
        users: (data['users'] as List<dynamic>)
            .map((userData) => User.fromMap(userData))
            .toList(),
        drones: (data['drones'] as List<dynamic>)
            .map((droneData) => Drone.fromMap(droneData))
            .toList(),
      );

  /// true if all fields required to post are non-null
  get validPost => name != null;
}

class OrganizationPage extends StatefulWidget {
  final Organization organization;
  final int initialTab;

  OrganizationPage({Key key, @required this.organization, this.initialTab})
      : assert(organization != null),
        super(key: key);

  _OrganizationPageState createState() => _OrganizationPageState();
}

class _OrganizationPageState extends State<OrganizationPage>
    with SingleTickerProviderStateMixin {
  Iterable<User> _users;
  Iterable<Drone> _drones;
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: 2);
    _tabController.index = widget.initialTab ?? 0;
    _users = widget.organization.users;
    _drones = widget.organization.drones;
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
        title: Text(widget.organization.name),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'MEMBERS'),
            Tab(text: 'DRONES'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          Center(child: _buildUsersTab()),
          Center(child: _buildDronesTab()),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          switch (_tabController.index) {
            case 0:
              if (widget.organization.users.any((user) =>
                  user.id ==
                  Provider.of<CurrentUserModel>(context, listen: false)
                      .currentUser
                      .id)) {
                  //TODO LEAVE
              } else {
                Organization.addUserToOrganization(
                    widget.organization,
                    Provider.of<CurrentUserModel>(context, listen: false)
                        .currentUser);

                setState(() {
                  widget.organization.users.add(
                      Provider.of<CurrentUserModel>(context, listen: false)
                          .currentUser);
                });
              }
              break;
            case 1:
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      NewDronePage(organization: widget.organization),
                ),
              );
              break;
          }
        },
        icon: Icon(Icons.add),
        label: SwapTransition(
          progress: _tabController.animation,
          children: [
            widget.organization.users.any((user) =>
                    user.id ==
                    Provider.of<CurrentUserModel>(context, listen: false)
                        .currentUser
                        .id)
                ? Text('LEAVE')
                : Text('JOIN'),
            Text('ADD')
          ],
        ),
      ),
    );
  }

  Widget _buildUsersTab() {
    return ListView.separated(
      itemCount: _users.length,
      itemBuilder: (context, index) => ListTile(
        title: Text(
          _users.elementAt(index).email ?? "error",
          maxLines: 1,
          softWrap: false,
          overflow: TextOverflow.ellipsis,
        ),
        leading: _users.elementAt(index).avatar,
      ),
      separatorBuilder: (context, index) => Divider(),
    );
  }

  Widget _buildDronesTab() {
    return ListView.separated(
      itemCount: _drones.length,
      itemBuilder: (context, index) => ListTile(
        title: Text(
          _drones.elementAt(index).name ?? "error",
          maxLines: 1,
          softWrap: false,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: Icon(Icons.chevron_right),
      ),
      separatorBuilder: (context, index) => Divider(),
    );
  }
}

class OrganizationListPage extends StatefulWidget {
  OrganizationListPage({Key key}) : super(key: key);

  @override
  _OrganizationListPageState createState() => _OrganizationListPageState();
}

class _OrganizationListPageState extends State<OrganizationListPage> {
  Stream<Iterable<Organization>> _organizationStream;
  ObservableQuery _organizationQuery;

  @override
  void initState() {
    super.initState();
    _organizationQuery = Organization.watchOrganizations();
    _organizationStream =
        _organizationQuery.stream.map<Iterable<Organization>>((result) {
      if (result.loading) return null;
      if (result.hasErrors) throw result.errors;
      return (result.data["organizations"] as Iterable).map(
          (organizationData) => Organization.fromMap(organizationData as Map));
    });
    _organizationQuery.fetchResults();
    _organizationQuery.startPolling(10);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Organizations'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      body: Center(child: _buildOrganizationList()),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => NewOrganizationPage()),
          );
        },
        tooltip: 'Add Organization',
        child: Icon(Icons.add),
      ),
    );
  }

  Widget _buildOrganizationList() {
    return StreamBuilder<Iterable<Organization>>(
        stream: _organizationStream,
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
                return Text("No Organizations Available");
              }
              return ListView.separated(
                itemCount: snapshot.data.length,
                itemBuilder: (context, index) => ListTile(
                  title: Text(
                    snapshot.data.elementAt(index).name,
                    maxLines: 1,
                    softWrap: false,
                    overflow: TextOverflow.ellipsis,
                  ),
                  subtitle: Text(
                      "${snapshot.data.elementAt(index).users.length} members"),
                  trailing: Icon(Icons.chevron_right),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => OrganizationPage(
                              organization: snapshot.data.elementAt(index))),
                    );
                  },
                ),
                separatorBuilder: (context, index) => Divider(),
              );
            default:
              return Text("An Error has occured");
          }
        });
  }
}

class NewOrganizationPage extends StatefulWidget {
  @override
  _NewOrganizationPageState createState() => _NewOrganizationPageState();
}

class _NewOrganizationPageState extends State<NewOrganizationPage> {
  Organization _organization;

  final _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _organization = Organization();

    _nameController.addListener(() {
      _organization.name = _nameController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Organization')),
      body: DropdownButtonHideUnderline(
        child: ListView(
          children: <Widget>[
            ListTile(
              title: TextField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Name'),
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
              if (!_organization.validPost) {
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text("Please complete all required fields"),
                ));
                return;
              }
              await Organization.createOrganization(_organization);
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        OrganizationPage(organization: _organization)),
              );
            },
          );
        },
      ),
    );
  }
}
