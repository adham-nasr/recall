import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { category, CategoryInfo } from '../types'
import { COLORS } from '../utils/colors'

import { ActivityIndicator } from 'react-native-paper'

import { useFetchCategories } from '../hooks/useFetchCategories'
import CategorySmartCard from '../components/CategorySmartCard'
import CategoryModal from '../features/CategoryModal'

const categories = () => {

    const {data,error,isLoading} = useFetchCategories();
    const [modalVisible,setModalVisible] = useState(false)
    const [category,setCategory] = useState<category|null>(null)
    const categoryClickHandler = (category:string)=>{
        setModalVisible(true);
        setCategory(category);
    }

  return (
    <View style={styles.container}>
        {
            isLoading ? 
            <ActivityIndicator animating={true} color={COLORS.primary} /> 
            :
            error ? 
            <Text style={{fontSize:24,color:COLORS.danger,fontWeight:"bold"}}>{error.message}</Text>
             :
             <>
                <FlatList
                    data={data}
                    renderItem={({item})=><CategorySmartCard categoryClickHandler={categoryClickHandler} item={item}/>}
                    keyExtractor={(item) => String(item.id)} 
                />
                <CategoryModal category={category} modalVisible={modalVisible} setModalVisible={setModalVisible} />
             </>
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