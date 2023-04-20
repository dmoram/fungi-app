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

const NewPostScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

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
    const img = "";
    const likes = 0;

    axios
      .post("/posts", {
        content: text,
        image: img,
        author_id: id,
        likes: likes,
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
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text>Publicar</Text>
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
