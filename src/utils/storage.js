import AsyncStorage from "@react-native-async-storage/async-storage";

// Función para almacenar el token en AsyncStorage
const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("@token", value);
  } catch (error) {
    console.error("Error al guardar el token: ", error);
  }
};

// Función para obtener el token de AsyncStorage
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el token: ", error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@token");
  } catch (error) {
    console.log(error);
  }
};

// Función para almacenar el token en AsyncStorage
const storeUserId = async (value) => {
  try {
    await AsyncStorage.setItem("@id", value);
  } catch (error) {
    console.error("Error al guardar el id: ", error);
  }
};

// Función para obtener el token de AsyncStorage
const getUserId = async () => {
  try {
    const value = await AsyncStorage.getItem("@id");
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el id: ", error);
    return null;
  }
};

export { storeToken, getToken, storeUserId, getUserId, removeToken };
