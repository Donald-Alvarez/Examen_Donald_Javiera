import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const SeguimientoScreen = ({ route }) => {
  const { pedido } = route.params;// Obtiene el pedido de los parámetros de la ruta
  const [estadoPedido, setEstadoPedido] = useState(pedido.estado);// Estado local para el estado del pedido

  useEffect(() => {
    const timer = setTimeout(() => {
      setEstadoPedido('Entregado✅');// Cambia el estado del pedido a 'Entregado' después de 5 segundos
    }, 4000); // 4 segundos en milisegundos

    return () => {
      clearTimeout(timer);// Limpia el temporizador al desmontar el componente
    };
  }, []);

  const calcularCantidad = (nombreItem) => {
    const cantidad = pedido.pedido.filter((item) => item.nombre === nombreItem).length;// Calcula la cantidad de un elemento en el pedido
    return cantidad;
  };

  const calcularTotalPrecio = () => {
    let total = 0;
    pedido.pedido.forEach((item) => {
      const precio = obtenerPrecio(item.nombre);// Obtiene el precio de un elemento en el pedido
      total += precio; // Calcula el total sumando los precios de todos los elementos
    });
    return total.toFixed(2);// Devuelve el total con 2 decimales
  };

  const obtenerPrecio = (nombreItem) => {
    const comidaSeleccionada = pedido.restaurante.comidas.find((comida) => comida.nombre === nombreItem) || // Busca la comida por nombre en el restaurante del pedido
      pedido.restaurante.bebidas.find((bebida) => bebida.nombre === nombreItem);// Busca la bebida por nombre en el restaurante del pedido
    return comidaSeleccionada ? comidaSeleccionada.precio : 0;// Devuelve el precio de la comida o bebida encontrada, o 0 si no se encuentra
  };

  return (
    <View style={styles.container}> 
      <Image style={{ width: 200, height: 200, alignSelf: 'center' }} source={require('./img/comida.png')} /> 
      <View style={styles.card}>
        <Text style={styles.title}>Seguimiento del Pedido:</Text>
        <Text style={styles.text}>Restaurante: {pedido.restaurante.name}</Text>
        <Text style={styles.text}>Pedido:</Text>
        <FlatList
          data={Array.from(new Set(pedido.pedido.map((item) => item.nombre)))}//
          renderItem={({ item }) => (//Crea una lista de elementos únicos en el pedido
            <View>
              <Text style={styles.text}>{item} - Cantidad: {calcularCantidad(item)}</Text>
            </View>
          )}//
          keyExtractor={(index) => index.toString()}// Propiedad requerida para asignar un identificador único a cada elemento de la lista
        />
        <Text style={styles.text}>Total Precio: C$ {calcularTotalPrecio()}</Text>
        <Text style={styles.text}>Estado: {estadoPedido}</Text>
        <Text style={styles.text}>Fecha: {pedido.fecha}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible en el contenedor padre
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center', // Centra horizontalmente el contenido
    backgroundColor: '#d7f9ff', // Color de fondo del contenedor
    padding: 16, // Espacio de relleno en todos los lados del contenedor
  },
  card: {
    backgroundColor: '#FFF6BF', // Color de fondo de las tarjetas
    borderRadius: 10, // Borde redondeado de las tarjetas
    padding: 16, // Espacio de relleno dentro de las tarjetas
    width: '90%', // Ancho de las tarjetas, establecido al 90% del contenedor padre
  },
  title: {
    fontSize: 18, // Tamaño de fuente del título
    fontWeight: 'bold', // Peso de fuente en negrita
    marginBottom: 8, // Espacio inferior después del título
    color: '#050A34', // Color del texto del título
  },
  text: {
    fontSize: 16, // Tamaño de fuente del texto
    marginBottom: 4, // Espacio inferior después del texto
    color: '#050A34', // Color del texto
  },
  });

export default SeguimientoScreen;


