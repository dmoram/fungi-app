import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = ({navigation}) => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <TouchableOpacity onPress={() => {
        // En lugar de navigate, usamos reset para eliminar el historial de navegación
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      }}>
        <Text>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})