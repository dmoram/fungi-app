import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React,{useState, useEffect} from 'react'
import GlobalStyles from "../styles/GlobalStyles"
import FungiRecord from '../components/Post/FungiRecord'
import axios from "../api/axios"
import { Picker } from "@react-native-picker/picker";
import { getUserId } from '../utils/storage'

const RecordList = ({ records, onPressLike, onPressDislike, onPressComments, fetchRecords, navigation }) => {
  const renderItem = ({ item }) => (
    <FungiRecord
      id={item.id}
      author={item.Usuario.username}
      author_id={item.Usuario.id}
      description={item.description}
      location={item.location}
      likes={item.likes}
      comments={item.comments}
      image={item.image}
      latitude={item.latitude}
      longitude={item.longitude}
      altitude={item.altitude}
      fungiClass={item.fungiClass}
      temperature={item.temperature}
      humidity={item.humidity}
      userType={item.Usuario.userType}
      date={item.createdAt}
      onPressDislike={() => onPressDislike(item.id, "dislike")}
      onPressLike={() => onPressLike(item.id, "like")}
      onPressComments={() => onPressComments(item.id)}
      fetchRecords={() => fetchRecords()}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      {records.length > 0 ? (
        <FlatList
          style={styles.container}
          data={records}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.text}>Aún no hay registros</Text>
      )}
    </View>
  );
};

const orderRecordsByDate = (records) => {
  return records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const orderRecordsByRelevance = (records) => {
  return records.sort((a, b) => b.likes - a.likes);
};


const FungiRecordsScreen = ({navigation}) => {
  const [records, setRecords] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");

  const fetchRecords = async () => {
    try {
      const response = await axios.get("/records");
      setRecords(response.data.records);
    } catch (error) {
      console.log("da", error);
    }
  };

  const updateLikes = async (id, action) => {
    try {
      const response = await axios.put("/records/likes", {
        record_id: id,
        user_id: await getUserId(),
        action,
      });
      fetchRecords(); // Actualizamos la lista de records
    } catch (error) {
      console.log(error);
    }
  };

  const seeComments = (post_id) => {
    navigation.navigate("CommentScreen", { post_id: post_id });
  };

  useEffect(() => {
    fetchRecords();
  }, []); // Solo se ejecuta en el primer renderizado de la pantalla

  // Actualiza los records cada vez que la pantalla se enfoca (se vuelve a visitar)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchRecords();
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
        marginTop:20
      }}
    >
      
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
      <RecordList
        records={
          orderBy === "recent"
            ? orderRecordsByDate(records)
            : orderRecordsByRelevance(records)
        }
        onPressLike={updateLikes}
        onPressDislike={updateLikes}
        onPressComments={seeComments}
        fetchRecords={fetchRecords}
        navigation={navigation}
      />
    </View>
  )
}

export default FungiRecordsScreen

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
  text:{
    fontSize:18,
    textAlign:"center",
    marginTop:20
  }
});
