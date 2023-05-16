import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import React, { useState } from "react";
import axios from "../api/axios";
import {
  storeToken,
  storeUserId,
  storeModStatus,
  storeRememberStatus,
} from "../utils/storage";
import GlobalStyles from "../styles/GlobalStyles";
import Notif from "../components/Popup/NotifPopup";
import { validarEmail } from "../utils/utils";
import Checkbox from "expo-checkbox";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const handleConfirm = () => {
    // Mostrar la ventana emergente de confirmación
    setIsPopupOpen(false);
  };

  const handleLogin = () => {
    if (!validarEmail(email)) {
      setErrMsg("Por favor, ingresa un correo electrónico válido");
      setIsPopupOpen(true);
      return false;
    } else if (password.length < 7) {
      setErrMsg(
        "Por favor, ingresa una contraseña válida (7 o más caracteres)"
      );
      setIsPopupOpen(true);
      return false;
    }
    return true;
  };

  return (
    <View style={GlobalStyles.container}>
      <Image style={styles.logo} source={require("../assets/micelio_logo.png")}/>
      <Text style={styles.description}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <View style={styles.section}>
        <Checkbox
          style={{ margin: 8 }}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.text}>Mantener sesión iniciada</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (handleLogin()) {
            axios
              .post("/usuarios/login", { email, password })
              .then((response) => {
                // Si la solicitud es exitosa, navegamos a la pantalla de Tabs
                console.log("Logged in");
                // Se almacena el token de usuario
                storeToken(response.data.token);
                storeUserId(response.data.id.toString());
                storeModStatus(response.data.mod.toString());
                if (isChecked === true) {
                  storeRememberStatus("true");
                }
                console.log(response.data.mod);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Tabs" }],
                });
              })
              .catch((error) => {
                // Si la solicitud falla, muestra un mensaje de error
                console.error(error.response.data.msg);
                setErrMsg(error.response.data.msg);
                setIsPopupOpen(true);
                return false;
              });
          }
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Notif visible={isPopupOpen} onConfirm={handleConfirm}>
        <Text style={styles.text}>{errMsg}</Text>
      </Notif>
    </View>
  );
};

export default LoginScreen;

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
  button: {
    backgroundColor: "#204850",
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo:{
    width:250,
    height:150
  }
});
