import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

type location = {
  "address1": string,
  "address2": string,
  "address3": string,
  "city": string,
  "zip_code": string,
  "country": string,
  "state": string,
  "display_address": Array<string>
}
type category = {
  "alias": string,
  "title": string
}

const Card = ( { restaurant }: {restaurant: {
  "name":string,
  "image_url":string,
  "is_closed":boolean,
  "url":string,
  "review_count":number,
  "categories":Array<category>,
  "rating": number,
  "price":string,
  "location":location,
  "phone":string,
  "display_phone":string,
  "distance":number
}} ) => {

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <View style={styles.stars}>
          {([...Array(5)]).map((e, i) => {
            if (i > Math.round(restaurant.rating) - 1) {
              return <AntDesign name="star" size={20} color="#C5C2C2" />
            } else {
              return <AntDesign name="star" size={20} color="#FF0000" />
            }
          })}
          <Text style={{color: '#C5C2C2', fontSize:12}}>{"   (" + restaurant.review_count})</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.categories}>
          {restaurant.categories.map(cat => {
              return (<Text style={{marginRight: 20}}>{cat.title}</Text>)
            })}
        </View>
        <Text style={styles.price}>{restaurant.price}</Text>
      </View>
      <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: restaurant.image_url}} />
      </View>
      <View style={styles.openAndNumber}>
        <Text style={{color:restaurant.is_closed ? "#DD0000" : "#039A00"}}>{restaurant.is_closed === true ? "Closed" : "Open now"}</Text>
        <Text>{restaurant.display_phone}</Text>
      </View>
      <View style={styles.distance}>
        <Ionicons name="location-sharp" size={20} color="#FF4040" />
        <Text> {Math.round(restaurant.distance * 0.000621371 * 100) / 100} miles</Text>
      </View>
      <View style={styles.location}>
        <Text>{restaurant.location?.display_address.join(", ")}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        margin:15,
        backgroundColor:'white'
    },
    header: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    restaurantName: {
      fontSize: 24,
      fontFamily: "Inter",
    },
    stars: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    subHeader: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginBottom: 5
    },
    categories: {
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:"flex-start",
      fontFamily: 'Inter',
      fontSize: 14,
    },
    price: {
      fontFamily: 'Inter',
      fontSize: 14,
    },
    imageContainer: {
      flex:11,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius:15
    },
    openAndNumber: {
      marginTop: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    distance: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    location: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontFamily: 'Inter'
    }


})

export default Card