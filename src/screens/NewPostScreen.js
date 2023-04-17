import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import { getUserId } from "../utils/storage";
import axios from '../api/axios'

const handlePublish = async (text) => {
  const id = await getUserId();
  const img = "";
  axios
    .post("/posts", {content: text, image: img, author_id: id})
    .then((response) => {
      // Si la solicitud es exitosa, navegamos a la pantalla de Tabs
      // Se almacena el token de usuario

    })
    .catch((error) => {
      // Si la solicitud falla, muestra un mensaje de error
      console.error(error);
      alert("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
    });
};

const NewPostScreen = () => {
  const [text, setText] = useState("");
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
      <TouchableOpacity style={styles.button} onPress={() => handlePublish(text)}>
        <Text>Publicar!</Text>
      </TouchableOpacity>
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
});
