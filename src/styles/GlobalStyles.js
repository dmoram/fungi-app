import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE3E0",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  title: {
    fontSize: 30,
    color: "black",
    paddingHorizontal: 5,
    marginTop: 30,
    marginBottom:20
  },
  description: {
    fontSize: 17,
    width: "80%",
    paddingTop: 20,
  },
  input: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#8B0000",
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default styles;