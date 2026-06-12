import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './shared/Card'
import Tag from './shared/Tag'
import { COLORS } from '../utils/colors'

const BookmarkCard = () => {
  return (
    <Card>
        <Pressable style={styles.reviewRow}>
          <Text style={styles.reviewEmoji}>⭐</Text>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewTitle}>Bookmarked Questions</Text>
            <Text style={styles.reviewSubtitle}>Review your saved questions</Text>
          </View>
          <Tag text='20'/>
        </Pressable>
    </Card>
  )
}

export default BookmarkCard

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