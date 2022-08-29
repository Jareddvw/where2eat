import { SafeAreaView } from "react-native-safe-area-context"
import React, {useRef, useState} from "react"
import { StyleSheet, View, Text, TextInput, Pressable, findNodeHandle, } from "react-native"
import EvilIcons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

type create1Props = NativeStackScreenProps<RootStackParams, "Create1", "Stack">

const CreateRoomPg = ({ navigation }: create1Props) => {

    let [location, setLocation] = useState<string>("")
    let [food, setFood] = useState<string>("")
    let [roomName, setRoomName] = useState<string>("")

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTxt}>Create a room</Text>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>Where will you be eating?</Text>
            <View style={styles.searchSection}>
                <EvilIcons style={styles.searchIcon} name="location-sharp" size={20} color="black"/>
                <TextInput
                    style={styles.input}
                    placeholder="San Francisco"
                    onChangeText={(location)=>{setLocation(location)}}
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>Food type?</Text>
            <View style={styles.searchSection}>
                <MaterialCommunityIcons style={styles.searchIcon} name="silverware-fork-knife" size={20} color="black"/>
                <TextInput
                    style={styles.input}
                    placeholder="Mexican"
                    onChangeText={(food)=>{setFood(food)}}
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>Custom room name</Text>
            <View style={styles.searchSection}>
                <MaterialIcons style={styles.searchIcon} name="group" size={20} color="black"/>
                <TextInput
                    style={styles.input}
                    placeholder="pickyeaterparty"
                    onChangeText={(roomName)=>{setRoomName(roomName)}}
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
        <Pressable 
            style={styles.button}
            onPress={() => navigation.navigate("Create2", {
                roomName:roomName,
                food:food,
                location:location
            })}>
            <Text style={styles.buttonTxt}>next step</Text>
        </Pressable>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTxt: {
        fontSize: 32,
        fontFamily: "Inter",
        fontWeight: "400",
    },
    inputArea: {
        marginTop:45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captionText: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 16
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        width: 287,
        borderRadius: 30,
        height: 46,
    },
    searchIcon: {
        padding: 10,
        marginLeft:2
    },
    input: {
        flex: 1,
        paddingRight: 10,
        marginLeft:7,
        color: 'black',
        fontSize: 20,
        fontFamily: "Inter"
    },
    button: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "rgba(255,64,64,1)",
        width: 287,
        height: 43,
        borderRadius: 30,
        marginTop: 71,
        marginBottom: 50
    },
    buttonTxt: {
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: "400",
        color: "#FFFFFF",
    },
})

export default CreateRoomPg