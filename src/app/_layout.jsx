import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

import { queryClient } from '../utils/queryClient';
import { persister } from '../utils/persister';

import { useAuth } from '../hooks/useAuth'
import { AuthContextProvider } from '../contexts/AuthContext'
import { COLORS } from '../utils/colors'



// 1. This new child component can safely use the auth hook
const RootLayoutNav = () => {
  const { user } = useAuth();
  
  console.log("USER =", user);

  return (
    <SafeAreaView style={styles.opening}>
      <Stack>
        {/* Protected screens for logged-in users */}
        <Stack.Protected guard={user}>
          <Stack.Screen name='index'/>
          <Stack.Screen name='practice' />
          <Stack.Screen name='categories' />
        </Stack.Protected>

        {/* Protected screens for logged-out users */}
        <Stack.Protected guard={!user}>
          <Stack.Screen name='login' options={{ headerShown: false }}/>
          <Stack.Screen name='register' options={{ headerShown: false }}/>
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
};

// 2. The main layout wrapper that sets up the providers
const _layout = () => {
  return (
    <AuthContextProvider>
      <PersistQueryClientProvider 
        client={queryClient} 
        persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
      >
        <RootLayoutNav />
      </PersistQueryClientProvider>
    </AuthContextProvider>
  );
};

export default _layout

const styles = StyleSheet.create({
    opening:{
        flex:1,
        backgroundColor: COLORS.bg,
    }
})