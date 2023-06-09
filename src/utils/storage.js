import AsyncStorage from "@react-native-async-storage/async-storage";

// Función para almacenar el token en AsyncStorage
export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("@token", value);
  } catch (error) {
    console.error("Error al guardar el token: ", error);
  }
};

// Función para obtener el token de AsyncStorage
export const getToken = async () => {
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

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@token");
  } catch (error) {
    console.log(error);
  }
};

// Función para almacenar el token en AsyncStorage
export const storeUserId = async (value) => {
  try {
    await AsyncStorage.setItem("@id", value);
  } catch (error) {
    console.error("Error al guardar el id: ", error);
  }
};

// Función para obtener el token de AsyncStorage
export const getUserId = async () => {
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

export const storeModStatus = async (value) => {
  try {
    await AsyncStorage.setItem("@mod", value);
  } catch (error) {
    console.error("Error al guardar el estado: ", error);
  }
};

export const getModStatus = async () => {
  try {
    const value = await AsyncStorage.getItem("@mod");
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el estado: ", error);
    return null;
  }
};

export const storeRememberStatus = async (value) => {
  try {
    await AsyncStorage.setItem("@remember", value);
  } catch (error) {
    console.error("Error al guardar el estado: ", error);
  }
}

export const getRememberStatus = async () => {
  try {
    const value = await AsyncStorage.getItem("@remember");
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el estado: ", error);
  }
}
