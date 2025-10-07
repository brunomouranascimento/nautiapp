import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const MOCK = [
  { id: 'n1', titulo: 'Manutenção agendada', data: '01/03/2023', lida: false },
  { id: 'n2', titulo: 'Documento atualizado', data: '27/02/2023', lida: true }
]

export default function OperatorNotifications() {
  const navigation: any = useNavigation()

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <TouchableOpacity>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[s.card, item.lida && { opacity: 0.7 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="bell" size={16} color="#C8D0DB" />
              <Text style={s.title}>{item.titulo}</Text>
              <Text style={s.date}>{item.data}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
  card: {
    backgroundColor: '#3D4B64',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    marginHorizontal: 16
  },
  title: { color: '#fff', fontWeight: '700', marginLeft: 8, flex: 1 },
  date: { color: '#C8D0DB', fontWeight: '600' }
})

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 50
  },
  backArrow: { color: '#fff', fontSize: 20 },
  closeIcon: { color: 'transparent', fontSize: 20 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' }
})

