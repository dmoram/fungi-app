import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { getUserId, removeToken } from "../utils/storage";
import axios from "../api/axios";
import GlobalStyles from "../styles/GlobalStyles"

const deleteUser = async (navigation) => {
  try {
    const id = await getUserId();
    console.log(id);
    axios
      .delete("/usuarios/" + id)
      .then((response) => {
        // Si la solicitud es exitosa, navegamos a la pantalla de Tabs
        console.log("Usuario eliminado correctamente");
        // Se almacena el token de usuario

        navigation.navigate("FirstScreen");
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


const handleLogout = async ({ navigation }) => {
  try {
    await removeToken();
    console.log("Logged out");
    navigation.navigate("Login");
  } catch (error) {
    console.log("Error al cerrar sesión", error);
  }
};

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => handleLogout({ navigation })}
        style={[GlobalStyles.button,{marginBottom:20}]}
      >
        <Text style={GlobalStyles.button_text}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteUser(navigation)} style={GlobalStyles.button}>
        <Text style={GlobalStyles.button_text}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
