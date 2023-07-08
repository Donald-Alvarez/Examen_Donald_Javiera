import React, { useState } from 'react';//Importa el módulo React y useState desde 'react'
  // Importa componentes específicos de React Native
  import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
  // Array de objetos que representa datos de restaurante
  const DATA = [
    {
      id: '1',
      name: 'Coffee Break☕',
      contacto: '2512-2598',
      address: 'Frente a la gasolinera 1',
      comidas: [
        { nombre: 'Jalapeño de pollo', precio: 120 },
        { nombre: 'Pollo', precio: 125 },
        { nombre: 'Cerdo Frito', precio: 130 },
        { nombre: 'Churrazco', precio: 120 }
      ],
      bebidas: [
        { nombre: 'Café', precio: 40 },
        { nombre: 'Té', precio: 35 },
        { nombre: 'Refresco', precio: 45 }
      ],
    },
    {
      id: '2',
      name: 'El Bojazo🍽️',
      contacto: '+505 89314723',
      address: 'Frente al BAC, Juigalpa-Chontales',
      comidas: [
        { nombre: 'Jalapeño de pollo', precio: 120 },
        { nombre: 'Pollo', precio: 125 }
      ],
      bebidas: [
        { nombre: 'Café', precio: 40 },
        { nombre: 'Refresco', precio: 45 }
      ],
    },
    {
      id: '3',
      name: 'La Hacienda🍽️',
      contacto: '2516-1300',
      address: 'Km 142 Carretera al Rama Juigalpa',
      comidas: [
        { nombre: 'Jalapeño de pollo', precio: 120 },
        { nombre: 'Pollo', precio: 125 }
      ],
      bebidas: [
        { nombre: 'Café', precio: 40 },
        { nombre: 'Té', precio: 35 }
      ],
    },
    {
      id: '4',
      name: 'Coffe Time☕',
      contacto: '+505 76721337',
      address: 'Centro médico 1/2 C al Norte, Juigalpa-Chontales',
      comidas: [
        { nombre: 'Jalapeño de pollo', precio: 120 },
        { nombre: 'Pollo', precio: 125 }
      ],
      bebidas: [
        { nombre: 'Café', precio: 40 },
        { nombre: 'Té', precio: 35 },
        { nombre: 'Refresco', precio: 45 }
      ],
    },
  ];

  const InicioScreen = ({ navigation }) => { // Define el componente InicioScreen que recibe 'navigation' como argumento
    const [restaurantes] = useState(DATA); // Inicializa el estado 'restaurantes' utilizando el hook useState y asignándole los datos del array DATA

    const renderItem = ({ item }) => ( // Define la función renderItem para renderizar cada elemento de la lista
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detalles', { restaurante: item })}>
        <View style={styles.restaurantContainer}>
          <Image style={{ width: 60, height: 60, alignSelf: 'flex-end' }} source={require('./img/Menu.png')} />
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.restaurantcontacto}>Contacto: {item.contacto}</Text>
          <Text style={styles.restaurantAddress}>Dirección: {item.address}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 130, alignSelf: 'center', marginTop: 20 }}
          source={require('./img/Restaurantes.png')}
        />
        <Text style={styles.title}>¡Descubre tus restaurantes favoritos!</Text>
        <FlatList data={restaurantes} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    );
  };

  const styles = StyleSheet.create({ // Definición de estilos para los componentes visuales
    container: {
      flexGrow: 1,
      paddingHorizontal: 16,
      backgroundColor: '#d7f9ff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#000000',
      marginTop: 30,
    },
    restaurantContainer: {
      backgroundColor: '#FFCD85',
      borderRadius: 30,
      padding: 40,
      marginBottom: 16,
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#000000',
    },
    restaurantcontacto: {
      fontSize: 16,
      marginBottom: 4,
      color: '#000000',
    },
    restaurantAddress: {
      fontSize: 14,
      color: '#000000',
    },
  });

  export default InicioScreen;// Exporta el componente InicioScreen como el valor por defecto del módulo
