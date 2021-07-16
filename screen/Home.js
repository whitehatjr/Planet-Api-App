import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";
import { ActivityIndicator } from "react-native";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `http://127.0.0.1:5000/`,
      listData: [],
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          listData: res.data.data,
        });
        // console.log(this.state.listData);
      })
      .catch((err) => console.log(err.message));
  };

  renderItem = ({ item, index }) => (
    <ListItem
      bottomDivider
      key={index}
      onPress={() =>
        this.props.navigation.navigate("Details", {
          planetName: item.name,
        })
      }
    >
      <ListItem.Content>
        <ListItem.Title>Planet: {item.name}</ListItem.Title>
        <ListItem.Subtitle>
          Description: {item.distance_from_earth}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.listData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
