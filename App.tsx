import { StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import YelpResults from './screens/YelpResults';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import { useFonts } from '@expo-google-fonts/inter';
import CreateRoomPg from './screens/CreateRoomPg';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    'Inter': require('./assets/fonts/Inter-V.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false }} >
        <Stack.Screen 
          name="start"
          component = {StartScreen}
        />
        <Stack.Screen
          name="create room screen"
          component={CreateRoomPg}
          options={{headerShown: true,
          headerTitleStyle: {
            color: 'white'
          }}}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
