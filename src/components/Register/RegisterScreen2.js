import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'

const RegisterScreen2 = ({navigation, route}) => {
    const [age, setAge] = useState("")
    const [userType, setUserType] = useState("")
    const { username, fullName, email, password, selectedGender } = route.params;

    //console.log(username, fullName, email, password, selectedGender )

    const registerUser = async () => {
        const data = {
          username,
          fullName,
          email,
          password,
          selectedGender,
          age,
          userType
        };
      
        try {
          const response = await fetch('http://192.168.1.10:8000/api/usuarios', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            },
            //body: JSON.stringify(data)
          });
          const jsonResponse = await response.json();
          console.log(jsonResponse)
      
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
    }
    

    const handleRegister = () => {
        if (!age || !userType) {
            alert('Por favor, completa todos los campos.');
            return false;
         }
         return !(!validarEdad(age));
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RegisterScreen2</Text>
            <Text style={styles.description}>Indique su edad</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    
                    value={age}
                    onChangeText={setAge}
                />
            <Text style={styles.description}>Indica tu nivel de conocimiento</Text>
            <Picker
                selectedValue={userType}
                onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                style={styles.picker}
                prompt='Seleccione'
            >
                <Picker.Item label="Principiante" value="principiante"/>
                <Picker.Item label="Aficionado" value="aficionado"/>
                <Picker.Item label="Micólogo amateur" value="amateur"/>
                <Picker.Item label="Micólogo experto" value="experto"/>
            </Picker>
            <TouchableOpacity style={styles.button} onPress={() => {
                if(handleRegister()){
                    //navigation.navigate('Login')
                    registerUser()
                }
                
            }}>
                <Text>Siguiente</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterScreen2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80
    },
    description: {
        fontSize: 15,
        width:"80%",
        paddingTop:20
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
        borderColor: "#ccc",
        borderRadius: 5,
        marginVertical: 10,
    },
    picker: {
        width: '80%', 
        borderWidth: 1, 
        borderColor: 'gray',
        borderRadius:10,
        backgroundColor: 'blue',
        marginTop:20
    },
    button: {
        backgroundColor: 'green',
        padding: 30,
        position:'absolute',
        alignSelf: 'flex-end',
        bottom:16,
        right:16,
        borderRadius:20
    }
})