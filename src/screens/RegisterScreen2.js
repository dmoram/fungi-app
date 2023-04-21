import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import axios from "../api/axios";
import Notif from "../components/Popup/NotifPopup";

const RegisterScreen2 = ({ navigation, route }) => {
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("");
  const { username, fullName, email, password, gender } = route.params;
  const options = [
    { name: "Principiante", img: require("../assets/principiante.png") },
    { name: "Observador(a)", img: require("../assets/observador.png") },
    { name: "Aficionado(a)", img: require("../assets/aficionado.png") },
    { name: "Experto(a)", img: require("../assets/experto.png") },
    { name: "Investigador(a)", img: require("../assets/investigador.png") },
  ];
  const [errMsg, setErrMsg] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirm = () => {
    // Mostrar la ventana emergente de confirmación
    setIsPopupOpen(false);
  };

  const handleSelect = (option) => {
    if (userType === option) {
      setUserType("");
    } else {
      setUserType(option);
    }
  };

  //console.log(username, fullName, email, password, selectedGender )

  const registerUser = async () => {
    const data = {
      username,
      fullName,
      email,
      password,
      gender,
      age: parseInt(age),
      userType,
    };

    try {
      const response = await axios.post("/usuarios", data);
      console.log(response.data);
      if (response.data.ok) {
        navigation.navigate("Login");
      }
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
  const validarEdad = (edad) => {
    const parsedEdad = parseInt(edad, 10);
    if (isNaN(parsedEdad)) {
      setErrMsg("La edad debe ser un número.");
      setIsPopupOpen(true);
      return false;
    }
    if (parsedEdad < 12 || parsedEdad > 99) {
      setErrMsg("La edad debe estar entre 12 y 99 años.");
      setIsPopupOpen(true);
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (!age) {
      setErrMsg("Por favor, indica tu edad");
      setIsPopupOpen(true);
      return false;
    } else if (!userType) {
      setErrMsg("Por favor, indica una categoría de usuario");
      setIsPopupOpen(true);
      return false;
    }
    return !!validarEdad(age);
  };
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.description}>Indica tu edad</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={[GlobalStyles.description,{marginBottom:5}]}>
        ¿Qué tanto sabes del mundo Fungi?
      </Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 25,
            width: "80%",
            padding: 20,
            margin: 5,
            flexDirection: "row",
            backgroundColor: userType === option.name ? "#448066" : "#fff",
          }}
          onPress={() => handleSelect(option.name)}
        >
          <Image source={option.img} style={styles.logo}></Image>
          <Text
            style={{
              color: userType === option.name ? "#fff" : "#000",
              textAlign: "center",
              fontSize: 17,
            }}
          >
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (handleRegister()) {
            registerUser();
          }
        }}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
      <Notif visible={isPopupOpen} onConfirm={handleConfirm}>
        <Text style={styles.text}>{errMsg}</Text>
      </Notif>
    </View>
  );
};

export default RegisterScreen2;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#204850",
    padding: 18,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 16,
    right: 16,
    borderRadius: 15,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 30,
  },
});
