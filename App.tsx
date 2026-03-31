import React from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Routes from './src/app/navigation/navigation'
import { AuthProvider } from './src/app/contexts/AuthContext'

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <AuthProvider>
      <Routes />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </AuthProvider>
  )
}

