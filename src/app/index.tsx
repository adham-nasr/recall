import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PracticeMethods from '../components/PracticeMethods'
import Header from '../components/Header'
import { COLORS } from '../utils/colors'
import Progress from '../features/Progress'
import Review from '../features/Review'

const index = () => {
  return (
    <View style={styles.home}>
      <ScrollView >
        <Header />
        <PracticeMethods />
        <Progress />
        <Review />
      </ScrollView>
      {/* <Review />   */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    home:{
        flex:1,
        padding:10,
        backgroundColor:COLORS.bg
    }
})