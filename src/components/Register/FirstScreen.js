import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


const FirstScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/hongo_bg.jpg')} style={styles.image}/>
      <Text style={styles.title}>¡Bienvenido a la comunidad de los amantes de los hongos! </Text>
      <View style={styles.box}>
        <Text style={styles.text}>Explora y aprende sobre los hongos más fascinantes del reino fungi, conecta con otros apasionados como tú y comparte tus experiencias. </Text>
        <Text style={styles.text}>¡Regístrate ahora para comenzar!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('RegisterScreen')}}>
        <Text style={styles.buttonText}>Únete a la comunidad!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FirstScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      
    },
    title: {
      fontSize: 40,
      color:'white',
      paddingHorizontal: 5,
      marginTop: 120
    },
    text: {
      fontSize: 20,
      color:'white',
      paddingHorizontal: 5,
      marginHorizontal:10,
      marginTop: 40
    },
    image: {
      position:'absolute',
      resizeMode:'contain'
    },
    button: {
      backgroundColor: '#70527C',
      borderRadius: 15,
      padding: 20,
      marginTop: 100
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    box:{
      marginTop:20,
      backgroundColor:'#477187',
      borderRadius:10,
      opacity:0.8,
      paddingVertical:20
    }
  });
  