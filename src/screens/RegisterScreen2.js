import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from '../styles/GlobalStyles'
import axios from "../api/axios";


const RegisterScreen2 = ({ navigation, route }) => {
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("");
  const { username, fullName, email, password, gender } = route.params;
  const options = [
    { name: "Principiante", img: require("../assets/forum.png") },
    { name: "Aficionado", img: require("../assets/forum.png") },
    { name: "Micólogo(a) amaterur", img: require("../assets/forum.png") },
    { name: "Micólogo(a) experto", img: require("../assets/forum.png") },
  ];

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
      const response = await axios.post('/usuarios', data);
      console.log(response.data);
      if (response.data.ok) {
        navigation.navigate('Login');
      }
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
  const validarEdad = (edad) => {
    const parsedEdad = parseInt(edad, 10);
    if (isNaN(parsedEdad)) {
      alert("La edad debe ser un número.");
      return false;
    }
    if (parsedEdad < 18 || parsedEdad > 99) {
      alert("La edad debe estar entre 18 y 99 años.");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (!age || !userType) {
      alert("Por favor, completa todos los campos.");
      return false;
    }
    return !!validarEdad(age);
  };
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Registro: Paso 2</Text>
      <Text style={GlobalStyles.description}>Indique su edad</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={GlobalStyles.description}>Indica tu nivel de conocimiento</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            width: "80%",
            padding: 20,
            margin: 5,
            flexDirection: "row",
            backgroundColor: userType === option.name ? "#4caf50" : "#fff",
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
        <Text style={styles.text}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen2;

const styles = StyleSheet.create({
  picker: {
    width: "80%",
    borderWidth: 2,
    color: "white",
    borderColor: "#204850",
    borderRadius: 10,
    backgroundColor: "#8B0000",
  },
  button: {
    backgroundColor: "#204850",
    padding: 18,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 16,
    right: 16,
    borderRadius: 15,
    elevation:5
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 30,
  },
});
