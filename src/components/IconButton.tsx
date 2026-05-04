import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IconButton = ({imgSrc,title,pressHandler}:{imgSrc:any,title:string,pressHandler:Function}) => {
  return (
    <Pressable style={styles.IconButton} onPress={()=>{pressHandler()}}>
        <Image style={styles.img} source={imgSrc} />
        <Text>{title}</Text>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    IconButton:{
        padding:10,
        alignItems:"center",
    },
    img:{
        width:80,
        height:80, 
        objectFit:"contain",
        marginBottom:8
    }
})