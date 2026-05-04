import { DimensionValue, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../colors'

const CustomButton = ({title,pressHandler,width="100%",bgColor=COLORS.primary}:{title:string,pressHandler:Function,width?:DimensionValue,bgColor?:string}) => {
  return (
    <Pressable style={{...styles.button,width:width , backgroundColor:bgColor}} onPress={()=>{pressHandler()}}>
        <Text style={{color:COLORS.onPrimary} }>{title}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button:{
        padding:10,
        borderRadius:10,
        alignItems:"center",
        borderColor:COLORS.primary
    }
})