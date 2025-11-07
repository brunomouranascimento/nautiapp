import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function PaidTracker() {
  const navigation: any = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Rastreamento',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerTitleStyle: { color: '#2C3545', fontWeight: '700' },
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
        >
          <Feather name="arrow-left" size={20} color="#2C3545" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.popToTop?.() ?? navigation.navigate('Home')}
          style={styles.headerBtn}
        >
          <Feather name="x" size={22} color="#2C3545" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Rastreamento</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <Text style={styles.title}>
        Para utilizar este serviço você precisará ser assinante do serviço de
        rastreamento XPTO.
      </Text>

      <Text style={styles.subtitle}>
        Se você já é assinante basta seguir e fazer a integração com seu usuário
        e senha. Caso ainda não seja um assinante toque em SAIBA MAIS e
        informe-se.
      </Text>

      <View style={{ height: 16 }} />

      <TouchableOpacity
        style={styles.primaryBtn}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Já possuo acesso"
        onPress={() => navigation.navigate('PaidTrackerAccess')}
      >
        <Text style={styles.primaryText}>JÁ POSSUO ACESSO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Saiba mais"
        onPress={() => navigation.navigate('RastreamentoSaibaMais')}
      >
        <Text style={styles.secondaryText}>SAIBA MAIS</Text>
      </TouchableOpacity>
    </View>
  )
}

const BG = '#2C3545'
const TEXT = '#E6ECF5'
const MUTED = '#C8D0DF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 16
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 50
  },
  headerTitleName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  headerBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  title: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
    marginTop: 8
  },
  subtitle: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12
  },
  primaryBtn: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  },
  primaryText: {
    color: '#2C3545',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  secondaryBtn: {
    height: 52,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent'
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5
  }
})

