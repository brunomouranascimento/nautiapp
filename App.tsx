import React from 'react'
import { useColorScheme, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Routes from './src/app/navigation/navigation'
import { AuthProvider } from './src/app/contexts/AuthContext'

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <AuthProvider>
      <View style={styles.app}>
        <Routes />
        <StatusBar
          style={colorScheme === 'dark' ? 'light' : 'light'}
          backgroundColor="#2E3A4D"
        />
      </View>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#2E3A4D'
  }
})
