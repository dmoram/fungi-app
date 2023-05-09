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
import { getUserId } from "../utils/storage";
import { Picker } from "@react-native-picker/picker";

const PostList = ({ posts, onPressLike, onPressDislike, onPressComments }) => {
  const renderItem = ({ item }) => (
    <Post
      id={item.id}
      author={item.Usuario.username}
      content={item.content}
      likes={item.likes}
      comments={item.comments}
      image={item.image}
      userType={item.Usuario.userType}
      date={item.createdAt}
      onPressDislike={() => onPressDislike(item.id, "dislike")}
      onPressLike={() => onPressLike(item.id, "like")}
      onPressComments={() => onPressComments(item.id)}
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

const orderPostsByDate = (posts) => {
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const orderPostsByRelevance = (posts) => {
  return posts.sort((a, b) => b.likes - a.likes);
};

function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.log("da", error);
    }
  };

  const updateLikes = async (id, action) => {
    try {
      const response = await axios.put("/posts/likes", {
        post_id: id,
        user_id: await getUserId(),
        action,
      });
      fetchPosts(); // Actualizamos la lista de posts
    } catch (error) {
      console.log(error);
    }
  };

  const seeComments = (post_id) => {
    navigation.navigate("CommentScreen", { post_id: post_id });
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
        <View style={styles.createButton}>
          <Text style={{ alignSelf: "center", fontSize: 18, color:"white" }}>
            Crear publicación
          </Text>
          <Image
            source={require("../assets/create_post.png")}
            style={styles.createIcon}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.orderContainer}>
        <Text style={{ marginLeft: 20, fontSize: 18 }}>Ordenar por</Text>
        <Picker
          selectedValue={orderBy}
          onValueChange={(itemValue, itemIndex) => {
            setOrderBy(itemValue);
          }}
          style={styles.picker}
          mode="dropdown"
          prompt="Seleccione"
        >
          <Picker.Item
            style={{ fontSize: 18 }}
            label="Más recientes"
            value="recent"
          />
          <Picker.Item
            style={{ fontSize: 18 }}
            label="Más relevantes"
            value="relevant"
          />
        </Picker>
      </View>
      <PostList
        posts={
          orderBy === "recent"
            ? orderPostsByDate(posts)
            : orderPostsByRelevance(posts)
        }
        onPressLike={updateLikes}
        onPressDislike={updateLikes}
        onPressComments={seeComments}
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
  picker: {
    width: "60%",
    borderWidth: 2,
    borderColor: "#204850",
    borderRadius: 10,
    backgroundColor: "#BEBEBE",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F8",
    padding: 10,
    width: "100%",
    height: "100%",
  },
  createIcon: {
    width: 40,
    height: 40,
    tintColor:"white"
  },
  createButton: {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "center",
    backgroundColor: "#727D15",
    borderRadius: 20,
    padding: 10,
  },

  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    width: "100%",
    marginBottom: 5,
  },
});
