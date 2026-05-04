import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../colors'
const _layout = () => {

const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.opening}>
        <Stack /> 
      </SafeAreaView>
    </QueryClientProvider>
  )
}

export default _layout

const styles = StyleSheet.create({
    opening:{
        flex:1,
        backgroundColor: COLORS.bg,
    }
})