import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import axios from "axios";
import { Card } from "react-native-elements";
import { ImageBackground } from "react-native";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `http://127.0.0.1:5000/planet?name=${this.props.route.params.planetName}`,
      planetDetails: [],
      image: "",
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
          planetDetails: res.data.data,
        });
        this.setImage();
        // console.log(this.state.planetDetails);
      })
      .catch((err) => console.log(err.message));
  };

  setImage = () => {
    const type = this.state.planetDetails.planet_type;
    let path = "";
    switch (type) {
      case "Gas Giant":
        path = require("../assets/type/gas_giant.png");
        break;
      case "Terrestrial":
        path = require("../assets/type/terrestrial.png");
        break;
      case "Super Earth":
        path = require("../assets/type/super_earth.png");
        break;
      case "Neptune Like":
        path = require("../assets/type/neptune_like.png");
        break;
      default:
        path = require("../assets/type/gas_giant.png");
    }

    this.setState({
      image: path,
    });
  };

  render() {
    const { planetDetails, image } = this.state;
    return (
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <StatusBar hidden />
          <Image
            source={image}
            style={{
              width: 130,
              height: 130,
              borderRadius: 130,
              borderWidth: 5,
              borderColor: "#fff",
            }}
          />
          <View>
            <Card>
              <Card.Title>Name: {planetDetails.name}</Card.Title>
              <Card.Title>Gravity: {planetDetails.gravity}</Card.Title>
              <Card.Title>Mass: {planetDetails.planet_mass}</Card.Title>
              <Card.Title>Radius: {planetDetails.planet_radius}</Card.Title>
              <Card.Title>Type: {planetDetails.planet_type}</Card.Title>
              <Card.Title>
                Orbital Speed: {planetDetails.orbital_speed}
              </Card.Title>
              <Card.Title>
                Orbital Period: {planetDetails.orbital_period}
              </Card.Title>
            </Card>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
