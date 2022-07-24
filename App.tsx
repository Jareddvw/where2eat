import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, SafeAreaView, ScrollView, Image, TextInput, Button } from 'react-native';
import {YELP_API_KEY} from '@env';
import { useEffect, useState } from 'react';

export default function App() {

  let [isLoading, setLoading] = useState(false)
  let [data, setData] = useState(null)
  let [searchTerm, setSearchTerm] = useState("")

  // useEffect(() => {
  //   getResults()
  // }, [])

  let api_key: string = YELP_API_KEY;
  let base_url: string = "https://api.yelp.com/v3/businesses/search"

  let getResults = async () => {
    setLoading(true)
     let response = await fetch(`${base_url}?term=${searchTerm}&location=SF`, {
      headers: {
        Authorization: `Bearer ${api_key}`,
      }
     })
     let result = await response.json()
     await setData(result)
     setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        style={styles.textInput} 
        placeholder="Restaurants, bars..."
        value={searchTerm}
        onChangeText = {setSearchTerm}
        >
        </TextInput>
        <Button 
          title="Go"
          onPress={() => getResults()}
          color="green"
          style={styles.goButton}/>
      <ScrollView style={styles.scrollView}>
        <Text>{searchTerm}</Text>
        <>{isLoading === false && data !== null ? 
          data.businesses?.map((business) => {
            return (
              <>
              <Text>{business.name}</Text>
              <Image key={business.id} source={{uri: business.image_url}} style={styles.img}/>
              </>
            )
          }) 
          // <Text>{JSON.stringify(data)}</Text>
          : <></>}
        </>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex:1,
  },
  img: {
    width: 300,
    height: 300,
    borderRadius:20,
    margin:10
  }, 
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius:10
  }, 
  goButton: {
    color:'green'
  }
});
