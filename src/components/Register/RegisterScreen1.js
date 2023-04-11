import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect} from "react";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("masculino");

  useEffect(() => {
    console.log(selectedGender);
  }, [selectedGender]);


  const handleRegister = () => {
    if (!username || !fullName || !email || !password || !selectedGender) {
      alert("Por favor, completa todos los campos.");
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro: Paso 1</Text>
      <Text style={styles.description}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.description}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={styles.description}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.description}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.description}>Género</Text>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(itemValue, itemIndex) => {
            setSelectedGender(itemValue);
        }}
        style={styles.picker}
        prompt="Seleccione"
      >
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Femenino" value="femenino" />
        <Picker.Item label="Otro" value="otro" />
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (handleRegister()) {
            navigation.navigate("RegisterScreen2", {
              username: username,
              fullName: fullName,
              email: email,
              password: password,
              gender: selectedGender,
            });
          }
        }}
      >
        <Text style={styles.text}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
    marginTop:10,
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
  opciones: {
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
  },
  iconImageStyle: { height: 20, width: 20 },
});
