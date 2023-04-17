import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function FeedScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewPostScreen")}>
        <Text>Crear publicación!!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  button:{
    backgroundColor:'green',
    marginTop:30,
    padding:10
  }
})