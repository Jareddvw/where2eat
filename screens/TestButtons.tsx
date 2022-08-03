import { StyleSheet, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from '@expo-google-fonts/inter';

const TestButtons = () => {

  return (
    <SafeAreaView style={styles.container}>
        <View>
        <Text style={styles.blackText}>
            Where
            <Text style={styles.redText}>
                2
            </Text>
            Eat
        </Text>
        </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonTxt}>create a room</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonTxt}>join a room</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonTxt}>how it works</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: "rgba(255,64,64,1)",
      width: 220,
      height: 43,
      borderRadius: 30,
      marginBottom: 29,
    },
    buttonTxt: {
      fontSize: 20,
      fontFamily: "Inter",
      fontWeight: "400",
      color: "rgba(255, 255, 255, 1)",
    },
    blackText: {
        fontSize: 32,
        fontFamily: "Inter",
        fontWeight: "400",
    },
    redText: {
        fontSize: 32,
        fontFamily: "Inter",
        fontWeight: "500",
        color: "#FF0000"
    }
  })

export default TestButtons