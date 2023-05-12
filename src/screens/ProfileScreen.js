import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getUserId, removeToken, getToken } from "../utils/storage";
import axios from "../api/axios";
import GlobalStyles from "../styles/GlobalStyles";

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

const handleLogout = async ({ navigation }) => {
  const user_id = await getUserId();
  const token = await getToken();
  console.log(user_id, token);
  axios
    .post(`usuarios/logout/${user_id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("Logged out");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    })
    .catch((error) => console.log("Error al cerrar sesión", error));
};

const getPostCount = async () => {
  const user_id = await getUserId();
  axios
    .get(`/posts/count/${user_id}`)
    .then((response) => {
      return response.data.postCount;
    })
    .catch((error) => console.log("Error al obtener datos", error));
};

function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [postCount, setPostCount] = useState(null);
  const [recordCount, setRecordCount] = useState(null);

  const getUserData = async () => {
    const token = await getToken();
    axios
      .get(`/usuarios/${await getUserId()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get(`/posts/count/${await getUserId()}`)
      .then((response) => setPostCount(response.data.postCount))
      .catch((error) => console.log(error));
    axios
      .get(`/records/count/${await getUserId()}`)
      .then((response) => setRecordCount(response.data.recordCount))
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
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "black",
            marginTop: 80,
          }}
        >
          {userData.username}
        </Text>
        <Text style={{ fontSize: 20, color: "black" }}>
          {userData.fullName}, {userData.age} años
        </Text>
        <Text style={{ fontSize: 20, color: "black" }}>
          {userData.userType}
        </Text>
        <Text>Posts: {postCount}</Text>
        <Text>Records: {recordCount}</Text>
        <TouchableOpacity
          onPress={() => handleLogout({ navigation })}
          style={[styles.button, { marginBottom: 20 }]}
        >
          <Text style={styles.button_text}>Cerrar sesión</Text>
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
    backgroundColor: "#BABE89",
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: -75,
    position: "absolute",
  },
  header: {
    flex: 1,
    backgroundColor: "#ffff",
    width: "100%",
    alignItems: "center",
    marginTop: 100,
    marginBottom: -30,
    borderRadius: 30,
    height: "100%",
    elevation: 10,
  },
  button: {
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    elevation: 1,
  },
  button_text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
  },
});
