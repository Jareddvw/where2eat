import React, {useState, useMemo, Ref} from 'react'
import {StyleSheet, View, SafeAreaView, Text, Pressable, Platform } from 'react-native'
import { Animated, PanResponder } from 'react-native';
import { useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Card from '../components/Card';
import { Feather } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';
import sampleData from '../components/sampleData';

const windowWidth = (Dimensions.get('window').width)
const windowHeight = (Dimensions.get('window').height)

const ChoicesPg = ({ navigation }: {navigation: any}) => {
    
    const fourthWindowWidth = windowWidth / 4;

    const restaurantList = sampleData


    const childRefs: any = useMemo(
        () =>
          Array(restaurantList.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const swipe = async (dir:string, index:number) => {
        if (currentIndex >= restaurantList.length) return;
        if (childRefs[index] !== null) {
            await childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: true}
        ),
        onPanResponderRelease: () => {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true
        }).start();
        }
      })
    ).current;

    const [rightOrLeft, setRightOrLeft] = useState(0.5)
    const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <SafeAreaView style={styles.outermost}>
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.blackText}>
                    Where
                    <Text style={styles.redText}>
                        2
                    </Text>
                    Eat
                </Text>
                <View style={styles.partyView}>
                    <Text style={styles.partyName}>pickyeaterparty</Text>
                    <Pressable style={{marginBottom: 0}} onPress={()=>{navigation.navigate("start")}}>
                        <MaterialCommunityIcons style={styles.partyName} name="exit-run" />
                    </Pressable>
                </View>
                <Text style={styles.userName}>tacolover99</Text>
            </View>
            <View style={styles.cardSection}>
                    <TinderCard 
                        preventSwipe={['up', 'down']}
                        swipeRequirementType={"position"}
                        swipeThreshold={windowWidth / 2}
                        onSwipeRequirementFulfilled = {(dir) => {
                            if (dir === 'left') {
                                setRightOrLeft(0)
                            } else if (dir === 'right') {
                                setRightOrLeft(1)
                            }
                        }}
                        onSwipeRequirementUnfulfilled = {() => {
                            setRightOrLeft(0.5)
                        }}
                        onSwipe={(dir) => {
                            setRightOrLeft(0.5)
                            // need to add stuff to remove the old cards
                        }}
                        ref={childRefs[currentIndex]}
                        >
                        <View style={styles.cards}>
                            <Card restaurant={restaurantList[2]} />
                        </View>
                    </TinderCard>
            </View>
            <View style={styles.buttonSection}>
                <Pressable 
                    style={[
                        styles.button, 
                        styles.redButton,
                        {opacity: (rightOrLeft < 0.5 ? 1 : 0.33)}
                        ]}
                    onPress={()=>swipe('left', 0)}
                    >
                        <MaterialCommunityIcons name="window-close" size={32} color="white" />
                </Pressable>
                <Pressable style={[
                        styles.button,
                        styles.greenButton,
                        {opacity: (rightOrLeft > 0.5 ? 1 : 0.33)}
                    ]}
                    onPress={()=>swipe('right', 0)}
                    >
                        <Feather name="check" size={32} color="white" />
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
      )
    }
    
const styles = StyleSheet.create({
    outermost: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginLeft: 0,
        marginRight: 0
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-start',
        marginLeft: 16,
        marginRight: 16
    },
    headerView: {
        flex:2,
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
    cardSection: {
        marginTop: 19,
        flex:10,
        height: (10 * windowHeight / 13),
        width: windowWidth - 32,
        position: 'relative',
    },
    cards: {
        flex: 1,
        backgroundColor: "white",
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOpacity: 100,
        shadowRadius: 4,
        elevation: 3,
        shadowOffset: { width: 0, height: 0 },
        height: (10 * windowHeight / 15),
        width: windowWidth - 32,
        borderRadius: 15,
        zIndex: 1,
        position: 'absolute'
    },
    buttonSection: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        zIndex: -100,
    },
    button: {
        height: 39,
        width: 39,
        borderRadius: 39/2,
        zIndex: -100,
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    redButton: {
        backgroundColor: '#DD0000'
    },
    greenButton: {
        backgroundColor: '#039A00'
    },
    check: {
        height: 39,
        width: 39,
    }
})

export default ChoicesPg