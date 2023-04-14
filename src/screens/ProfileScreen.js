import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { getUserId, removeToken } from "../utils/storage";
import axios from "../api/axios";

const deleteUser = async () => {
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
      <TouchableOpacity onPress={deleteUser} style={styles.button}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLogout({ navigation })}
        style={styles.button}
      >
        <Text>Logout</Text>
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
  },
  button: {
    backgroundColor: "blue",
    marginTop: 20,
    padding: 10,
  },
});
