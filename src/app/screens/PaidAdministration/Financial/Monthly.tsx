import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type TabKey = 'ABERTO' | 'PAGAS' | 'ATRASO'

export default function MonthlyScreen() {
  const navigation: any = useNavigation()
  const [activeTab, setActiveTab] = useState<TabKey>('ABERTO')

  const goBack = () => navigation.goBack()

  const mensalidadesAberto = [
    {
      nome: 'Tormenta dos Mares',
      vencimento: '05/02/2023',
      valor: 'R$ 1.500,00',
      status: 'pendente'
    }
  ]

  const mensalidadesPagas = [
    {
      nome: 'Tormenta dos Mares',
      vencimento: '05/12/2022',
      valor: 'R$ 1.500,00',
      status: 'pago'
    },
    {
      nome: 'Tormenta dos Mares II',
      vencimento: '05/11/2022',
      valor: 'R$ 1.500,00',
      status: 'pago'
    }
  ]

  const mensalidadesAtraso = [
    {
      nome: 'Tormenta dos Mares',
      vencimento: '05/01/2023',
      valor: 'R$ 1.500,00',
      status: 'atraso'
    }
  ]

  const renderCard = (item: any) => {
    const statusIcon: {
      name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
      color: string
    } =
      item.status === 'pendente'
        ? { name: 'alert-circle-outline', color: '#F3B23A' }
        : item.status === 'pago'
          ? { name: 'check', color: '#00D26A' }
          : { name: 'close-circle-outline', color: '#FF4E4E' }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <MaterialCommunityIcons
            name={statusIcon.name}
            size={20}
            color={statusIcon.color}
          />
        </View>

        <View style={styles.row}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#FFFFFF"
            style={styles.icon}
          />
          <Text style={styles.label}>Vencimento</Text>
          <Text style={styles.value}>{item.vencimento}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="cash-outline"
            size={18}
            color="#FFFFFF"
            style={styles.icon}
          />
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.value}>{item.valor}</Text>
        </View>
      </View>
    )
  }

  const renderContent = () => {
    if (activeTab === 'ABERTO')
      return mensalidadesAberto.map((m, i) => (
        <View key={i}>{renderCard(m)}</View>
      ))
    if (activeTab === 'PAGAS')
      return mensalidadesPagas.map((m, i) => (
        <View key={i}>{renderCard(m)}</View>
      ))
    return mensalidadesAtraso.map((m, i) => (
      <View key={i}>{renderCard(m)}</View>
    ))
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

        <Text style={styles.headerTitle}>Mensalidades</Text>

        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* ABAS */}
      <View style={styles.tabsContainer}>
        {[
          { key: 'ABERTO', label: 'EM ABERTO' },
          { key: 'PAGAS', label: 'PAGAS' },
          { key: 'ATRASO', label: 'EM ATRASO' }
        ].map((tab: any) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTA */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>
    </View>
  )
}

const DARK_BG = '#1F2633'
const CARD_BG = '#262F4A'
const WHITE = '#FFFFFF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600'
  },

  /* ABAS */
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 20 // <— novo
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4 // <— novo
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: WHITE
  },
  tabText: {
    color: '#A9AFC4',
    fontSize: 13,
    fontWeight: '600'
  },
  tabTextActive: {
    color: WHITE
  },

  /* LISTA */
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40
  },

  /* CARD */
  card: {
    backgroundColor: CARD_BG,
    padding: 16,
    borderRadius: 14,
    marginBottom: 16
  },
  cardHeader: {
    backgroundColor: '#3A4A63',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  cardTitle: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  icon: {
    width: 24,
    marginRight: 8
  },
  label: {
    flex: 1,
    color: '#BFC6D8',
    fontSize: 13
  },
  value: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600'
  }
})

