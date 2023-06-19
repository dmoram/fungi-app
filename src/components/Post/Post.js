import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { getUserId, getModStatus } from "../../utils/storage";
import Confirm from "../../components/Popup/ConfirmPopup";
import Notif from "../Popup/NotifPopup";

const parseDate = (dateISO) => {
  const fechaUTC = new Date(dateISO);
  const fechaChile = fechaUTC.toLocaleString("es-CL", {
    timeZone: "America/Santiago",
  });
  return fechaChile;
};

const Post = ({
  id,
  author,
  author_id,
  content,
  likes,
  comments,
  image,
  userType,
  date,
  onPressLike,
  onPressDislike,
  onPressComments,
  fetchPosts,
  navigation,
}) => {
  const [liked, setLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isMod, setIsMod] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (image != null && image != "") {
        try {
          setIsLoading(true); // Mostrar ActivityIndicator mientras se carga la imagen
          const response = await axios.get(`/posts/${id}`, {
            responseType: "blob",
          });
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onloadend = () => {
            setImageUrl(reader.result);
            setIsLoading(false); // Ocultar ActivityIndicator una vez que la imagen se ha cargado
          };
        } catch (error) {
          console.log("da", error);
          setIsLoading(false); // Ocultar ActivityIndicator en caso de error
        }
      }
    };

    const fetchMod = async () => {
      const value = await getModStatus();
      setIsMod(value);
    };
    fetchImage();
    fetchMod();
  }, []);

  const handleDelete = async () => {
    axios
      .delete(`/posts/${id}`)
      .then((response) => {
        console.log(response);
        setIsNotifOpen(true);
      })
      .catch((error) => console.log(error));
    console.log("borrar");
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  return (
    <View style={styles.container}>
      {isMod === "true" ? (
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => setIsPopupOpen(true)}
        >
          <Image
            style={{
              alignSelf: "flex-end",
              width: 25,
              height: 26,
              marginVertical: 10,
            }}
            source={require("../../assets/delete.png")}
          />
        </TouchableOpacity>
      ) : null}
      <View style={styles.header}>
        <Image
          source={require("../../assets/user_icon.png")}
          style={styles.user_icon}
        />
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SeeProfileScreen",{user_id: author_id})}>
            <Text style={[styles.text, styles.title]}>{author}</Text>
          </TouchableOpacity>
          <Text style={[styles.text, styles.user_type]}>{userType}</Text>
        </View>
        <Text style={styles.date}>{parseDate(date)}</Text>
      </View>

      <Text style={[styles.text, styles.content]}>{content}</Text>
      {imageUrl ? (
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.image}>
            {isLoading ? (
              <ActivityIndicator size="large" color="teal" />
            ) : (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 300, height: 400 }}
              />
            )}
          </View>
        </TouchableOpacity>
      ) : null}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{likes} Likes</Text>
        <Text>{comments} Comentarios</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={async () => {
            try {
              if (liked) {
                await onPressDislike();
              } else {
                await onPressLike();
              }
              setLiked(!liked);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.footer_text,
                { color: liked ? "#FFD300" : "white" },
              ]}
            >
              Me gusta{" "}
            </Text>
            <Image
              source={require("../../assets/like_icon.png")}
              style={[styles.icon, { tintColor: liked ? "#FFD300" : "white" }]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressComments}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.footer_text}>Comentar </Text>
            <Image
              source={require("../../assets/comment_icon.png")}
              style={[styles.icon, { tintColor: "white", marginTop: 3 }]}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Confirm
        visible={isPopupOpen}
        onConfirm={handleDelete}
        onCancel={handleCancel}
      >
        <Text style={styles.text}>
          ¿Estás seguro que deseas eliminar esta publicación?
        </Text>
      </Confirm>
      <Notif
        visible={isNotifOpen}
        onConfirm={() => {
          setIsNotifOpen(false);
          fetchPosts();
        }}
      >
        <Text style={styles.text}>Publicación eliminada</Text>
      </Notif>
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
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#544C0C",
    elevation: 10,
    borderRadius: 10,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    marginTop: 7,
    fontSize: 16,
    marginBottom: 10,
  },
  user_type: {
    fontSize: 14,
    color: "grey",
  },
  likes: {
    fontSize: 14,
    marginLeft: 5,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#0D0322",
  },
  user_icon: {
    width: 40,
    height: 40,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 10,
  },
  date: {
    position: "absolute",
    right: 15,
  },
  footer_text: {
    color: "white",
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Post;
