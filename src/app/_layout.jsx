import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../colors'
import { PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

import { queryClient } from './queryClient';
import { persister } from './persister';

const _layout = () => {
  

  return (
    <PersistQueryClientProvider
       client={queryClient}
       persistOptions = {{
        persister,
        maxAge:1000 * 60 * 60 * 24
       }}
       >
      <SafeAreaView style={styles.opening}>
        <Stack /> 
      </SafeAreaView>
    </PersistQueryClientProvider>
  )
}

export default _layout

const styles = StyleSheet.create({
    opening:{
        flex:1,
        backgroundColor: COLORS.bg,
    }
})