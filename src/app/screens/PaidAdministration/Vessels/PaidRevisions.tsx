import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Revisao = {
  id: string
  embarcacao: string
  ultima: string // ISO ou dd/mm/yyyy
  proxima: string // ISO ou dd/mm/yyyy
}

const ITEMS: Revisao[] = [
  {
    id: '1',
    embarcacao: 'Tormenta dos Mares',
    ultima: '01/02/2023',
    proxima: '01/06/2023'
  }
  // Acrescente mais itens aqui quando precisar
]

export default function PaidRevisions() {
  const navigation: any = useNavigation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(ITEMS.map(i => [i.id, true]))
  )

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Revisões',
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

  const toggle = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

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
        <Text style={styles.headerTitleName}>Revisões</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <Text style={styles.sectionTitle}>Últimas revisões</Text>

      {ITEMS.map(it => {
        const isOpen = expanded[it.id]
        return (
          <View key={it.id} style={styles.card}>
            {/* Pílula/topo do card */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.topPill}
              onPress={() => toggle(it.id)}
            >
              <Text style={styles.pillText}>{it.embarcacao}</Text>
              <Feather
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#D9DFEA"
              />
            </TouchableOpacity>

            {/* Conteúdo do card */}
            {isOpen && (
              <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
                <View style={styles.row}>
                  <Feather name="calendar" size={16} color="#D9DFEA" />
                  <Text style={styles.rowLabel}>Última revisão</Text>
                  <Text style={styles.rowValue}>{it.ultima}</Text>
                </View>
                <View style={styles.row}>
                  <Feather name="calendar" size={16} color="#D9DFEA" />
                  <Text style={styles.rowLabel}>Próxima revisão</Text>
                  <Text style={styles.rowValue}>{it.proxima}</Text>
                </View>
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

const BG = '#2C3545'
const CARD = '#253049'
const PILL = '#3B475B'
const TEXT = '#E6ECF5'
const MUTED = '#D9DFEA'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingTop: 8
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
  sectionTitle: {
    textAlign: 'center',
    color: TEXT,
    fontWeight: '700',
    fontSize: 18,
    marginVertical: 16,
    opacity: 0.95
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    marginBottom: 16
  },
  topPill: {
    backgroundColor: PILL,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pillText: {
    color: TEXT,
    fontWeight: '800',
    fontSize: 15,
    opacity: 0.95
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10
  },
  rowLabel: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '600',
    flex: 1
  },
  rowValue: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.95
  }
})

