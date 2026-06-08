import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Answer, states } from '../types'
import { RadioButton } from 'react-native-paper'
import { COLORS } from '../utils/colors'
const AnswerOption = ({ind,answer,status,selected}:{ind:number ,answer:Answer,status:states,selected:[number,Function]}) => {
    

    // const sel = selected[0] === ind;
    // const selectedHandler = selected[1];
    const [sel,selectedHandler] = selected;

    const color = status === states.correct ? COLORS.success : status === states.wrong ? COLORS.danger : sel===ind ? COLORS.surface2 : COLORS.bg;

    return (
    <Pressable style={{...styles.container,backgroundColor:color}} onPress={()=>{selectedHandler(ind)}}>
        <View style={styles.left}>
            <RadioButton value={String(ind)} status={sel===ind ? 'checked' : 'unchecked'} /> 
            <Text>{String.fromCharCode(97 + ind)}</Text>
        </View>
        <Text style={styles.answer}>{answer.content}</Text>
    </Pressable>
  )
}

export default AnswerOption

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        marginVertical:10,
        borderRadius:5,
        backgroundColor: COLORS.bg,
        borderWidth:1,
        borderColor: COLORS.borderStrong
    },
    left:{
        flexDirection:"row",
        alignItems:"center",
        marginRight:20
    },
    answer:{
        fontSize:20,
        color:COLORS.text,
        flexShrink:1,
    }
})