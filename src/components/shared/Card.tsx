import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'
import { COLORS } from '../../utils/colors'



const Card = ({children}:{children?:any}) => {
  return (
    <View style={styles.card}>
        {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card:{
        padding: 16,
        borderRadius: 8,
        margin: 10,
        backgroundColor: COLORS.surface,
        color:COLORS.primary,
        borderWidth:1,
        borderColor: COLORS.border
      },
})