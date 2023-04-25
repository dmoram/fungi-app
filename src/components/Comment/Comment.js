import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../../styles/GlobalStyles";

const parseDate = (dateISO) => {
    const fecha = new Date(dateISO);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString();
  
    return `${dia}/${mes}/${anio}`;
  };

const Comment = ({
  id,
  author,
  content,
  likes,
  userType,
  date,
  onPressLike,
  onPressDislike,
}) => {
  const [liked, setLiked] = useState(false);
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

      <Text style={[styles.text, styles.content]}>{content}</Text>
    </View>
  );
};

export default Comment;
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
