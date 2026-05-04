import { ScrollView, StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useState } from 'react'
import { Answer } from '../types'
import { states } from '../types'
import AnswerOption from './AnswerOption'
import { COLORS } from '../colors'
const Answers = ({answers,status,selected}:{answers:Answer[],status:states[],selected:[number,Function]}) => {

  return (
    <View style={styles.container}>
      <ScrollView>
        {answers.map((answer,ind)=>(
        <AnswerOption key={answer.id} ind={ind} answer={answer} status={status[ind]} selected={selected} />
    )
    )}
      </ScrollView>
    </View>
  )
}

export default Answers

const styles = StyleSheet.create({
  container:{
    flex:4,
    width:"100%",
    backgroundColor: COLORS.surface,
  }
})