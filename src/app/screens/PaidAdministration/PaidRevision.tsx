import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Manutencao = {
  id: string
  embarcacao: string
  data: string // dd/mm/aaaa
  valor?: string // "R$ 822,40"
  tipo?: string // "Elétrica"
  observacao?: string // texto
  status: 'concluida' | 'orcamento' | 'gasto'
}

const DATA: Manutencao[] = [
  {
    id: '1',
    embarcacao: 'Tormenta dos Mares',
    data: '01/03/2023',
    valor: 'R$ 822,40',
    tipo: 'Elétrica',
    observacao:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius magna id eros ornare semper.',
    status: 'concluida'
  },
  {
    id: '2',
    embarcacao: 'Tormenta dos Mares',
    data: '01/03/2023',
    status: 'concluida'
  },
  {
    id: '3',
    embarcacao: 'Boreal II',
    data: '14/07/2024',
    valor: 'R$ 1.250,00',
    tipo: 'Casco',
    observacao: 'Troca de anodos e polimento de hélice.',
    status: 'gasto'
  },
  {
    id: '4',
    embarcacao: 'Marujo Feliz',
    data: '22/10/2025',
    valor: 'R$ 580,00',
    tipo: 'Motor',
    observacao: 'Orçamento de correias e vela.',
    status: 'orcamento'
  }
]

export default function Revision() {
  const navigation: any = useNavigation()
  const [tab, setTab] = useState<'concluida' | 'orcamento' | 'gasto'>(
    'concluida'
  )
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    '1': true
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Manutenção',
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

  const filtered = useMemo(() => DATA.filter(d => d.status === tab), [tab])

  const toggle = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const renderChip = (
    label: string,
    selected?: boolean,
    disabled?: boolean
  ) => (
    <View
      key={label}
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled
      ]}
    >
      {selected && <Feather name="check" size={14} color="#DDE6F5" />}
      <Text
        style={[
          styles.chipText,
          selected && styles.chipTextSelected,
          disabled && styles.chipTextDisabled
        ]}
      >
        {label}
      </Text>
    </View>
  )

  const renderItem = ({ item }: { item: Manutencao }) => {
    const isOpen = !!expanded[item.id]
    return (
      <View style={styles.card}>
        {/* Pílula topo */}
        <TouchableOpacity
          style={styles.topPill}
          activeOpacity={0.9}
          onPress={() => toggle(item.id)}
        >
          <View>
            <Text style={styles.pillTitle}>{item.embarcacao}</Text>
            <Text style={styles.pillSub}>{item.data}</Text>
          </View>
          <Feather
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#D9DFEA"
          />
        </TouchableOpacity>

        {/* Conteúdo */}
        {isOpen && (
          <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
            {item.valor && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="currency-brl"
                  size={18}
                  color="#D9DFEA"
                />
                <Text style={styles.infoText}>{item.valor}</Text>
                {item.tipo && (
                  <>
                    <MaterialCommunityIcons
                      name="cog"
                      size={18}
                      color="#D9DFEA"
                    />
                    <Text style={styles.infoText}>{item.tipo}</Text>
                  </>
                )}
              </View>
            )}
            {item.observacao && (
              <View style={styles.infoRow}>
                <Feather name="message-circle" size={16} color="#D9DFEA" />
                <Text style={[styles.infoText, { flex: 1 }]} numberOfLines={3}>
                  {item.observacao}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    )
  }

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
        <Text style={styles.headerTitleName}>Manutenção</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      {/* Chips / filtros do topo */}
      <View style={styles.filtersWrap}>
        <Text style={styles.groupLabel}>Ordenar por</Text>
        <View style={styles.chipsRow}>
          {renderChip('Filtro 1', true)}
          {renderChip('Filtro 2', false, true)}
          {renderChip('Filtro 3', false, true)}
        </View>

        <Text style={[styles.groupLabel, { marginTop: 10, opacity: 0.5 }]}>
          Mostrar apenas
        </Text>
        <View style={styles.chipsRow}>
          {renderChip('Filtro 2', false, true)}
          {renderChip('Filtro 3', false, true)}
        </View>
      </View>

      {/* Abas */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'concluida' && styles.tabBtnActive]}
          onPress={() => setTab('concluida')}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'concluida' && styles.tabTextActive
            ]}
          >
            CONCLUÍDAS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'orcamento' && styles.tabBtnActive]}
          onPress={() => setTab('orcamento')}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'orcamento' && styles.tabTextActive
            ]}
          >
            ORÇAMENTOS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'gasto' && styles.tabBtnActive]}
          onPress={() => setTab('gasto')}
        >
          <Text
            style={[styles.tabText, tab === 'gasto' && styles.tabTextActive]}
          >
            GASTOS
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={it => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      />
    </View>
  )
}

const BG = '#2C3545'
const CARD = '#1F2741'
const PILL = '#3F4B60'
const TEXT = '#E6ECF5'
const MUTED = '#D9DFEA'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
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

  filtersWrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  groupLabel: { color: TEXT, fontSize: 12, fontWeight: '600', marginBottom: 8 },
  chipsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B475B',
    opacity: 0.85
  },
  chipSelected: { backgroundColor: '#435172', opacity: 1 },
  chipDisabled: { opacity: 0.4 },
  chipText: { color: MUTED, fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: TEXT },
  chipTextDisabled: { color: MUTED },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 10
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#2A3550'
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF'
  },
  tabText: { color: TEXT, fontSize: 12, fontWeight: '800', letterSpacing: 0.4 },
  tabTextActive: { color: '#2C3545' },

  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 8,
    marginBottom: 14
  },
  topPill: {
    backgroundColor: PILL,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  pillTitle: { color: TEXT, fontWeight: '800', fontSize: 15 },
  pillSub: { color: MUTED, fontSize: 12, marginTop: 2, fontWeight: '600' },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8
  },
  infoText: { color: TEXT, fontSize: 14, fontWeight: '600' }
})

