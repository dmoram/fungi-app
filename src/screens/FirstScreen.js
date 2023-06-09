import React, { useEffect, useState } from "react";
import { getRememberStatus } from "../utils/storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import IntroScreen from "./IntroScreen";

const FirstScreen = ({ navigation }) => {
  const checkRememberStatus = async () => {
    try {
      const status = await getRememberStatus();
      if (status === "true") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkRememberStatus();
  }, []);
  return (
    <View style={styles.container}>
        <Image style={{width:300, height:200, marginTop:100}} source={require("../assets/micelio_logo.png")}/>
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
      
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 5,
    
    textAlign: "center",
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
    padding: 15,
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
    backgroundColor: "#370837",
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonsContainer: {
    alignItems: "center",
    marginTop:20
  },
});
