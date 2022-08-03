import React from 'react'
import { Text, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const HomeScreen = ({ navigation }: {navigation: any}) => {
  return (
    <SafeAreaView>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('test')}
        >
          <Text style={styles.buttonText}>
            Create a group
          </Text>
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
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
    width: 221,
  },
  buttonText: {
    color: 'white'
  }
})

export default HomeScreen