import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/hongo_bg.jpg")}
        style={styles.image}
      />
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
      <TouchableOpacity
        style={[styles.button,{ marginTop: 15 }]}
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
    paddingHorizontal: 5,
    marginTop: 120,
  },
  text: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 40,
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#0D4A4D",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: "40%",
    elevation: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  box: {
    marginTop: 20,
    backgroundColor: "#3D1A50",
    borderRadius: 10,
    opacity: 0.75,
    paddingVertical: 20,
  },
});
