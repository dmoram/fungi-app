import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const MapComponent = ({ visible, latitude, longitude, description, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          backgroundColor: "#370837",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{ marginLeft: 10, marginVertical: 7 }}
        >
          <Image
            style={{
              tintColor: "white",
              width: 35,
              height: 35,
            }}
            source={require("../../assets/close_icon.png")}
          />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            color: "white",
            fontSize: 20,
            textAlign: "center",
            marginRight: 50,
          }}
        >
          Mapa
        </Text>
      </View>
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude, // Latitud de Valdivia, Chile
          longitude: longitude, // Longitud de Valdivia, Chile
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
            title={description}
        />
        
      </MapView>
    </View>
    </Modal>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
