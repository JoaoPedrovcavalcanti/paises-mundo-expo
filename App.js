import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { AppProvider } from './contexts/AppContext';
import ListaScreen from './screens/ListaScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import FavoritosScreen from './screens/FavoritosScreen';

const Stack = createNativeStackNavigator();

const tema = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0ea5e9',
  },
};

export default function App() {
  return (
    <PaperProvider theme={tema}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen
              name="Lista"
              component={ListaScreen}
              options={({ navigation }) => ({
                title: 'Países do Mundo',
                headerRight: () => (
                  <IconButton
                    icon="heart"
                    iconColor="#ef4444"
                    onPress={() => navigation.navigate('Favoritos')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Detalhes"
              component={DetalhesScreen}
              options={({ route }) => ({ title: route.params.pais.nome })}
            />
            <Stack.Screen
              name="Favoritos"
              component={FavoritosScreen}
              options={{ title: 'Favoritos' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}