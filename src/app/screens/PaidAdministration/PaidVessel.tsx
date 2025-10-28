import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Embarcacao = {
  id: string
  nome: string
  modeloAno: string
  horas: number
  local: string
  foto: any
}

const DATA: Embarcacao[] = [
  {
    id: '1',
    nome: 'Tormenta dos Mares',
    modeloAno: 'Yamaha XZ700 2010',
    horas: 120,
    local: 'Galpão 1 - A23 AZUL',
    foto: {
      uri: 'https://images.unsplash.com/photo-1500367215255-0e0b25b396af?q=80&w=300'
    }
  }
]

export default function PaidVessel() {
  const navigation: any = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Embarcações',
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

  const renderChip = (
    label: string,
    selected?: boolean,
    disabled?: boolean,
    id?: string
  ) => (
    <View
      key={id}
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

  const openDetalhe = (item: Embarcacao) => {
    navigation.navigate('ClientVessel', { id: item.id })
  }

  const renderItem = ({ item }: { item: Embarcacao }) => (
    <View style={styles.card}>
      {/* Pílula superior dentro do card */}
      <TouchableOpacity
        style={styles.topPill}
        activeOpacity={0.9}
        onPress={() => openDetalhe(item)}
      >
        <View style={styles.rowAlign}>
          <Image source={item.foto} style={styles.thumb} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.subtitle}>{item.modeloAno}</Text>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color="#D9DFEA" />
      </TouchableOpacity>

      {/* Linhas de informação */}
      <View style={styles.infoRow}>
        <Feather name="clock" size={16} color="#D9DFEA" />
        <Text style={styles.infoText}>{item.horas}h</Text>
      </View>
      <View style={styles.infoRow}>
        <Feather name="map-pin" size={16} color="#D9DFEA" />
        <Text style={styles.infoText}>{item.local}</Text>
      </View>
    </View>
  )

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
        <Text style={styles.headerTitleName}>Embarcação</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      {/* Filtros / Ordenação */}
      <View style={styles.filtersWrap}>
        <Text style={styles.groupLabel}>Ordenar por</Text>
        <View style={styles.chipsRow}>
          {renderChip('Ano', true)}
          {renderChip('Horas navegadas', false, true)}
          {renderChip('…', false, true)}
          {renderChip('…', false, true)}
        </View>

        <Text style={[styles.groupLabel, { marginTop: 10, opacity: 0.5 }]}>
          Mostrar apenas
        </Text>
        <View style={styles.chipsRow}>
          {renderChip('Ano', false, true)}
          {renderChip('Horas navegadas', false, true)}
          {renderChip('…', false, true)}
        </View>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={it => it.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={renderItem}
      />
    </View>
  )
}

const BG = '#2C3545'
const CARD = '#253049'
const PILL = '#36436A'
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
  filtersWrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
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
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 12,
    marginTop: 4
  },
  topPill: {
    backgroundColor: PILL,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  rowAlign: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A5878'
  },
  title: { color: TEXT, fontSize: 15, fontWeight: '800' },
  subtitle: { color: MUTED, fontSize: 12, marginTop: 2, fontWeight: '600' },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6
  },
  infoText: { color: TEXT, fontSize: 14, fontWeight: '600' }
})

