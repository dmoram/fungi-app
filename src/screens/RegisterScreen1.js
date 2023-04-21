import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import GlobalStyles from "../styles/GlobalStyles";
import Notif from "../components/Popup/NotifPopup";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("masculino");
  const [errMsg, setErrMsg] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirm = () => {
    // Mostrar la ventana emergente de confirmación
    setIsPopupOpen(false);
  };
  useEffect(() => {
    console.log(selectedGender);
  }, [selectedGender]);

  const handleRegister = () => {
    if (!username) {
      setErrMsg("Por favor, ingresa un nombre de usuario");
      setIsPopupOpen(true);
      return false;
    } else if (!fullName) {
      setErrMsg("Por favor, ingresa tu nombre completo");
      setIsPopupOpen(true);
      return false;
    } else if (!email) {
      setErrMsg("Por favor, ingresa tu correo electrónico");
      setIsPopupOpen(true);
      return false;
    } else if (!password || password.length < 7) {
      setErrMsg("Por favor, ingresa una contraseña de al menos 7 caracteres");
      setIsPopupOpen(true);
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrMsg("Por favor, introduce un correo electrónico válido");
      setIsPopupOpen(true);
      return false;
    }
    return true;
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.description}>Nombre de usuario</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={GlobalStyles.description}>Nombre completo</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={GlobalStyles.description}>Correo electrónico</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={GlobalStyles.description}>Contraseña</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Text style={GlobalStyles.description}>Género</Text>
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
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
      <Notif visible={isPopupOpen} onConfirm={handleConfirm}>
        <Text style={styles.text}>{errMsg}</Text>
      </Notif>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  picker: {
    marginTop: 10,
    width: "80%",
    borderWidth: 2,
    color: "white",
    borderColor: "#204850",
    borderRadius: 10,
    backgroundColor: "teal",
  },
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
  iconImageStyle: { height: 20, width: 20 },
});
