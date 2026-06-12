import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import Progress from './Progress'

const TrackingSection = () => {

    const { user } = useAuth()

  return (
    <View>
      {user &&
      <>
        <Progress />
      </>
      }
    </View>
  )
}

export default TrackingSection

const styles = StyleSheet.create({})