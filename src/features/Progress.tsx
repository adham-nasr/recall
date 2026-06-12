import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '../api/stats'
import { useAuth } from '../hooks/useAuth'
import { ratioAttempts } from '../utils/helpers'
import { COLORS } from '../utils/colors'

const Progress = () => {

    const { user }= useAuth()
    
    const query = useQuery({
      queryKey:["stats"],
      queryFn:()=>getStats(user!.token)
    })

    const {data,error,isLoading} = query
    if(!data)
      return null;
    const ratioData = ratioAttempts(data);

  return (
    <View style={styles.container}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.cardsContainer}>
          {ratioData.map((category) => (
            <View key={category.name} style={styles.categoryPCard}>
              <View style={styles.categoryPHeader}>
                <Text style={styles.categoryPName}>{category.name}</Text>
                <Text style={styles.categoryPPercent}>
                  {category.progress}%
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${category.progress}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
    </View>
  )
}

export default Progress

const styles = StyleSheet.create({
    container:{
      paddingVertical:10,
      marginBottom:20
    },
    cardsContainer:{
      backgroundColor:COLORS.bg,
      paddingVertical:10,
    },
    sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary700,
    marginBottom: 12,
  },
    categoryPCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  categoryPHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  categoryPName: {
    color: COLORS.text,
    fontSize:18,
    fontWeight: "600",
  },

  categoryPPercent: {
    color: COLORS.text,
    fontSize:18
  },

  progressTrack: {
    height: 18,
    backgroundColor: "white",
    borderRadius: 999,
    overflow: "hidden",
    borderColor:COLORS.borderStrong,
    borderWidth:1
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },

})