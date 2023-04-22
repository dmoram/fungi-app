import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import { getUserId } from "../utils/storage";
import axios from "../api/axios";
import Confirm from "../components/Popup/ConfirmPopup";
import Notif from "../components/Popup/NotifPopup";
import * as ImagePicker from "expo-image-picker";

const NewPostScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
      <TouchableOpacity onPress={pickImage}>
        <Text>Subir Imagen</Text>
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
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
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
});
