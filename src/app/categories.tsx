import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryCard from '../components/CategoryCard'
import { CategoryInfo } from '../types'
import { COLORS } from '../utils/colors'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/getData'
import { ActivityIndicator } from 'react-native-paper'

const categories = () => {

    const query = useQuery({
        queryKey:["categories"],
        queryFn:getCategories
    })

    const {data,error,isLoading} = query

    console.log(data)

  return (
    <View style={styles.container}>
        {
            isLoading ? 
            <ActivityIndicator animating={true} color={COLORS.primary} /> 
            :
            error ? 
            <Text style={{fontSize:24,color:COLORS.danger,fontWeight:"bold"}}>{error.message}</Text>
             :
             <FlatList
                data={data}
                renderItem={({item})=><CategoryCard item={item}/>}
                keyExtractor={(item) => String(item.id)} 
             />
        }
      
    </View>
  )
}

export default categories

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:4,
        backgroundColor: COLORS.bg
    }
})