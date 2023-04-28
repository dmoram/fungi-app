import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Comment from "../components/Comment/Comment";
import axios from "../api/axios";
import GlobalStyles from "../styles/GlobalStyles";
import { getUserId } from "../utils/storage";

const CommentList = ({ comments, onPressLike, onPressDislike }) => {
  const renderItem = ({ item }) => (
    <Comment
      id={item.id}
      author={item.Usuario.username}
      content={item.content}
      likes={item.likes}
      comments={item.comments}
      userType={item.Usuario.userType}
      date={item.createdAt}
      //onPressDislike={() => onPressDislike(item.id, "dislike")}
      //onPressLike={() => onPressLike(item.id, "like")}
    />
  );
  return (
    <View style={styles.container}>
      {comments.length > 0 ? (
        <FlatList
          style={styles.container}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.text}>Aún no hay comentarios</Text>
      )}
    </View>
  );
};

const CommentScreen = ({ route, navigation }) => {
  const { post_id } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${post_id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (!comment) {
        console.log("El comentario está vacío");
        Alert.alert("El comentario está vacío");
        return;
      }
      const response = await axios.post("/comments", {
        content: comment,
        post_id: post_id,
        author_id: await getUserId(),
      });

      console.log(response.data);

      setComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLikes = async (id, action) => {
    try {
      const response = await axios.put("/posts", {
        post_id: id,
        user_id: await getUserId(),
        action,
      });
      fetchComments(); // Actualizamos la lista de posts
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []); // Solo se ejecuta en el primer renderizado de la pantalla

  return (
    <View style={GlobalStyles.container}>
      <CommentList comments={comments} />
      <View style={styles.input_container}>
        <TextInput
          placeholder={"Escribe un comentario"}
          multiline={true}
          style={styles.input}
          onChangeText={(text) => setComment(text)} 
        />

        <TouchableOpacity style={styles.button} onPress={handleCommentSubmit}>
          <Image
            source={require("../assets/send_icon.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F8",
    padding: 10,
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    width: "85%",
    fontSize: 18,
    color: "black",
    marginLeft: 10,
    paddingLeft:10
  },
  input_container: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 30,
  },
  button: {
    marginLeft: 5,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: "teal",
  },
});
