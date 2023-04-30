import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getUserId, removeToken } from "../utils/storage";
import axios from "../api/axios";
import GlobalStyles from "../styles/GlobalStyles";

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

const handleLogout = async ({ navigation }) => {
  try {
    await removeToken();
    console.log("Logged out");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  } catch (error) {
    console.log("Error al cerrar sesión", error);
  }
};

function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    axios
      .get(`/usuarios/${await getUserId()}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/profile_icon.png")}
          style={styles.image}
        ></Image>
        <Text style={{ fontSize: 30, fontWeight: "bold", color:"white"}}>
          {userData.username}
        </Text>
        <Text style={{ fontSize: 20 , color:"white"}}>
          {userData.fullName}, {userData.age} años
        </Text>
        <Text style={{ fontSize: 20 , color:"white"}}>{userData.userType}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => handleLogout({ navigation })}
          style={[GlobalStyles.button, { marginBottom: 20 }]}
        >
          <Text style={GlobalStyles.button_text}>Cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteUser(navigation)}
          style={GlobalStyles.button}
        >
          <Text style={GlobalStyles.button_text}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  image: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 20,
  },
  header: {
    flex: 1,
    backgroundColor: "#727D15",
    width: "95%",
    alignItems: "center",
    elevation:9,
    borderRadius:10
  },
  optionsContainer:{
    flex:1
  }
});
