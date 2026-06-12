import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../utils/colors'

const Tag = ({text,customStyles={},textStyles={}}:{text:string,customStyles?:{},textStyles?:{}}) => {
  return (
    <View style={[styles.badgeView,customStyles]}>
        <Text style={[styles.badgeText,textStyles]}>{text}</Text>
    </View>
  )
}

export default Tag

const styles = StyleSheet.create({
    badgeView:{
        backgroundColor: COLORS.surface2,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
    },
    badgeText: {
        color: COLORS.textMuted,
        fontWeight: 'bold',
        fontSize: 12,
  },
})