import React from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Routes from './src/app/navigation/navigation'

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <>
      <Routes />
      {/* Só cuida da status bar aqui */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  )
}
