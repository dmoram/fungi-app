import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "../api/axios";
import { getUserId } from "../utils/storage";
import Confirm from "../components/Popup/ConfirmPopup";
import Notif from "../components/Popup/NotifPopup";
import GlobalStyles from "../styles/GlobalStyles";

const NewFungiRecordScreen3 = ({ navigation }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [msg, setMsg] = useState("");

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
    <View style={styles.container}>
      <Text style={styles.title}>Parte 3: Captura de datos</Text>
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
        onConfirm={() => {
          description ? navigation.navigate("Tabs") : closePopups();
        }}
      >
        <Text style={styles.text}>{msg}</Text>
      </Notif>
    </View>
  );
};

export default NewFungiRecordScreen3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  input: {
    height: 100,
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
    textAlign: "left",
    width: "100%",
    fontSize: 18,
    marginLeft: 40,
    marginTop: 20,
    marginVertical: 5,
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
});
