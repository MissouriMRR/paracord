import 'package:flutter/material.dart';
import 'package:graphql/client.dart';
import 'package:paracord_flutter/graphQL.dart';

class Frame {
  static final String _queryName = "frames";
  static final String _frameQuery = "query{$_queryName{id,name}}";

  static Future<Iterable<Frame>> fetchFrames() async {
    QueryResult result =
        await client.query(QueryOptions(document: _frameQuery));
    if (result.hasErrors) throw result.errors;
    return (result.data[_queryName] as Iterable)
        .map((frameData) => Frame.fromMap(frameData as Map));
  }

  static Future<Frame> createFrame(Frame frame) async {
    final String mutationName = "createFrame";
    QueryResult result = await client.mutate(MutationOptionsWrapper(
      mutationName: mutationName,
      queries: ["id"],
      variables: <String, dynamic>{
        "name": frame.name,
      },
    ).options);
    if (result.hasErrors) throw result.errors;
    frame.id = result.data[mutationName]['id'];
    return frame;
  }

  int id;
  String name;

  Frame({
    this.id,
    this.name,
  });

  factory Frame.fromMap(Map<String, dynamic> data) => Frame(
        id: data['id'],
        name: data['name'],
      );

  bool get validPost => name != null && name.isNotEmpty;
}

class NewFramePage extends StatefulWidget {
  _NewFramePageState createState() => _NewFramePageState();
}

class _NewFramePageState extends State<NewFramePage> {
  Frame _frame;

  final _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();

    _frame = Frame();

    _nameController.addListener(() {
      _frame.name = _nameController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Frame')),
      body: ListView(
        children: <Widget>[
          ListTile(
            title: TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name'),
            ),
          ),
        ],
      ),
      floatingActionButton: Builder(
        builder: (context) {
          return FloatingActionButton(
            child: Icon(Icons.save),
            onPressed: () async {
              if (!_frame.validPost) {
                Scaffold.of(context).showSnackBar(SnackBar(
                  content: Text("Please complete all required fields"),
                ));
                return;
              }
              await Frame.createFrame(_frame);
              Navigator.pop(context);
            },
          );
        },
      ),
    );
  }
}
