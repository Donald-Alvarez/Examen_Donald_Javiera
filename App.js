import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from './src/InicioScreen';
import DetallesScreen from './src/DetallesScreen';
import SeguimientoScreen from './src/SeguimientoScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{
            title: 'Inicio',
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
          name="Detalles"
          component={DetallesScreen}
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
          name="Seguimiento"
          component={SeguimientoScreen}
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
