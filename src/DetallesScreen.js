// Importa componentes específicos de React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DetallesScreen = ({ route, navigation }) => {
  const { restaurante } = route.params; // Obtiene el objeto restaurante de los parámetros de la ruta
  const [comidasSeleccionadas, setComidasSeleccionadas] = useState([]); // Estado para las comidas seleccionadas
  const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState([]); // Estado para las bebidas seleccionadas
  const [pedido, setPedido] = useState(''); // Estado para el pedido en texto
  const [pedidosRealizados, setPedidosRealizados] = useState([]); // Estado para los pedidos realizados

  const agregarComida = (comida) => { // Función para agregar una comida a las comidas seleccionadas
    if (comida.trim() !== '') { // Verifica que la comida no esté vacía
      const precio = obtenerPrecio(comida); // Obtiene el precio de la comida seleccionada
      setComidasSeleccionadas([...comidasSeleccionadas, { nombre: comida, precio }]); // Agrega la comida seleccionada al estado de comidas seleccionadas
      setPedido((prevPedido) => (prevPedido ? prevPedido + ', ' + comida : comida)); // Actualiza el texto del pedido
    }
  };

  const agregarBebida = (bebida) => { // Función para agregar una bebida a las bebidas seleccionadas
    if (bebida.trim() !== '') { // Verifica que la bebida no esté vacía
      const precio = obtenerPrecio(bebida); // Obtiene el precio de la bebida seleccionada
      setBebidasSeleccionadas([...bebidasSeleccionadas, { nombre: bebida, precio }]); // Agrega la bebida seleccionada al estado de bebidas seleccionadas
      setPedido((prevPedido) => (prevPedido ? prevPedido + ', ' + bebida : bebida)); // Actualiza el texto del pedido
    }
  };

  const obtenerPrecio = (nombreItem) => { // Función para obtener el precio de un ítem (comida o bebida) según su nombre
    const itemSeleccionado = restaurante.comidas.find((item) => item.nombre === nombreItem) || // Busca la comida por su nombre
      restaurante.bebidas.find((item) => item.nombre === nombreItem); // Busca la bebida por su nombre
    return itemSeleccionado ? itemSeleccionado.precio : 0; // Retorna el precio si se encuentra el ítem, de lo contrario, retorna 0
  };

  const eliminarComida = (index) => { // Función para eliminar una comida de las comidas seleccionadas
    const nuevasComidasSeleccionadas = [...comidasSeleccionadas]; // Crea una copia del estado de comidas seleccionadas
    nuevasComidasSeleccionadas.splice(index, 1); // Elimina la comida en el índice dado
    setComidasSeleccionadas(nuevasComidasSeleccionadas); // Actualiza el estado de comidas seleccionadas
  };

  const eliminarBebida = (index) => { // Función para eliminar una bebida de las bebidas seleccionadas
    const nuevasBebidasSeleccionadas = [...bebidasSeleccionadas]; // Crea una copia del estado de bebidas seleccionadas
    nuevasBebidasSeleccionadas.splice(index, 1); // Elimina la bebida en el índice dado
    setBebidasSeleccionadas(nuevasBebidasSeleccionadas); // Actualiza el estado de bebidas seleccionadas
  };

  const realizarPedido = () => { // Función para realizar un pedido
    if (comidasSeleccionadas.length > 0 || bebidasSeleccionadas.length > 0) { // Verifica que haya al menos una comida o bebida seleccionada
      const nuevoPedido = { // Crea un objeto para el nuevo pedido
        restaurante: restaurante, // Guarda el restaurante del pedido
        pedido: [...comidasSeleccionadas, ...bebidasSeleccionadas], // Combina las comidas y bebidas seleccionadas en el pedido
        estado: 'En proceso⏰', // Establece el estado del pedido como "En proceso"
        fecha: new Date().toISOString(), // Guarda la fecha actual del pedido
      };
      setPedidosRealizados([...pedidosRealizados, nuevoPedido]); // Agrega el nuevo pedido al estado de pedidos realizados
      setComidasSeleccionadas([]); // Limpia las comidas seleccionadas
      setBebidasSeleccionadas([]); // Limpia las bebidas seleccionadas
      setPedido(''); // Limpia el texto del pedido
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detalles del restaurante:</Text>
        <Text style={styles.text}>Nombre: {restaurante.name}</Text>
        <Text style={styles.text}>Contacto: {restaurante.contacto}</Text>
        <Text style={styles.text}>Dirección: {restaurante.address}</Text>
      </View>
      <Text style={styles.title}>Comidas:</Text>
      {restaurante.comidas.map((item, index) => ( // Muestra la lista de comidas del restaurante
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => agregarComida(item.nombre)} // Llama a la función agregarComida al tocar una comida
        >
          <Text style={styles.comidaText}>{item.nombre} - Precio: C$ {item.precio}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.title}>Bebidas:</Text>
      {restaurante.bebidas.map((item, index) => ( // Muestra la lista de bebidas del restaurante
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => agregarBebida(item.nombre)} // Llama a la función agregarBebida al tocar una bebida
        >
          <Text style={styles.comidaText}>{item.nombre} - Precio: C$ {item.precio}</Text>
        </TouchableOpacity>
      ))}
      {(comidasSeleccionadas.length > 0 || bebidasSeleccionadas.length > 0) && ( // Verifica si hay comidas o bebidas seleccionadas
        <View style={styles.pedidoContainer}>
          <Text style={styles.title}>Pedido:</Text>
          {comidasSeleccionadas.map((comida, index) => ( // Muestra la lista de comidas seleccionadas
            <View key={index} style={styles.pedidoItemContainer}>
              <Text style={styles.pedidoItemText}>
                - {comida.nombre}
              </Text>
              <TouchableOpacity
                style={styles.eliminarComidaButton}
                onPress={() => eliminarComida(index)} // Llama ala función eliminarComida al tocar el botón de eliminar
              >
                <Text style={styles.eliminarComidaButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          {bebidasSeleccionadas.map((bebida, index) => ( // Muestra la lista de bebidas seleccionadas
            <View key={index} style={styles.pedidoItemContainer}>
              <Text style={styles.pedidoItemText}>
                - {bebida.nombre}
              </Text>
              <TouchableOpacity
                style={styles.eliminarComidaButton}
                onPress={() => eliminarBebida(index)} // Llama a la función eliminarBebida al tocar el botón de eliminar
              >
                <Text style={styles.eliminarComidaButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={realizarPedido} // Llama a la función realizarPedido al tocar el botón de realizar pedido
          >
            <Text style={styles.buttonText}>Realizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
      {pedidosRealizados.length > 0 && ( // Verifica si hay pedidos realizados
        <View>
          <Text style={styles.title}>Pedidos realizados:</Text>
          {pedidosRealizados.map((item, index) => ( // Muestra la lista de pedidos realizados
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate('Seguimiento', { pedido: item })} // Navega a la pantalla de seguimiento al tocar un pedido
            >
              <Text style={styles.pedidoRestaurante}>
                Restaurante: {item.restaurante.name}
              </Text>
              <Text style={styles.pedidoText}>
                Pedido ({item.pedido.length} Ordenes realizadas):
              </Text>
              <View style={styles.comidasContainer}>
                {item.pedido.map((item, index) => ( // Muestra la lista de comidas y bebidas en el pedido
                  <Text key={index} style={styles.comidaItem}>
                    - {item.nombre}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                style={styles.visualizarPedidoButton}
                onPress={() => navigation.navigate('Seguimiento', { pedido: item })} // Navega a la pantalla de seguimiento al tocar el botón de visualizar pedido
              >
                <Text style={styles.visualizarPedidoButtonText}>Visualizar Pedido</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

// Estilos CSS para los componentes
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Hace que el contenedor crezca para ocupar todo el espacio disponible en el contenedor padre
    backgroundColor: '#d7f9ff', // Color de fondo del contenedor
    padding: 16, // Espacio de relleno en todos los lados del contenedor
  },
  card: {
    backgroundColor: '#FFF6BF', // Color de fondo de las tarjetas
    borderRadius: 10, // Borde redondeado de las tarjetas
    padding: 16, // Espacio de relleno dentro de las tarjetas
    marginBottom: 16, // Espacio inferior después de las tarjetas
    alignItems: 'center', // Centra horizontalmente el contenido dentro de las tarjetas
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
  comidaText: {
    fontSize: 16, // Tamaño de fuente del texto
    color: '#050A34', // Color del texto
  },
  pedidoContainer: {
    backgroundColor: '#FFF6BF', // Color de fondo del contenedor del pedido
    borderRadius: 10, // Borde redondeado del contenedor del pedido
    padding: 16, // Espacio de relleno dentro del contenedor del pedido
    marginBottom: 16, // Espacio inferior después del contenedor del pedido
    alignItems: 'center', // Centra horizontalmente el contenido dentro del contenedor del pedido
  },
  pedidoItemContainer: {
    flexDirection: 'row', // Organiza los elementos en una fila
    alignItems: 'center', // Centra verticalmente los elementos
    marginBottom: 8, // Espacio inferior después del contenedor del ítem del pedido
  },
  pedidoItemText: {
    flex: 1, // Hace que el texto ocupe todo el espacio disponible en el contenedor del ítem del pedido
    fontSize: 16, // Tamaño de fuente del texto
    color: '#050A34', // Color del texto
  },
  eliminarComidaButton: {
    backgroundColor: '#FF0000', // Color de fondo del botón de eliminar comida
    paddingVertical: 4, // Espacio de relleno vertical dentro del botón de eliminar comida
    paddingHorizontal: 8, // Espacio de relleno horizontal dentro del botón de eliminar comida
    borderRadius: 5, // Borde redondeado del botón de eliminar comida
    justifyContent: 'center', // Centra verticalmente el contenido dentro del botón de eliminar comida
    alignItems: 'center', // Centra horizontalmente el contenido dentro del botón de eliminar comida
  },
  eliminarComidaButtonText: {
    color: '#FFFFFF', // Color del texto del botón de eliminar comida
    fontSize: 12, // Tamaño de fuente del texto
    fontWeight: 'bold', // Peso de fuente en negrita
  },
  button: {
    backgroundColor: '#050A34', // Color de fondo del botón
    paddingVertical: 8, // Espacio de relleno vertical dentro del botón
    paddingHorizontal: 16, // Espacio de relleno horizontal dentro del botón
    borderRadius: 5, // Borde redondeado del botón
    justifyContent: 'center', // Centra verticalmente el contenido dentro del botón
    alignItems: 'center', // Centra horizontalmente el contenido dentro del botón
    marginTop: 8, // Espacio superior antes del botón
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto del botón
    fontSize: 16, // Tamaño de fuente del texto
    fontWeight: 'bold', // Peso de fuente en negrita
  },
  pedidoRestaurante: {
    fontSize: 16, // Tamaño de fuente del texto
    fontWeight: 'bold', // Peso de fuente en negrita
    color: '#050A34', // Color del texto
  },
  pedidoText: {
    fontSize: 16, // Tamaño de fuente del texto
    color: '#050A34', // Color del texto
    marginBottom: 8, // Espacio inferior después del texto
  },
  comidasContainer: {
    marginLeft: 16, // Espacio izquierdo para el contenedor de comidas
  },
  comidaItem: {
    fontSize: 14, // Tamaño de fuente del texto
    color: '#050A34', // Color del texto
  },
  visualizarPedidoButton: {
    backgroundColor: '#050A34', // Color de fondo del botón de visualizar pedido
    paddingVertical: 8, // Espacio de relleno vertical dentro del botón de visualizar pedido
    paddingHorizontal: 16, // Espacio de relleno horizontal dentro del botón de visualizar pedido
    borderRadius: 5, // Borde redondeado del botón de visualizar pedido
    justifyContent: 'center', // Centra verticalmente el contenido dentro del botón de visualizar pedido
    alignItems: 'center', // Centra horizontalmente el contenido dentro del botón de visualizar pedido
    marginTop: 8, // Espacio superior antes del botón
  },
  visualizarPedidoButtonText: {
    color: '#FFFFFF', // Color del texto del botón de visualizar pedido
    fontSize: 16, // Tamaño de fuente del texto
    fontWeight: 'bold', // Peso de fuente en negrita
  },
});

export default DetallesScreen;


