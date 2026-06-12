import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BookmarkCard from '../components/BookmarkCard'
import { COLORS } from '../utils/colors'
import WrongCard from '../components/WrongCard'

const Review = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Needs Review</Text>
      <WrongCard />
      <BookmarkCard />
    </View>
  )
}

export default Review

const styles = StyleSheet.create({
    container:{
        marginBottom:20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.primary700,
        marginBottom: 12,
    }
})