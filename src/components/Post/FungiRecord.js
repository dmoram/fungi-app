import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { getUserId } from "../../utils/storage";

const parseDate = (dateISO) => {
  const fechaUTC = new Date(dateISO);
  const fechaChile = fechaUTC.toLocaleString("es-CL", {
    timeZone: "America/Santiago",
  });
  return fechaChile;
};

const FungiRecord = ({
  id,
  author,
  description,
  location,
  likes,
  comments,
  image,
  latitude,
  longitude,
  altitude,
  fungiClass,
  userType,
  date,
  onPressLike,
  onPressDislike,
  onPressComments,
}) => {
  const [liked, setLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (image != null && image != "") {
        try {
          const response = await axios.get(`/records/${id}`, {
            responseType: "blob",
          });
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onloadend = () => {
            setImageUrl(reader.result);
          };
        } catch (error) {
          console.log("da", error);
        }
      }
    };

    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/user_icon.png")}
          style={styles.user_icon}
        />
        <View>
          <Text style={[styles.text, styles.title]}>{author}</Text>
          <Text style={[styles.text, styles.user_type]}>{userType}</Text>
        </View>
        <Text style={styles.date}>{parseDate(date)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={[styles.text, styles.description]}>{description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        <Text style={[styles.text, styles.description]}>{location}</Text>
        <Text style={[styles.text, styles.coords]}>Latitud: {latitude}</Text>
        <Text style={[styles.text, styles.coords]}>Longitud: {longitude}</Text>
        <Text style={[styles.text, styles.coords]}>Altitud: {altitude}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clasificación</Text>
        <Text style={[styles.text, styles.description]}>
          Clasificación: {fungiClass}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos sensores</Text>
        <Text style={[styles.text, styles.coords]}>Temperatura: 21°C</Text>
        <Text style={[styles.text, styles.coords]}>Humedad: 85,32%</Text>
      </View>
      {imageUrl ? (
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.image}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 300, height: 400 }}
            />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B6B2C0",
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
  description: {
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
  section: {
    borderRadius: 10,
    backgroundColor: "#BABE89",
    marginBottom: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default FungiRecord;
