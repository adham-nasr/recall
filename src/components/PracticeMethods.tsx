import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { useRouter } from 'expo-router';

const PracticeMethods = () => {
  const router = useRouter();

  const randomHandler = () => {
    router.navigate({pathname:"/practiceGround",params:{category:null}});
  }

  const categoryHandler = () => {
    router.navigate({pathname:"/categories"});
  }

  const randImg = require('../assets/randIcon.png'); // Resolved here
  const categImg = require('../assets/categoryIcon.png'); // Resolved here

  return (
    <View style={styles.container}>
      <IconButton imgSrc={randImg} title={"Random Questions"} pressHandler={randomHandler}/>
      <IconButton imgSrc={categImg} title={"Categories"} pressHandler={categoryHandler}/>
    </View>
  )
}

export default PracticeMethods

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginVertical:20,
    padding:5,
    justifyContent:"space-around",
  }
})