import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";

const UploadPopup = ({ visible, onPressCamera, onPressFromDevice }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={{fontSize:20}}>Seleccione medio</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPressCamera} style={styles.button}>
              <Text style={styles.buttonText}>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressFromDevice} style={styles.button}>
              <Text style={styles.buttonText}>Elegir de galería</Text>
            </TouchableOpacity>  
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UploadPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    width: "85%",
  },
  button: {
    padding: 15,
    backgroundColor: "teal",
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical:15
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 40,
  },
});
