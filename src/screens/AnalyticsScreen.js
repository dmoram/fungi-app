import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FungiChart from "../components/Chart/FungiChart";
import ClassChart from "../components/Chart/ClassChart";

export default function AnalyticsScreen({ navigation }) {
  const [records, setRecords] = useState([]);
  const [selectedChart, setSelectedChart] = useState("fungi");

  const fungiRecords = [
    { fecha: '2022-01-15', /* otros datos */ },
    { fecha: '2022-01-20', /* otros datos */ },
    { fecha: '2022-02-05', /* otros datos */ },
    { fecha: '2022-06-10', /* otros datos */ },
    { fecha: '2022-07-15', /* otros datos */ },
    { fecha: '2022-06-01', /* otros datos */ },
    { fecha: '2022-05-20', /* otros datos */ },
    { fecha: '2022-05-25', /* otros datos */ },
    { fecha: '2022-05-30', /* otros datos */ },
    { fecha: '2022-06-05', /* otros datos */ },
    { fecha: '2022-07-15', /* otros datos */ },
    { fecha: '2022-09-15', /* otros datos */ },
  ];
  	


  const getRecords = async () => {
    // Lógica para obtener registros
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedChart === "fungi" && styles.selectedButton,
          ]}
          onPress={() => setSelectedChart("fungi")}
        >
          <Text style={styles.buttonText}>Registros de Hongos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedChart === "scatter" && styles.selectedButton,
          ]}
          onPress={() => setSelectedChart("scatter")}
        >
          <Text style={styles.buttonText}>Gráfico de clases</Text>
        </TouchableOpacity>
      </View>
      {selectedChart === "fungi" ? (
        <FungiChart fungiRecords={fungiRecords} />
      ) : (
        <ClassChart/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#FFD300",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
