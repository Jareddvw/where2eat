import { StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import YelpResults from './screens/YelpResults';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestButtons from './screens/TestButtons';
import { useFonts } from '@expo-google-fonts/inter';

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
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} />
        <Stack.Screen 
          name="test"
          component = {TestButtons}
        />
        <Stack.Screen
          name="yelp results"
          component={YelpResults}
        />
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
