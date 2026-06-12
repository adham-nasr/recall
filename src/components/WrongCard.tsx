import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './shared/Card'
import Tag from './shared/Tag'
import { COLORS } from '../utils/colors'
import { useRouter } from 'expo-router'
import { paths, practiceCriterias } from '../utils/constants'

const WrongCard = () => {

  const router = useRouter()
  const pressHandler = ()=>{
    router.navigate({pathname:paths.PRACTICE_GROUND as any,params:{criteria:practiceCriterias.WRONG_ATTEMPT}});
  }

  return (
    <Card>
        <Pressable onPress={pressHandler} style={styles.reviewRow}>
          <Text style={styles.reviewEmoji}>🚨</Text>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewTitle}>Wrong Attempts</Text>
            <Text style={styles.reviewSubtitle}>Fix mistakes from your last session</Text>
          </View>
          <Tag text='4'/>
        </Pressable>
    </Card>
  )
}

export default WrongCard

const styles = StyleSheet.create({
    reviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
  reviewEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color:COLORS.text
  },
  reviewSubtitle: {
    fontSize: 12,
    color:COLORS.textMuted,
    marginTop: 2,
  },
})