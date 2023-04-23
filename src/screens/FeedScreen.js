import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Post from "../components/Post/Post";
import axios from "../api/axios";

const PostList = ({ posts, onPressLike, onPressUnlike }) => {
  const renderItem = ({ item }) => (
    <Post
      id={item.id}
      author={item.Usuario.username}
      content={item.content}
      likes={item.likes}
      image={item.image}
      userType={item.Usuario.userType}
      date={item.createdAt}
      onPressUnlike={() => onPressUnlike(item.id, item.likes)}
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

  const decreaseLikes = async (id, likes) => {
    try {
      const response = await axios.put("/posts", { id, likes: likes - 1 });
      fetchPosts(); // Actualizamos la lista de posts
    } catch (error) {
      console.log(error);
    }
  };

  const increaseLikes = async (id, likes) => {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F8",
      }}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewPostScreen")}
      >
        <Image
          source={require("../assets/create_post.png")}
          style={styles.create_post}
        />
      </TouchableOpacity>
      <PostList
        posts={posts}
        onPressLike={increaseLikes}
        onPressUnlike={decreaseLikes}
      />
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F8",
    padding: 10,
    width: "100%",
    height: "100%",
  },
  create_post: {
    width: 50,
    height: 50,
  },
});
