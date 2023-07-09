import * as React from 'react';// Importa la biblioteca React y todas sus funciones y componentes
import { NavigationContainer } from '@react-navigation/native';// Importa el contenedor de navegación de React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';// Importa el tipo de navegación de stack nativo de React Navigation
import InicioScreen from './src/InicioScreen';// Importa el componente InicioScreen desde el archivo './src/InicioScreen'
import DetallesScreen from './src/DetallesScreen'; // Importa el componente DetallesScreen desde el archivo './src/DetallesScreen'
import SeguimientoScreen from './src/SeguimientoScreen';// Importa el componente SeguimientoScreen desde el archivo './src/SeguimientoScreen'

const Stack = createNativeStackNavigator();// Crea un objeto de tipo Stack utilizando la función createNativeStackNavigator de React Navigation

function App() {// Declara el componente principal de la aplicación llamado App
  return (
    /* Contenedor de navegación principal que envuelve toda la aplicación */
    <NavigationContainer> 
      <Stack.Navigator> 
        <Stack.Screen
          name="Inicio" // Nombre de la primera pantalla
          component={InicioScreen}// Componente asociado a la primera pantalla (InicioScreen)
          options={{
            /* Opciones de configuración de la pantalla */
            title: 'Inicio',// Título de la pantalla
            headerStyle: {
              backgroundColor: '#FFCD85',//Color de la pantalla
            },
            headerTitleStyle: {
              fontSize: 24,  // Tamaño de fuente del título
              fontWeight: 'bold', // Peso de la fuente del título
              color: '#000000', // Color del título
            },
          }}
        />
        <Stack.Screen
          name="Detalles" // Nombre de la segunda pantalla
          component={DetallesScreen}  // Componente asociado a la segunda pantalla (DetallesScreen)
          options={{
            title: 'Detalles',
            headerStyle: {
              backgroundColor: '#FFCD85',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Seguimiento" // Nombre de la tercera pantalla pantalla
          component={SeguimientoScreen} // Componente asociado a la tercera pantalla (SeguimientoScreen)
          options={{
            title: 'Seguimiento',
            headerStyle: {
              backgroundColor: '#FFCD85',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
