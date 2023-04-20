import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Post = ({author, content, likes, onPressLike}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.title]}>{author}</Text>
      </View>
      <Text style={[styles.text, styles.content]}>{content}</Text>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPressLike}>
          <Text>Likes {likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Comentarios {likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:'teal',
    elevation:10,
    borderRadius:10,
    height:30,
    marginBottom:0
    
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
  },
  likes: {
    fontSize: 14,
    marginLeft: 5,
  },
  text: {
    color: "black",
  },
});

export default Post;
