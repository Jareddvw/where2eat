import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {YELP_API_KEY} from '@env';

export default function App() {

  let api_key = YELP_API_KEY;

  return (
    <View style={styles.container}>
      <Text>Hiiiii there</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
