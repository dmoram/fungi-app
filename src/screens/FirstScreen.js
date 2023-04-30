import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fungi.png")}
        style={styles.image}
      >
        <Text style={styles.title}>
          ¡Bienvenido a la comunidad de los amantes de los hongos!{" "}
        </Text>
        <View style={styles.box}>
          <Text style={styles.text}>
            Explora y aprende sobre los hongos más fascinantes del reino fungi,
            conecta con otros apasionados como tú y comparte tus experiencias.{" "}
          </Text>
          <Text style={styles.text}>¡Regístrate ahora para comenzar!</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { marginTop: 15 }]}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.buttonText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight:"bold",
    paddingHorizontal: 5,
    marginTop: 90,
    textAlign:"center"
  },
  text: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 40,
    textAlign: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#0D4A4D",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  box: {
    marginTop: 20,
    backgroundColor: "#2D3200",
    borderRadius: 10,
    opacity: 0.8,
    paddingVertical: 20,
  },
  buttonsContainer:{
    alignItems:"center"
  }
});
