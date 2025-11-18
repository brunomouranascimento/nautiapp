import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function SosHelpScreen() {
  const navigation: any = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  const handleNavigateAuthorities = () => {
    navigation.navigate('SosAuthorities') // tela de contato com autoridades
  }

  const handleNavigateMarinaChat = () => {
    navigation.navigate('SosMarina') // chat com marina
  }

  const handleNavigateShareLocation = () => {
    navigation.navigate('SosShareLocation') // compartilhar localização (modal lá dentro)
  }

  const handleNavigateIncident = () => {
    navigation.navigate('SosIncident') // reportar incidente
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Solicitar ajuda</Text>

        {/* X transparente para manter alinhamento */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Que tipo de ajuda você precisa?</Text>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.9}
          onPress={handleNavigateAuthorities}
        >
          <Text style={styles.menuText}>Contato com autoridades</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.9}
          onPress={handleNavigateMarinaChat}
        >
          <Text style={styles.menuText}>Falar com minha marina</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.9}
          onPress={handleNavigateShareLocation}
        >
          <Text style={styles.menuText}>Compartilhar localização</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.9}
          onPress={handleNavigateIncident}
        >
          <Text style={styles.menuText}>Registrar um incidente</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const DARK_BG = '#1F2633'
const BUTTON_BG = '#3A4A63'
const WHITE = '#FFFFFF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16
  },
  title: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20
  },
  menuButton: {
    backgroundColor: BUTTON_BG,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  menuText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '500'
  }
})

