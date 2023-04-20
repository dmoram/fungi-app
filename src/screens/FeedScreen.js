import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Post from "../components/Post/Post";
import axios from "../api/axios";

const PostList = ({ posts, onPressLike }) => {
  const renderItem = ({ item }) => (
    <Post
      author={item.Usuario.username}
      content={item.content}
      likes={item.likes}
      onPressLike={() => onPressLike(item.id, item.likes)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLikes = async (id, likes) => {
    try {
      const response = await axios.put("/posts", { id, likes: likes + 1 });
      fetchPosts(); // Actualizamos la lista de posts
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Solo se ejecuta en el primer renderizado de la pantalla

  // Actualiza los posts cada vez que la pantalla se enfoca (se vuelve a visitar)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPosts();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewPostScreen")}
      >
        <Text>Crear publicación!!</Text>
      </TouchableOpacity>
      <PostList posts={posts} onPressLike={updateLikes} />
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    marginTop: 30,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 10,
    width: "100%",
    height: "100%",
  },
});
