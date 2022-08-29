import { StyleSheet, SafeAreaView } from 'react-native';
import YelpResults from './screens/YelpResults';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import SuccessCreatePg from './screens/SuccessCreatePg';
import { useFonts } from '@expo-google-fonts/inter';
import CreateRoomPg from './screens/CreateRoomPg';
import CreatePart2 from './screens/CreatePart2';
import ChoicesPg from './screens/ChoicesPg';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { SocketContext, socket, SocketProvider } from './context/socket';
import JoinRoom from './screens/JoinRoom';

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    'Inter': require('./assets/fonts/Inter-V.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SocketProvider>
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
            name="create part 2"
            component={CreatePart2}
            options={{headerShown: true,
            headerTitleStyle: {
              color: 'white'
            }}}
          />
          <Stack.Screen
            name="success"
            component={SuccessCreatePg}
            options={{headerShown: true,
              headerTitleStyle: {
                color: 'white'
            }}}
          />
          <Stack.Screen
            name="join room"
            component={JoinRoom}
            options={{headerShown: true,
              headerTitleStyle: {
                color: 'white'
            }}}
          />
          <Stack.Screen
            name="choices"
            component={ChoicesPg}
            // options={{
            //   headerShown: true,
            //   headerTitleStyle: {
            //     color: 'white'
            //   },
            //   headerBackTitle: 'Back'
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
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
