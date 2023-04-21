import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F8",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    color: "black",
    paddingHorizontal: 5,
    marginTop: 30,
    marginBottom: 20,
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
  button: {
    backgroundColor: "#204850",
    padding: 18,
    borderRadius: 15,
    elevation: 5,
  },
  button_text: {
    color: "white",
    fontSize: 20,
  },
});

export default styles;
