import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";

const NewFungiRecordScreen2 = ({ navigation, route }) => {
  const { description, textLocation, location, image } = route.params;
  const [fungiClass, setFungiClass] = useState(0);
  const classes = [
    {
      id:1,
      name: "Globoideo",
      description:
        "Los hongos con forma globosa tienen una apariencia redondeada o esférica",
      img: require("../assets/globoideo.png"),
    },
    {
      id:2,
      name: "Aspecto de copa",
      description: "Tienen forma de copa o cúpula, con un cuerpo en forma de taza y un borde enrollado hacia adentro",
      img: require("../assets/copa.png"),
    },
    {
      id:3,
      name: "Sésiles",
      description:
        "No tienen un tallo o pie claramente definido",
      img: require("../assets/sesil.png"),
    },
    {
      id:4,
      name: "Aspecto gelatinoso",
      description:
        "Los hongos de forma gelatinosa tienen una consistencia suave y gelatinosa",
      img: require("../assets/gelatinoso.png"),
    },
    {
      id:5,
      name: "Pileado",
      description:
        "Tienen una forma de sombrero distintiva con un sombrero convexo y un pie central",
      img: require("../assets/estipitado.png"),
    },
  ];

  const handleSelect = (option) => {
    if (fungiClass === option) {
      setFungiClass(0);
    } else {
      setFungiClass(option);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parte 2: Clasificación</Text>
      {classes.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 25,
            width: "95%",
            padding: 20,
            elevation: 6,
            margin: 5,
            flexDirection: "row",
            backgroundColor: fungiClass === option.id ? "#448066" : "#fff",
          }}
          onPress={() => handleSelect(option.id)}
        >
          <Image source={option.img} style={styles.logo}></Image>
          <View >
            <Text
              style={{
                color: fungiClass === option.id ? "#fff" : "#000",
                textAlign: "left",
                fontSize: 17,
              }}
            >
              {option.name}
            </Text>
            <Text style={{textAlign:"justify", marginRight:70, color: fungiClass === option.id ? "#fff" : "#000",}}>{option.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          GlobalStyles.button,
          { alignSelf: "flex-end", marginRight: 10 },
        ]}
        onPress={() => navigation.navigate("NewFungiRecordScreen3", {description: description, textLocation: textLocation,location: location, image: image, fungiClass: fungiClass})}
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
