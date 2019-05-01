import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body
} from "native-base";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Content>
          <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Item 1</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Item 2</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Item 3</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
