import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getUserId, getToken } from "../utils/storage";
import axios from "../api/axios";
import Confirm from "../components/Popup/ConfirmPopup";

const deleteUser = async (navigation) => {
  try {
    const id = await getUserId();
    const token = await getToken();
    axios
      .delete("/usuarios/" + id)
      .then((response) => {
        // Si la solicitud es exitosa, navegamos a la pantalla de Tabs
        console.log("Usuario eliminado correctamente");
        // Se almacena el token de usuario

        navigation.reset({
          index: 0,
          routes: [{ name: "FirstScreen" }],
        });
      })
      .catch((error) => {
        // Si la solicitud falla, muestra un mensaje de error
        console.error(error);
        console.log("/usuarios/" + id);
        alert("Error al eliminar usuario. Inténtalo de nuevo más tarde.");
      });
  } catch (error) {
    console.error("Error al eliminar usuario: ", error);
  }
};

const AccountScreen = ({ navigation }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirm = () => {
    // Mostrar la ventana emergente de confirmación
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    // Eliminar el elemento y cerrar la ventana emergente
    setIsPopupOpen(false);
  };

  const closePopups = () => {
    setIsNotifOpen(false);
    setIsPopupOpen(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsPopupOpen(true)}
        style={[styles.button, { marginTop: 60 }]}
      >
        <Image style={styles.icon} source={require("../assets/logout.png")} />
        <Text style={styles.button_text}>Eliminar cuenta</Text>
      </TouchableOpacity>
      <Confirm
        visible={isPopupOpen}
        onConfirm={() => deleteUser(navigation)}
        onCancel={handleCancel}
      >
        <Text style={styles.text}>¿Estás seguro que deseas eliminar tu cuenta de forma permanente?</Text>
      </Confirm>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  button_text: {
    color: "purple",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
  },
  icon: {
    alignSelf: "center",
    width: 25,
    height: 25,
    marginRight: 40,
    tintColor: "purple",
  },
  text:{
    fontSize:18
  }
});
