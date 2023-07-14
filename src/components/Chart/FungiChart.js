import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const FungiChart = ({ fungiRecords }) => {
  // Crear un objeto para almacenar el recuento de registros por mes
  const countByMonth = {};

  // Iterar sobre los registros de hongos y contar los registros por mes
  fungiRecords.forEach((record) => {
    // Obtener el mes de la fecha del registro (asumiendo que tienes una propiedad de fecha en tu objeto de registro)
    const month = new Date(record.fecha).getMonth() + 1;

    // Incrementar el recuento de registros para el mes correspondiente
    countByMonth[month] = countByMonth[month] ? countByMonth[month] + 1 : 1;
  });

  // Generar un array de etiquetas para todos los meses (1-12)
  const labels = Array.from({ length: 12 }, (_, index) => `Mes ${index + 1}`);

  // Obtener los valores de recuento correspondientes a los meses
  const data = labels.map((label, index) => countByMonth[index + 1] || 0);

  // Configurar las opciones de estilo para el gráfico
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={{marginLeft:-20}}>
      <Text style={{fontSize:20, fontWeight:"bold", padding:30, textAlign:"center"}}>Gráfico de cantidad de registros por mes</Text>
      <LineChart
        data={{
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto", "Septiembre","Octubre","Noviembre","Diciembre"],
          datasets: [
            {
              data,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2, // optional
             
            },
          ],
          legend: ["Cantidad de registros"]
          
        }}
        width={screenWidth}
        verticalLabelRotation={45}
        height={400}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default FungiChart;
