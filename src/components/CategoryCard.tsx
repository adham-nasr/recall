import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { CategoryInfo } from '../types'
import { COLORS } from '../colors';
const CategoryCard = ({item}:{item:CategoryInfo}) => {

  const router = useRouter();

  const pressHandler = ()=>{
    router.navigate({pathname:"/practiceGround",params:{category:item.name}});
  }

  return (
    <Pressable onPress={pressHandler}  style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.count}</Text>
    </Pressable>
  )
}

export default CategoryCard

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
  title:{
    fontSize:24,
    fontWeight:"bold",
    color: COLORS.text
  },
  text:{
    fontSize:20,
    color: COLORS.textMuted
  }
})