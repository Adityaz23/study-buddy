import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '@/context/AppProvider'

const ExploreScreen = () => {
  const {channel} = useAppContext();
  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  )
}

export default ExploreScreen