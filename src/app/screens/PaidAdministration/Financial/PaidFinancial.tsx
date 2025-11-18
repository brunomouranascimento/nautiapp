import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function PaidFinancialScreen() {
  const navigation: any = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  const handleNavigateMensalidades = () => {
    navigation.navigate('Monthly') // ajuste o nome da rota se necessário
  }

  const handleNavigateAbastecimentos = () => {
    navigation.navigate('PaidFuel') // ajuste o nome da rota se necessário
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

        <Text style={styles.headerTitle}>Financeiro</Text>

        {/* X transparente para manter alinhamento */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.9}
          onPress={handleNavigateMensalidades}
        >
          <Text style={styles.menuText}>Mensalidades</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.9}
          onPress={handleNavigateAbastecimentos}
        >
          <Text style={styles.menuText}>Abastecimentos</Text>
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

