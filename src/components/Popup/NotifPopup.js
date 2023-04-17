import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';


const Popup = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.button}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  popup: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    marginTop: 30,
    backgroundColor:'teal'
  }
});

export default Popup;
