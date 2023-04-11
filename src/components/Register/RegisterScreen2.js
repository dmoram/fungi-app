import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";

const RegisterScreen2 = ({ navigation, route }) => {
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("");
  const { username, fullName, email, password, gender } = route.params;
  const options = [
    { name: "Principiante", img: require("../../assets/forum.png") },
    { name: "Aficionado", img: require("../../assets/forum.png") },
    { name: "Micólogo(a) amaterur", img: require("../../assets/forum.png") },
    { name: "Micólogo(a) experto", img: require("../../assets/forum.png") },
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
      const response = await fetch("http://192.168.1.10:8000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if(jsonResponse.ok){
        navigation.navigate("Login")
      }
      console.log(JSON.stringify(data));

      // Aquí puedes hacer algo con la respuesta de la API, como mostrar un mensaje de éxito o redirigir al usuario a la pantalla de inicio de sesión.
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
    <View style={styles.container}>
      <Text style={styles.title}>Registro: Paso 2</Text>
      <Text style={styles.description}>Indique su edad</Text>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
      />
      <Text style={styles.description}>Indica tu nivel de conocimiento</Text>
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
            flexDirection: 'row', // Agrega este estilo
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
            //navigation.navigate('Login')
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
  container: {
    flex: 1,
    backgroundColor: "#FFE3E0",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  description: {
    fontSize: 17,
    width: "80%",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#8B0000",
    borderRadius: 5,
    marginVertical: 10,
  },
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
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 30
  },
});
