import React, { useCallback, useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  useNavigation,
  useRoute,
  useFocusEffect
} from '@react-navigation/native'

type Status = 'success' | 'pending'

type MaintenanceItem = {
  id: string
  report: string
  date: Date // NEW: manter como Date internamente
  status: Status
}

type MaintenanceFormData = {
  id?: string
  report: string
  observation: string
  date: Date | string
  status: Status
}

const PENDING_TO_SUCCESS_DAYS = 3 // ⏱️ regra de negócio

export default function MaintenanceScreen() {
  const navigation: any = useNavigation()
  const route: any = useRoute()

  const [items, setItems] = useState<MaintenanceItem[]>([
    {
      id: '1',
      report: 'Manutenção elétrica',
      date: toDate('28/02/23'),
      status: 'success'
    },
    {
      id: '2',
      report: 'Manutenção hidráulica',
      date: toDate('28/02/23'),
      status: 'pending'
    }
  ])

  const handleGoBack = () => navigation.goBack()

  const handleOpenMaintenance = (item: MaintenanceItem) => {
    const maintenance: MaintenanceFormData = {
      id: item.id,
      report: item.report,
      observation: 'Observação exemplo...',
      date: item.date,
      status: item.status
    }
    navigation.navigate('MaintenanceForm', { maintenance })
  }

  const handleNewMaintenance = () => navigation.navigate('MaintenanceForm')

  // Avança status de pending -> success após N dias
  const autoAdvanceStatuses = useCallback((list: MaintenanceItem[]) => {
    const now = new Date()
    return list.map(it => {
      if (it.status === 'success') return it
      const diffDays = daysBetween(it.date, now)
      if (diffDays >= PENDING_TO_SUCCESS_DAYS) {
        return { ...it, status: 'success' as Status }
      }
      return it
    })
  }, [])

  // Recebe { saved } ou { canceledId } ao voltar do form + auto-avanço
  useFocusEffect(
    useCallback(() => {
      const { saved, canceledId } = route.params || {}

      setItems(prev => {
        let next = [...prev]

        if (saved) {
          const id = saved.id || String(Date.now())
          const asItem: MaintenanceItem = {
            id,
            report: saved.report,
            date:
              typeof saved.date === 'string' ? toDate(saved.date) : saved.date,
            status: saved.status
          }
          const exists = next.some(p => p.id === id)
          next = exists
            ? next.map(p => (p.id === id ? asItem : p))
            : [asItem, ...next]
        }

        if (canceledId) {
          next = next.filter(p => p.id !== canceledId)
        }

        // aplica avanço automático sempre que a tela ganha foco
        next = autoAdvanceStatuses(next)
        return next
      })

      if (saved || canceledId) {
        navigation.setParams({ saved: undefined, canceledId: undefined })
      }
    }, [route.params, autoAdvanceStatuses, navigation])
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Manutenção</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>histórico de manutenções</Text>
        </View>

        <View style={styles.list}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => handleOpenMaintenance(item)}
            >
              <Text style={styles.report}>{item.report}</Text>
              <Text style={styles.date}>{formatDDMMYY(item.date)}</Text>
              <MaterialCommunityIcons
                name={
                  item.status === 'success'
                    ? 'check-circle-outline'
                    : 'alert-circle-outline'
                }
                color={item.status === 'success' ? '#3DD598' : '#F6C343'}
                size={20}
              />
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.requestButton}
        onPress={handleNewMaintenance}
      >
        <Text style={styles.requestText}>SOLICITAR MANUTENÇÃO</Text>
      </TouchableOpacity>
    </View>
  )
}

/* ==== utils (no mesmo arquivo ou extraído para helpers) ==== */
function toDate(input: string | Date): Date {
  if (input instanceof Date) return input
  // aceita dd/MM/yy ou dd/MM/yyyy
  const [dd, mm, yy] = input.split('/')
  const year = yy.length === 2 ? Number('20' + yy) : Number(yy)
  return new Date(year, Number(mm) - 1, Number(dd))
}

function formatDDMMYY(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${dd}/${mm}/${yy}`
}

function daysBetween(a: Date, b: Date) {
  const ms = Math.abs(
    new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() -
      new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  )
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

/* ==== styles ==== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 20 },
  tab: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 8
  },
  tabText: { color: '#1A1A1A', fontWeight: '600' },
  list: { marginTop: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2738',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8
  },
  report: { flex: 1, color: '#fff', fontSize: 14 },
  date: { width: 80, color: '#fff', textAlign: 'center' },
  requestButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    alignItems: 'center'
  },
  requestText: {
    color: '#001A70',
    fontWeight: '700',
    letterSpacing: 1
  }
})

