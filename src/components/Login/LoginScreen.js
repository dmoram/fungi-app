import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, {useState} from "react";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>Nombre de usuario o email</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.description}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // En lugar de navigate, usamos reset para eliminar el historial de navegación
          navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" }],
          });
        }}
      >
        <Text style={styles.text}>Iniciar sesión</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 15,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  
});

