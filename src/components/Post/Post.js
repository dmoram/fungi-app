import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Post = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.title]}>{props.author}</Text>
      </View>
      <Text style={[styles.text, styles.content]}>{props.content}</Text>
      <View style={styles.footer}>
        <Text style={[styles.text, styles.likes]}>{props.likes}</Text>
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
    justifyContent: "flex-end",
    alignItems: "center",
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