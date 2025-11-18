import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type FilterKey = 'DATA' | 'LITROS' | 'VALOR' | 'OPERADOR'

type FuelHistoryItem = {
  id: string
  boat: string
  date: string
  liters: number
  value: string
  operator?: string
}

const MOCK_DATA: FuelHistoryItem[] = [
  {
    id: '1',
    boat: 'Tormenta do Mar II',
    date: '28/02/23',
    liters: 30,
    value: '322,00'
  },
  {
    id: '2',
    boat: 'Tormenta do Mar II',
    date: '28/02/23',
    liters: 30,
    value: '322,00'
  },
  {
    id: '3',
    boat: 'Tormenta do Mar II',
    date: '28/02/23',
    liters: 30,
    value: '322,00'
  },
  {
    id: '4',
    boat: 'Tormenta do Mar II',
    date: '28/02/23',
    liters: 30,
    value: '322,00'
  }
]

export default function PaidFuelScreen() {
  const navigation: any = useNavigation()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('DATA')

  const goBack = () => navigation.goBack()

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'DATA', label: 'Data' },
    { key: 'LITROS', label: 'Litros' },
    { key: 'VALOR', label: 'Valor' },
    { key: 'OPERADOR', label: 'Operador' }
  ]

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

        <Text style={styles.headerTitle}>Abastecimentos</Text>

        {/* X transparente */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* FILTROS */}
        <Text style={styles.filterTitle}>Filtrar por</Text>
        <View style={styles.filtersRow}>
          {filters.map(filter => {
            const isActive = activeFilter === filter.key
            return (
              <TouchableOpacity
                key={filter.key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter.key)}
                activeOpacity={0.9}
              >
                {isActive && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#FFFFFF"
                    style={{ marginRight: 4 }}
                  />
                )}
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* TÍTULO HISTÓRICO */}
        <View style={styles.historyTitleWrapper}>
          <Text style={styles.historyTitleText}>
            histórico de abastecimentos
          </Text>
        </View>

        {/* CABEÇALHO TABELA */}
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.headerCell, styles.colBoat]}>Abastecimento</Text>
          <Text style={[styles.headerCell, styles.colDate]}>Data</Text>
          <Text style={[styles.headerCell, styles.colLiters]}>Litros</Text>
          <Text style={[styles.headerCell, styles.colValue]}>R$</Text>
        </View>

        {/* LINHAS */}
        {MOCK_DATA.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlternate
            ]}
          >
            <Text
              style={[styles.rowCellText, styles.colBoat]}
              numberOfLines={1}
            >
              {item.boat}
            </Text>
            <Text style={[styles.rowCellText, styles.colDate]}>
              {item.date}
            </Text>
            <Text style={[styles.rowCellText, styles.colLiters]}>
              {item.liters}
            </Text>
            <Text style={[styles.rowCellText, styles.colValue]}>
              {item.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const DARK_BG = '#1F2633'
const TABLE_ROW_BG = '#262F4A'
const TABLE_ROW_ALT_BG = '#202845'
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
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },

  /* FILTROS */
  filterTitle: {
    color: WHITE,
    fontSize: 13,
    marginBottom: 8
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  filterChip: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3A4155',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterChipActive: {
    backgroundColor: '#425075',
    borderColor: '#425075'
  },
  filterChipText: {
    color: '#AEB6CE',
    fontSize: 13
  },
  filterChipTextActive: {
    color: WHITE,
    fontWeight: '600'
  },

  /* HISTÓRICO TITLE */
  historyTitleWrapper: {
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 10
  },
  historyTitleText: {
    color: '#1F2633',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'lowercase'
  },

  /* TABELA */
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginBottom: 4
  },
  headerCell: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700'
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TABLE_ROW_BG,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 2
  },
  tableRowAlternate: {
    backgroundColor: TABLE_ROW_ALT_BG
  },
  rowCellText: {
    color: WHITE,
    fontSize: 12
  },

  /* COLUNAS */
  colBoat: {
    flex: 2
  },
  colDate: {
    flex: 1,
    textAlign: 'center'
  },
  colLiters: {
    flex: 0.7,
    textAlign: 'center'
  },
  colValue: {
    flex: 0.8,
    textAlign: 'right'
  }
})

