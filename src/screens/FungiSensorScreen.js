import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const FungiSensorScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.button}>
        <Text>Agregar registro fungi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,{backgroundColor:"red"}]}>
        <Text>Ver registros</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FungiSensorScreen

const styles = StyleSheet.create({
  button:{
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center",
    elevation:10
  },
  buttonContainer:{
    justifyContent: 'center', 
    alignItems: 'center'
  }
})