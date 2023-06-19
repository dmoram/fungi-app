import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Pestaña 1',
    text: 'Esta es la funcionalidad de la pestaña 1.',
    image: require('./../assets/icon.png'),
  },
  {
    key: '2',
    title: 'Pestaña 2',
    text: 'Esta es la funcionalidad de la pestaña 2.',
    image: require('./../assets/icon.png'),
  },
  // Agrega más objetos para cada pestaña
];

const Slide = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <Image source={item.image} style={styles.image} />
    </View>
  );
};

const IntroScreen = () => {
  const [introShown, setIntroShown] = useState(false);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introStatus = await AsyncStorage.getItem('introShown');
        if (introStatus === 'tru') {
          setIntroShown(true); // El recorrido ya se ha mostrado
        } else {
          setIntroShown(false); // El recorrido no se ha mostrado
        }
      } catch (error) {
        console.error('Error al obtener el estado del recorrido:', error);
        // Manejo de errores si falla la obtención del estado del recorrido
      }
    };

    checkIntroStatus();
  }, []);

  const setIntroStatus = async () => {
    try {
      await AsyncStorage.setItem('introShown', 'true');
      setIntroShown(true); // Actualizar el estado para no renderizar el recorrido nuevamente
    } catch (error) {
      console.error('Error al establecer el estado del recorrido:', error);
      // Manejo de errores si falla el almacenamiento
    }
  };

  if (introShown) {
    return null; // El recorrido ya se ha mostrado, no renderizar nada
  }

  return (
    <AppIntroSlider
      data={slides}
      renderItem={Slide}
      onDone={setIntroStatus} // Llamar a setIntroStatus al finalizar el recorrido
    />
  );
};

const styles = {
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
};

export default IntroScreen;
