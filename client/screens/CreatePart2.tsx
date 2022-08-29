import React, {useCallback, useContext, useEffect, useState} from "react"
import { StyleSheet, View, Text, TextInput, Pressable, Platform, ActivityIndicator, } from "react-native"
import EvilIcons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from '@expo/vector-icons'; 
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { SocketContext } from "../context/socket";

const CreatePart2 = ( { navigation, route }: {navigation:any, route:any}) => {

    let addHours = function(h: number, date:Date) {
        date.setTime(date.getTime() + (h*60*60*1000));
        return date;
    }

    let [distance, setDistance] = useState<number>(2)
    let [time, setTime] = useState<Date>(addHours(0.5, new Date()))
    let [show, setShow] = useState<boolean>(false)
    let [prices, setPrices] = useState<Array<boolean>>([true, false, false, false])
    let [showActivity, setShowActivity] = useState<boolean>(false)

    const {socket, setRestaurants} = useContext(SocketContext)

    useEffect(() => {
        socket.on("successfully created room!", (rests) => handleSuccessfulCreate(rests))
        socket.on("error", (message) => handleFailedCreate(message))
    }, [])

    const handleFailedCreate = useCallback((message) => {
        console.log(message)
        setShowActivity(false)
    }, [])
    const handleSuccessfulCreate = useCallback((restaurants) => {
        console.log('successful create. Setting restaurants')
        setShowActivity(false)
        setRestaurants(restaurants)
        navigation.navigate("success", {roomName:route.params.roomName})
    }, [])

    const createRoom = () => {
        setShowActivity(true)
        console.log("create room called: " + route.params.roomName)
        socket.emit("create-room", route.params.roomName, {
            location: route.params.location,
            radius: parseInt(distance * 1609.344 + ""),
            term: route.params.food,
            open_at: Math.floor(time.getTime() / 1000),
            price: getPricesArray()
        })
    }

    const getPricesArray = () => {
        let result = []
        for (let i = 0; i < prices.length; i += 1) {
            if (prices[i] === true) {
                result.push(i + 1);
            }
        }
        return result
    }

    let timeToString = (newTime:Date): string => {
        let hours = newTime.getHours() 
        let end = (hours >= 12 ? " pm" : " am")
        hours = ((hours + 11) % 12 + 1)
        let minutes: number | string = newTime.getMinutes()
        minutes = (minutes < 10 ? "0" + minutes : "" + minutes)
        return hours + ":" + minutes + end
    }

    const onChange = (event: any, selectedDate: Date | undefined)=> {
        if (Platform.OS !== 'ios') {
            setShow(false)
        }
        if (selectedDate !== undefined) {
            setTime(selectedDate);
        }
    };

    const updatePricesAtIndex = (index: number) => {
        let newArr = [...prices]
        newArr[index] = !newArr[index]
        setPrices(newArr)
    }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTxt}>Almost done!</Text>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>Open at?</Text>
            <Pressable style={styles.timeSection} onPress={() => setShow(true)}>
                <Ionicons style={styles.searchIcon} name="time-outline" size={20} color="black"/>
                {Platform.OS === 'ios' ?
                <>
                <View style ={[styles.iosTimeWrapper]}>
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode="time"
                        is24Hour={false}
                        onChange={onChange}
                        style={[styles.iosTime]}
                        display='spinner'
                        themeVariant="light"
                        textColor = 'black'
                    />
                </View>
                </>
                :
                <Text style={styles.time}>
                    {timeToString(time)}
                </Text>
                }
            </Pressable>
        </View>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>How far away can food be?</Text>
                <Slider style={styles.slider}
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor="#E94A4A"
                    maximumTrackTintColor="#C5C2C2"
                    value={distance}
                    onValueChange={(distance) => setDistance(Math.round(distance * 10) / 10)}
                    tapToSeek={true}
                />
                <Text style={styles.dist}>{distance} miles</Text>
        </View>
        <View style={styles.inputArea}>
            <Text style={styles.captionText}>How pricy?</Text>
            <View style={styles.priceSection}>
                <Pressable 
                    style={prices[0] === true ? 
                        styles.priceButtonSelected :
                        styles.priceButtonNotSelected
                    }
                    onPress={() => {updatePricesAtIndex(0)}}>
                    <Text style={prices[0] === true ? 
                        styles.priceTextSelected :
                        styles.priceTextNotSelected
                    }>$</Text>
                </Pressable>
                <Pressable 
                    style={prices[1] === true ? 
                        styles.priceButtonSelected :
                        styles.priceButtonNotSelected
                    }
                    onPress={() => {updatePricesAtIndex(1)}}>
                    <Text style={prices[1] === true ? 
                        styles.priceTextSelected :
                        styles.priceTextNotSelected
                    }>$$</Text>
                </Pressable>
                <Pressable 
                    style={prices[2] === true ? 
                        styles.priceButtonSelected :
                        styles.priceButtonNotSelected
                    }
                    onPress={() => {updatePricesAtIndex(2)}}>
                    <Text style={prices[2] === true ? 
                        styles.priceTextSelected :
                        styles.priceTextNotSelected
                    }>$$$</Text>
                </Pressable>
                <Pressable 
                    style={prices[3] === true ? 
                        styles.priceButtonSelected :
                        styles.priceButtonNotSelected
                    }
                    onPress={() => {updatePricesAtIndex(3)}}>
                    <Text style={prices[3] === true ? 
                        styles.priceTextSelected :
                        styles.priceTextNotSelected
                    }>$$$$</Text>
                </Pressable>
            </View>
        </View>
        <Pressable style={styles.button} onPress={createRoom}>
            {showActivity === true ?
                <ActivityIndicator animating={true} hidesWhenStopped={true} color="white" style={styles.loading} /> :
                <></>
            }
            <Text style={styles.buttonTxt}>create new room</Text>
        </Pressable>
        {show === true && Platform.OS !== 'ios' ? (
            <RNDateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={false}
            onChange={onChange}
            style={{width: 320, backgroundColor: "white"}}
            />
        ) : <></>}
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
        marginBottom: 60
    },
    inputArea: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 65,
    },
    captionText: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 16
    },
    timeSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        width: 250,
        borderRadius: 30,
        height: 35,
    },
    searchIcon: {
        marginLeft:10,
        marginRight:10,
    },
    input: {
        flex: 1,
        paddingRight: 10,
        marginLeft:7,
        color: 'black',
        fontSize: 20,
        fontFamily: "Inter"
    },
    time: {
        flex: 1,
        paddingRight: 10,
        marginLeft:63,
        color: '#A3A3A3',
        fontSize: 20,
        fontFamily: "Inter"
    },
    iosTime: {
        color: '#A3A3A3',
        fontSize: 15,
        fontFamily: "Inter",
        width: 320,
        alignSelf: 'center',
    },
    iosTimeWrapper: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
        width: 320,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    button: {
        flexDirection:'row-reverse',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "rgba(255,64,64,1)",
        width: 287,
        height: 43,
        borderRadius: 30,
        marginTop: 40,
        marginBottom: 50
    },
    buttonTxt: {
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: "400",
        color: "#FFFFFF",
    },
    slider: {
        marginTop: 10,
        width: 287,
        height: 21,
        marginBottom:5
    },
    dist: {
        color: '#A3A3A3',
        fontSize: 15,
        fontFamily: "Inter",
    },
    priceSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 287,
        height: 46
    },
    priceButtonSelected: {
        justifyContent:'center',
        height:39,
        width:39,
        backgroundColor: "#E92D2D",
        borderRadius: 39/2
    },
    priceButtonNotSelected: {
        justifyContent:'center',
        height:39,
        width:39,
        backgroundColor: "#F4F4F4",
        borderRadius: 39/2
    },
    priceTextSelected: {
        color: 'white',
        alignSelf:'center',
        fontFamily:'Inter',
        fontSize:13,
    },
    priceTextNotSelected: {
        color: '#A3A3A3',
        alignSelf:'center',
        fontFamily:'Inter',
        fontSize:13,
    },
    loading: {
        position:'absolute',
        left: 20
    }
})

export default CreatePart2