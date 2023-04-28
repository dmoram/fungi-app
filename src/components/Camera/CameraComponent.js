import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";

export default function CameraComponent({ onPictureTaken, visible }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handlePictureTaken = async () => {
    if (cameraRef.current) {
      setLoading(true); // activar vista de carga
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data);
      setLoading(false); // desactivar vista de carga
    }
  };

  const handlePictureSend = () => {
    setImage(null);
    onPictureTaken(image.uri);
  };

  const handlePictureCancel = () => {
    setImage(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      {!image ? (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1, paddingBottom: 100 }} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePictureTaken}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Capturar
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + image.base64 }}
          />
          <View
            style={[
              styles.buttonContainer,
              { flexDirection: "row", justifyContent: "space-evenly" },
            ]}
          >
            <TouchableOpacity onPress={handlePictureSend}>
              <Image
                source={require("../../assets/tick_icon.png")}
                style={styles.icon}
              ></Image>
              <Text style={{ color: "white" }}>Seleccionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePictureCancel}>
              <Image
                source={require("../../assets/cancel_icon.png")}
                style={styles.icon}
              ></Image>
              <Text style={{ color: "white" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Vista de carga */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
