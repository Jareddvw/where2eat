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
import Results from './screens/Results';

export type RootStackParams = {
  Start: undefined,
  Create1: undefined,
  Create2: {location:string; food:string; roomName:string},
  Success: {roomName:string},
  Choices: {roomName:string; username:string},
  Join: undefined,
  Results: {roomName:string, username:string}
}

const Stack = createNativeStackNavigator<RootStackParams>()

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
            name="Start"
            component = {StartScreen}
          />
          <Stack.Screen
            name="Create1"
            component={CreateRoomPg}
            options={{headerShown: true,
            headerTitleStyle: {
              color: 'white'
            }}}
          />
          <Stack.Screen
            name="Create2"
            component={CreatePart2}
            options={{headerShown: true,
            headerTitleStyle: {
              color: 'white'
            }}}
          />
          <Stack.Screen
            name="Success"
            component={SuccessCreatePg}
            options={{headerShown: true,
              headerTitleStyle: {
                color: 'white'
            }}}
          />
          <Stack.Screen
            name="Join"
            component={JoinRoom}
            options={{headerShown: true,
              headerTitleStyle: {
                color: 'white'
            }}}
          />
          <Stack.Screen
            name="Choices"
            component={ChoicesPg}
          />
          <Stack.Screen
            name="Results"
            component={Results}
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
