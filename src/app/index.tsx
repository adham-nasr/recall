import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PracticeMethods from '../components/PracticeMethods'
import Header from '../components/Header'
import { COLORS } from '../utils/colors'

const index = () => {
  return (
    <View style={styles.home}>
      <Header />
      <PracticeMethods />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:COLORS.bg
    }
})