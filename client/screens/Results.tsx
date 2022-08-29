import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParams } from '../App'
import { SocketContext } from '../context/socket'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

type resultsProps = NativeStackScreenProps<RootStackParams, "Results", "Stack">

const Results = ({navigation, route}: resultsProps) => {

    let { socket, restaurants, setRestaurants } = useContext(SocketContext)

    const leaveRoom = () => {
        socket.emit("leave-room", route.params.roomName);
        setRestaurants([])
        navigation.navigate("Start")
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
            <Text style={styles.blackText}>
                Where
                <Text style={styles.redText}>
                    2
                </Text>
                Eat
            </Text>
            <View style={styles.partyView}>
                <Text style={styles.partyName}>{route.params.roomName}</Text>
                <Pressable style={{marginBottom: 0}} onPress={leaveRoom}>
                    <MaterialCommunityIcons style={styles.partyName} name="exit-run" />
                </Pressable>
            </View>
            <Text style={styles.userName}>{
                restaurants[0].yeses && restaurants[0].nos ?
                restaurants[0].yeses.length + restaurants[0].nos.length :
                0} members
                
                </Text>
            </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-start',
        marginLeft: 16,
        marginRight: 16
    },
    headerView: {
        // flex:sizes.headerView,
        alignItems:'flex-start',
        marginTop: Platform.OS === "ios" ? 10 : 30,
        justifyContent: 'space-between',
    },
    blackText: {
        alignSelf: 'flex-start',
        fontSize: 32,
        fontFamily: "Inter",
        fontWeight: "400",
    },
    redText: {
        fontSize: 35,
        fontFamily: "Inter",
        fontWeight: "500",
        color: "#FF0000"
    },
    partyView: {
        alignSelf: 'flex-start',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginLeft: 0,
        marginRight: 0
    },
    partyName: {
        fontSize: 20,
        fontFamily: 'Inter',
        color: '#A3A3A3'
    },
    userName: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontFamily: 'Inter',
        color: '#A3A3A3'
    },
})

export default Results