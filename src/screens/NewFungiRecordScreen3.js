import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import axios from "../api/axios";
import { getUserId } from "../utils/storage";
import Confirm from "../components/Popup/ConfirmPopup";
import Notif from "../components/Popup/NotifPopup";
import GlobalStyles from "../styles/GlobalStyles";
import { Alert } from "react-native";

const NewFungiRecordScreen3 = ({ navigation, route }) => {
  const { description, textLocation, location, image, fungiClass } =
    route.params;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const handleConfirm = () => {
    // Mostrar la ventana emergente de confirmación
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    // Eliminar el elemento y cerrar la ventana emergente
    setIsPopupOpen(false);
  };

  const checkTemperature = (value) => {
    if (value !== null && value !== "") {
      const temperatureValue = parseFloat(value);
      if (isNaN(temperatureValue)) {
        setMsg("La temperatura debe ser un número válido");
        setIsNotifOpen(true);
        return false;
      }
      // Realiza cualquier otra validación necesaria
      return true;
    } else {
      setMsg("Por favor, ingresa un valor para la temperatura");
      setIsNotifOpen(true);
      return false;
    }
  };

  const checkHumidity = (value) => {
    if (value !== null && value !== "") {
      const humidityValue = parseFloat(value);
      if (isNaN(humidityValue)) {
        setMsg("La humedad debe ser un número válido");
        setIsNotifOpen(true);
        return false;
      }
      // Realiza cualquier otra validación necesaria
      return true;
    } else {
      setMsg("Por favor, ingresa un valor para la humedad");
      setIsNotifOpen(true);
      return false;
    }
  };

  const handlePublish = async ({ navigation }) => {
    checkHumidity(humidity);
    checkTemperature(temperature);
    console.log(temperature);
    console.log(humidity);
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

      data.append("latitude", location.coords.latitude);
      data.append("longitude", location.coords.longitude);
      data.append("altitude", location.coords.altitude);
      data.append("fungiClass", fungiClass);
      data.append("temperature",temperature);
      data.append("humidity", humidity);
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
      <Text style={[styles.title, { paddingHorizontal: 20 }]}>
        Medición de la humedad y temperatura de los sensores
      </Text>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <Text style={{ textAlign: "left", fontSize: 20, paddingLeft: 25 }}>
          Temperatura{"(°C)"}:
        </Text>
        <TextInput
          style={styles.input}
          placeholder=" Escribe aquí"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
        />
      </View>
      <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
        <Text style={{ textAlign: "left", fontSize: 20, paddingLeft: 25 }}>
          Humedad{"(%)"}:{"      "}
        </Text>
        <TextInput
          style={styles.input}
          placeholder=" Escribe aquí"
          value={humidity}
          onChangeText={setHumidity}
          keyboardType="numeric"
        />
      </View>
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
  input: {
    height: 35,
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top",
    fontSize: 17,
    borderRadius: 3,
    backgroundColor: "#F9F9F8",
    marginLeft: 8,
  },
});
