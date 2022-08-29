import { SafeAreaView } from "react-native-safe-area-context"
import React, {useRef, useState} from "react"
import { StyleSheet, View, Text, TextInput, Pressable, findNodeHandle, } from "react-native"
import EvilIcons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from '@expo/vector-icons'; 
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

type successProps = NativeStackScreenProps<RootStackParams, "Success", "Stack">

const SuccessCreatePg = ({ navigation, route }: successProps) => {

    let [username, setUsername] = useState<string>("")

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTxt}>Success!</Text>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>Your room was created. Here's the room code:</Text>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="copy-outline" size={20} color="black"/>
                <Text
                    style={styles.input}
                >
                    {route.params.roomName}
                </Text>
            </View>
        </View>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>Custom username</Text>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="person-circle-outline" size={20} color="black"/>
                <TextInput
                    style={styles.input}
                    placeholder="tacolover99"
                    onChangeText={(name)=>{setUsername(name)}}
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
        <Pressable 
            style={styles.button}
            onPress={() => {
                navigation.navigate("Choices", 
                {
                    roomName:route.params.roomName,
                    username:username
                })
            }}>
            <Text style={styles.buttonTxt}>join room</Text>
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
        width: 287,
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

export default SuccessCreatePg