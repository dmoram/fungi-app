import React from "react";
import { View, Dimensions, Text} from "react-native";
import { PieChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const ClassChart = () => {
  const classData = [10, 15, 8, 12, 5]; // Cantidad de registros por cada clase

  const classMap = {
    1: "Globoideo",
    2: "Cupiforme",
    3: "Sésiles",
    4: "Gelatinoso",
    5: "Pileado",
  };

  const classLabels = Object.keys(classMap).map((key) => classMap[key]);

  const total = classData.reduce((sum, value) => sum + value, 0);
  const data = classData.map((value, index) => ({
    name: classLabels[index],
    value: (value / total) * 100, // Porcentaje en lugar de la cantidad
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Color aleatorio para cada clase
    legendFontColor: "#000000",
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View>
      <Text style={{fontSize:20, fontWeight:"bold", padding:30, textAlign:"center"}}>Distribución de Clases de Hongos</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        
        absolute={false}
      />
    </View>
  );
};

export default ClassChart;
