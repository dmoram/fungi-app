import { StyleSheet, Text, View , Image} from 'react-native'
import React,{useState, useEffect} from 'react'
import { getToken } from '../utils/storage';
import axios from '../api/axios';

const SeeProfileScreen = ({route}) => {
    const [userData, setUserData] = useState({});
    const [postCount, setPostCount] = useState(null);
    const [recordCount, setRecordCount] = useState(null);
    const {user_id} = route.params;  
    const getUserData = async () => {

      const token = await getToken();
      axios
        .get(`/usuarios/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => console.log(error));
      axios
        .get(`/posts/count/${user_id}`)
        .then((response) => setPostCount(response.data.postCount))
        .catch((error) => console.log(error));
      axios
        .get(`/records/count/${user_id}`)
        .then((response) => setRecordCount(response.data.recordCount))
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getUserData();
    }, []);
  
    
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/profile_icon.png")}
            style={styles.image}
          ></Image>
          <Text style={{textAlign:"right", width:"100%", marginVertical:10, position:"absolute", paddingRight:20}}>{userData.moderator ? "Moderador":null}</Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "black",
              marginTop: 60,
            }}
          >
            {userData.username}
          </Text>
          <Text style={{ fontSize: 18, color: "black" }}>
            {userData.fullName}, {userData.age} años
          </Text>
          <Text style={{ fontSize: 18, color: "black" }}>
            {userData.userType}
          </Text>
          <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
            <View style={styles.box}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginHorizontal: 30,
                }}
              >
                <Text style={styles.number}>{postCount}</Text>
                <Image
                  style={{
                    alignSelf: "center",
                    width: 35,
                    height: 35,
                    tintColor: "purple",
                  }}
                  source={require("../assets/post.png")}
                />
              </View>
              <Text style={styles.boxText}>Publicaciones </Text>
            </View>
            <View style={styles.box}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginHorizontal: 30,
                }}
              >
                <Text style={styles.number}>{recordCount}</Text>
                <Image
                  style={{
                    alignSelf: "center",
                    width: 35,
                    height: 35,
                    tintColor: "purple",
                  }}
                  source={require("../assets/fungi_record.png")}
                />
              </View>
              <Text style={styles.boxText}>Registros Fungi </Text>
            </View>
          </View>
          
        </View>
      </View>
    );
  }
  
  export default SeeProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#BABE89",
    },
    image: {
      width: 150,
      height: 150,
      backgroundColor: "white",
      borderRadius: 100,
      marginTop: -75,
      position: "absolute",
    },
    header: {
      flex: 1,
      backgroundColor: "#ffff",
      width: "100%",
      alignItems: "center",
      marginTop: 100,
      marginBottom: -30,
      borderRadius: 30,
      height: "100%",
      elevation: 10,
    },
    button: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    button_text: {
      color: "purple",
      fontSize: 18,
      textAlign: "center",
      paddingVertical: 10,
    },
    number: {
      fontSize: 35,
      textAlign: "center",
    },
    box: {
      borderWidth: 1,
      flex: 1,
      borderRightWidth: 0,
      borderColor: "#C0BFBF",
    },
    boxText: {
      fontSize: 15,
      textAlign: "center",
    },
    icon: {
      alignSelf: "center",
      width: 25,
      height: 25,
      marginRight: 40,
      tintColor: "purple",
    },
    text:{
      fontSize:18
    }
  });
  