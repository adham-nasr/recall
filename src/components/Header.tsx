import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../colors'

const Header = () => {
  return (
    <View style={styles.header}> 
      <Text style={styles.headerText}>Practice</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        marginBottom:20,
        padding:20
    },
    headerText:{
        fontSize:30,
        fontWeight:"bold",
        color : COLORS.primary
    }
})