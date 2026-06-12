import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { AttemptStat, CategoryInfo } from '../types'
import { COLORS } from '../utils/colors';
import { paths } from '../utils/constants';

import { ratioType , getCategoryColor } from '../utils/helpers';

const CategorySmartCard = ({item,categoryClickHandler}:{item:ratioType,categoryClickHandler:Function}) => {

    const color = getCategoryColor(item.name)
    const {solved , progress , total} = item

  return (

     <Pressable onPress={()=>{categoryClickHandler(item.name)}} style={styles.myCategoryCard}>
        <View style={[styles.categoryColorTag, { backgroundColor: color }]} />
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryProgress}>{solved} / {total} Solved</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
        </View>
    </Pressable>
    // <Pressable onPress={pressHandler}  style={styles.card}>
    //     <Text style={styles.title}>{item.name}</Text>
    //     <Text style={styles.text}>{item.count}</Text>
    // </Pressable>
  )
}

export default CategorySmartCard

const styles = StyleSheet.create({
  card:{
    padding: 16,
    borderRadius: 8,
    margin: 16,
    backgroundColor: COLORS.surface,
    color:COLORS.primary,
    borderWidth:1,
    borderColor: COLORS.border
  },
  myCategoryCard:{
    padding: 16,
    borderRadius: 8,
    margin: 16,
    backgroundColor: COLORS.surface,
    color:COLORS.primary,
    borderWidth:1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title:{
    fontSize:24,
    fontWeight:"bold",
    color: COLORS.text
  },
  text:{
    fontSize:20,
    color: COLORS.textMuted
  },
  categoryCard: {
    backgroundColor: '#FFF',
    width: '48%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryColorTag: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  categoryName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  categoryProgress: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 8,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.surface2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
})