import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/colors'

const Question = ({statement} :{statement:string}) => {
  return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={styles.text}>{statement}</Text>
        </ScrollView>
    </View>
  )
}

export default Question

const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:8,
        flex:4,
        backgroundColor: COLORS.surface,
        width:"100%",
        maxHeight:"30%",
        borderRadius:20,
        borderWidth:2,
        borderColor: COLORS.borderStrong
    },
    text:{
        color:COLORS.text,
        fontSize:22,
    }

})