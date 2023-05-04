import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import GlobalStyles from "../styles/GlobalStyles";
import CameraComponent from "../components/Camera/CameraComponent";
import axios from "../api/axios";
import { getUserId } from "../utils/storage";
import Confirm from "../components/Popup/ConfirmPopup";
import Notif from "../components/Popup/NotifPopup";
import { Alert } from "react-native";

const FungiRecordScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [description, setDecription] = useState("");
  const [msg, setMsg] = useState("");
  const [textLocation, setTextLocation] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const [userType, setUserType] = useState("");
  const classes = [
    { name: "Conoide", img: require("../assets/principiante.png") },
    { name: "Callampa", img: require("../assets/observador.png") },
    { name: "Globo", img: require("../assets/aficionado.png") },
    { name: "Sésiles", img: require("../assets/experto.png") },
    { name: "Ga", img: require("../assets/investigador.png") },
  ];

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location);
  };

  const saveImage = (image) => {
    setImage(image); // solo almacena el URI de la imagen seleccionada
    setIsImgLoaded(true);
    setIsCameraOpen(false);
    console.log(image);
  };

  const handleConfirm = () => {
    // Mostrar la ventana emergente de confirmación
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    // Eliminar el elemento y cerrar la ventana emergente
    setIsPopupOpen(false);
  };

  const handlePublish = async ({ navigation }) => {
    if (!description) {
      setMsg("Por favor, brinda una breve descripción de tu publicación");
      setIsNotifOpen(true);
    } else {
      const id = await getUserId();

      // Crear un objeto FormData
      const data = new FormData();

      // Agregar el contenido del post al FormData
      data.append("description", description);

      // Si hay una imagen seleccionada, agregarla al FormData
      if (image) {
        const localUri = image;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        // Agregar la imagen al FormData
        data.append("image", { uri: localUri, name: filename, type });
      }

      // Agregar el id del usuario y los likes al FormData
      data.append("author_id", id);
      data.append("location", textLocation);

      await getLocation();

      data.append("latitude", location.coords.latitude);
      data.append("longitude", location.coords.longitude);
      data.append("altitude", location.coords.altitude);
      console.log(data);
      axios
        .post("/records", data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          setMsg("Publicación creada");
          setIsNotifOpen(true);
          console.log(response);
        })
        .catch((error) => {
          // Si la solicitud falla, muestra un mensaje de error
          console.error(error);
          Alert.alert("Error al publicar", "Inténtalo de nuevo más tarde.");
        });
    }
  };
  const closePopups = () => {
    setIsNotifOpen(false);
    setIsPopupOpen(false);
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Parte 1: Datos generales</Text>
      <View style={styles.box}>
        <Text style={styles.text}>Descripción del registro</Text>
        <TextInput
          style={styles.input}
          placeholder=" Escribe aquí"
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => setDecription(text)}
          value={description}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Localidad del registro</Text>
        <TextInput
          style={styles.input}
          placeholder=" Escribe aquí"
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => setTextLocation(text)}
          value={textLocation}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Agregar foto del registro</Text>
        {image && (
          <View style={{ flexDirection: "row", width: "90%" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 16,
                justifyContent: "center",
                marginLeft: 3,
              }}
            >
              Foto cargada correctamente
            </Text>
            <Image
              style={{ height: 25, width: 25, marginLeft: 7 }}
              source={require("../assets/ok_icon.png")}
            />
          </View>
        )}
        <TouchableOpacity
          style={[GlobalStyles.button, { marginTop: 15 }]}
          onPress={() => setIsCameraOpen(true)}
          visible={!isImgLoaded}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={GlobalStyles.button_text}>Subir foto </Text>
            <Image
              style={styles.img_icon}
              source={require("../assets/image_icon.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          GlobalStyles.button,
          { alignSelf: "flex-end", marginRight: 10 },
        ]}
        onPress={() => navigation.navigate("NewFungiRecordScreen2",{description: description, textLocation: textLocation,location: location, image: image})}
      >
        <Text style={GlobalStyles.button_text}>Siguiente</Text>
      </TouchableOpacity>
      <CameraComponent
        visible={isCameraOpen}
        onPictureTaken={saveImage}
        onClose={() => setIsCameraOpen(false)}
      />
      <Confirm
        visible={isPopupOpen}
        onConfirm={handlePublish}
        onCancel={handleCancel}
      >
        <Text style={styles.text}>¿Estás seguro que deseas publicar?</Text>
      </Confirm>
      <Notif
        visible={isNotifOpen}
        onConfirm={() => {
          description ? navigation.navigate("Tabs") : closePopups();
        }}
      >
        <Text style={styles.text}>{msg}</Text>
      </Notif>
    </View>
  );
};

export default FungiRecordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    height: 100,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top",
    fontSize: 17,
    borderRadius: 10,
    backgroundColor: "#F9F9F8",
  },
  button: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "teal",
  },
  text: {
    textAlign: "left",
    width: "100%",
    fontSize: 18,
    marginLeft: 40,
    marginVertical: 10,
  },
  img_icon: {
    tintColor: "white",
    width: 30,
    height: 30,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  box: {
    width: "95%",
    alignItems: "center",
    backgroundColor: "#BABE89",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
});
