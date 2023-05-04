import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const FungiSensorScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.text}>
        Explora el mundo fúngico desde una perspectiva completamente nueva en
        esta sección
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewFungiRecordScreen1")}>
          <Text style={styles.buttonText}>Agregar registro fungi</Text>
          <Image
            source={require("../assets/hh_1.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#788E91" }]} onPress={() => navigation.navigate("FungiRecordsScreen2")}>
          <Text style={styles.buttonText}>Ver registros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FungiSensorScreen;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#BABE89",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderRadius: 10,
    marginBottom:20,
  },
  buttonContainer: {
    flex:1,
    justifyContent: "space-between",
    alignItems: "center",
    width:"90%"
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 40,
    marginHorizontal: 10,
  },
  image: {
    resizeMode:"contain",
    width: 350,
    height: 200,
  },
  buttonText:{
    fontSize:20,
    fontWeight:"bold"
  }
});
