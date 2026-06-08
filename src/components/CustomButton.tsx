import { DimensionValue, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/colors'

const CustomButton = ({title,pressHandler,customStyles={},textStyles={}, bgColor=COLORS.primary}:{title:string,pressHandler:any,customStyles?:{},textStyles?:{},bgColor?:string}) => {
  return (
    <Pressable style={{...styles.button , ...customStyles  , backgroundColor:bgColor}} onPress={pressHandler}>
        <Text style={{...styles.buttonText,...textStyles}}>{title}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button:{
        width:"100%",
        padding:10,
        borderRadius:10,
        alignItems:"center",
        borderColor:COLORS.primary
    },
    buttonText:{
      color:COLORS.onPrimary,
      fontSize:16
    }
})