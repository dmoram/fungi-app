import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";

const NewFungiRecordScreen2 = ({ navigation, route }) => {
  const {description, textLocation, location, image} = route.params
  const [fungiClass, setFungiClass] = useState("");
  const classes = [
    { name: "Globoideo", description:"asd", img: require("../assets/globoideo.png") },
    { name: "Aspecto de copa", description:"asd",  img: require("../assets/copa.png") },
    { name: "Sésiles", description:"asd", img: require("../assets/sesil.png") },
    { name: "Aspecto gelatinoso", description:"asd", img: require("../assets/gelatinoso.png") },
    { name: "Estipitado", description:"asd", img: require("../assets/estipitado.png") },
  ];

  const handleSelect = (option) => {
    if (fungiClass === option) {
      setFungiClass("");
    } else {
      setFungiClass(option);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parte 2: Clasificación</Text>
      {classes.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 25,
            width: "95%",
            padding: 20,
            elevation: 6,
            margin: 5,
            flexDirection: "row",
            backgroundColor: fungiClass === option.name ? "#448066" : "#fff",
          }}
          onPress={() => handleSelect(option.name)}
        >
          <Image source={option.img} style={styles.logo}></Image>
          <Text
            style={{
              color: fungiClass === option.name ? "#fff" : "#000",
              textAlign: "center",
              fontSize: 17,
            }}
          >
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          GlobalStyles.button,
          { alignSelf: "flex-end", marginRight: 10 },
        ]}
        onPress={() => navigation.navigate("NewFungiRecordScreen3")}
      >
        <Text style={GlobalStyles.button_text}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewFungiRecordScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  input: {
    height: 100,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top",
    fontSize: 17,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "teal",
  },
  text: {
    textAlign: "left",
    width: "100%",
    fontSize: 18,
    marginLeft: 40,
    marginTop: 20,
    marginVertical: 5,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
});
