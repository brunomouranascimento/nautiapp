import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type MenuItem = {
  label: string
  route: string
}

const items: MenuItem[] = [
  { label: 'Minhas embarcações', route: 'PaidVessel' },
  { label: 'Minhas revisões', route: 'PaidRevisions' },
  { label: 'Minhas manutenções', route: 'PaidRevision' },
  { label: 'Rastreamento', route: 'PaidTracker' }
]

export default function PaidVessels() {
  const navigation: any = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Embarcações',
      headerTitleAlign: 'center',
      headerTitleStyle: { color: '#2C3545', fontWeight: '700' },
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={20} color="#2C3545" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            // Fecha o fluxo atual. Ajuste conforme sua árvore de navegação:
            if (navigation.getState()?.routes?.length > 1) {
              navigation.popToTop?.()
            } else {
              navigation.navigate?.('Home')
            }
          }}
          style={styles.headerBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="x" size={22} color="#2C3545" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const open = (route: string) => navigation.navigate(route)

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          color="#ffffff"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Embarcações</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <View style={styles.container}>
        {items.map(it => (
          <TouchableOpacity
            key={it.route}
            activeOpacity={0.9}
            onPress={() => open(it.route)}
            style={styles.pill}
          >
            <Text style={styles.pillText}>{it.label}</Text>
            <Feather name="chevron-right" size={20} color="#D9DFEA" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3545', // fundo do mock
    paddingHorizontal: 16,
    paddingTop: 16
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 50,
    color: '#ffffff'
  },
  headerTitleName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff'
  },
  pill: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#3B475B', // pílula um tom acima do fundo
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  pillText: {
    color: '#E6ECF5',
    fontSize: 16,
    fontWeight: '600'
  },
  headerBtn: { paddingHorizontal: 8, paddingVertical: 6 }
})

