import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ConfirmPopup = ({ visible, children, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          {children}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    padding: 5,
    backgroundColor: "teal",
    flex: 1,
    maxWidth: 50,
    borderRadius: 4,
    marginHorizontal:20
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
   
  },
});

export default ConfirmPopup;
