import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import { getUserId } from "../utils/storage";
import axios from "../api/axios";
import Confirm from "../components/Popup/ConfirmPopup";
import Notif from "../components/Popup/NotifPopup";
import Upload from "../components/Popup/UploadPopup";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import CameraComponent from "../components/Camera/CameraComponent";

const NewPostScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [image, setImage] = useState(null);

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

  const handlePublish = async () => {
    const id = await getUserId();
    const likes = 0;

    // Crear un objeto FormData
    const data = new FormData();

    // Agregar el contenido del post al FormData
    data.append("content", text);

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
    data.append("likes", likes);

    axios
      .post("/posts", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMsg("Publicación creada");
        setIsNotifOpen(true);
      })
      .catch((error) => {
        // Si la solicitud falla, muestra un mensaje de error
        console.error(error);
        Alert.alert("Error al publicar", "Inténtalo de nuevo más tarde.");
      });
  };
  return (
    <View style={GlobalStyles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe aquí"
        multiline={true}
        numberOfLines={10}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => setIsCameraOpen(true)}
        visible={!isImgLoaded}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={GlobalStyles.button_text}>Subir Imagen </Text>
          <Image
            style={styles.img_icon}
            source={require("../assets/image_icon.png")}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[GlobalStyles.button, { marginTop: 40 }]}
        onPress={handleConfirm}
      >
        <Text style={GlobalStyles.button_text}>Publicar</Text>
      </TouchableOpacity>
      <Confirm
        visible={isPopupOpen}
        onConfirm={handlePublish}
        onCancel={handleCancel}
      >
        <Text style={styles.text}>¿Estás seguro que deseas publicar?</Text>
      </Confirm>
      <Notif
        visible={isNotifOpen}
        onConfirm={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.text}>{msg}</Text>
      </Notif>
      <CameraComponent visible={isCameraOpen} onPictureTaken={saveImage} />
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  input: {
    height: 200,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top",
    fontSize: 17,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    marginTop: 30,
    backgroundColor: "teal",
  },
  text: {
    fontSize: 16,
  },
  img_icon: {
    tintColor: "white",
    width: 30,
    height: 30,
  },
});
