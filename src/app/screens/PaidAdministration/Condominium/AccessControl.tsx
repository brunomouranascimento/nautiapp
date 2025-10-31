import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  useNavigation,
  useRoute,
  useFocusEffect
} from '@react-navigation/native'

type AccessListItem = {
  id: string
  name: string
  date: string // dd/MM/yy
  plate: string
}

type AccessFormRecord = {
  id?: string
  name: string
  cpf: string
  brand: string
  model: string
  plate: string
  visitDate: string // dd/MM/yyyy ou dd/MM/yy
  stayTime: string
}

export default function AccessControlScreen() {
  const navigation: any = useNavigation()
  const route: any = useRoute()

  const [items, setItems] = useState<AccessListItem[]>([
    { id: '1', name: 'Renato Augusto', date: '28/02/23', plate: 'IZU3954' },
    { id: '2', name: 'Joana da Silva', date: '17/02/23', plate: 'IZU3954' }
  ])

  const handleGoBack = () => navigation.goBack()

  const handleOpenAccess = (item: AccessListItem) => {
    const access: AccessFormRecord = {
      id: item.id,
      name: item.name,
      cpf: '',
      brand: '',
      model: '',
      plate: item.plate,
      visitDate: item.date,
      stayTime: ''
    }
    navigation.navigate('AccessForm', { access })
  }

  const handleRequestAccess = () => {
    navigation.navigate('AccessForm') // novo acesso
  }

  // Recebe { saved } ou { canceledId } ao voltar do formulário
  useFocusEffect(
    useCallback(() => {
      const params = route?.params || {}
      const saved: AccessFormRecord | undefined = params.saved
      const canceledId: string | undefined = params.canceledId

      if (saved) {
        setItems(prev => {
          // normaliza data vinda do form
          const normalizedDate = saved.visitDate
          const id = saved.id || String(Date.now())
          const asListItem: AccessListItem = {
            id,
            name: saved.name,
            date: normalizedDate,
            plate: saved.plate
          }

          const exists = prev.some(p => p.id === id)
          return exists
            ? prev.map(p => (p.id === id ? asListItem : p))
            : [asListItem, ...prev]
        })
      }

      if (canceledId) {
        setItems(prev => prev.filter(p => p.id !== canceledId))
      }

      // limpa os params para não reprocessar
      if (saved || canceledId) {
        navigation.setParams({ saved: undefined, canceledId: undefined })
      }
    }, [route?.params, navigation])
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Controle de acesso</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Acessos autorizados</Text>
        </View>

        <View style={styles.list}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => handleOpenAccess(item)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.plate}>{item.plate}</Text>
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botão fixo */}
      <TouchableOpacity
        style={styles.requestButton}
        onPress={handleRequestAccess}
      >
        <Text style={styles.requestText}>SOLICITAR ACESSO</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  name: { flex: 1, color: '#fff', fontSize: 14 },
  date: { width: 80, color: '#fff', textAlign: 'center' },
  plate: { width: 80, color: '#fff', textAlign: 'center' },
  requestButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    alignItems: 'center'
  },
  requestText: { color: '#001A70', fontWeight: '700', letterSpacing: 1 }
})

