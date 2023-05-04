import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";

export default function CameraComponent({ onPictureTaken, visible, onClose }) {
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
      <View
        style={{
          backgroundColor: "#370837",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={onClose} style={{ marginLeft: 10, marginVertical:7 }}>
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
            marginRight:50
          }}
        >
          Cámara
        </Text>
      </View>

      {!image ? (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1, paddingBottom: 100 }} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePictureTaken}
              >
                <Image
                  style={[styles.icon, { width: 60, height: 60 }]}
                  source={require("../../assets/take_pic_icon.png")}
                />
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
            <TouchableOpacity onPress={handlePictureCancel}>
              <Image
                source={require("../../assets/repeat_icon.png")}
                style={[styles.icon, { width: 64, height: 64 }]}
              ></Image>
              <Text style={{ color: "white", textAlign: "center" }}>
                Reintentar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePictureSend}>
              <Image
                source={require("../../assets/tick_icon.png")}
                style={[
                  styles.icon,
                  { alignSelf: "center", marginVertical: 5 },
                ]}
              ></Image>
              <Text style={{ color: "white" }}>Seleccionar</Text>
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
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
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
