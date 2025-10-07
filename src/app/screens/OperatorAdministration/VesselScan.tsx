import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

export default function VesselScan() {
  const navigation: any = useNavigation()
  const route = useRoute<RouteProp<Record<string, any>, string>>()
  const { id, nome, proprietario, status } = route.params || {}

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Embarcação',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#0A0A0A'
    })
  }, [navigation])

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quebra Vento dos Mares</Text>
        <TouchableOpacity>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={s.card}>
        <View style={s.row}>
          <Feather name="hash" color="#C8D0DB" size={16} />
          <Text style={s.label}>Código</Text>
          <Text style={s.value}>{id}</Text>
        </View>
        <View style={s.row}>
          <Feather name="anchor" color="#C8D0DB" size={16} />
          <Text style={s.label}>Modelo</Text>
          <Text style={s.value}>{nome}</Text>
        </View>
        <View style={s.row}>
          <Feather name="user" color="#C8D0DB" size={16} />
          <Text style={s.label}>Proprietário</Text>
          <Text style={s.value}>{proprietario}</Text>
        </View>
        <View style={s.row}>
          <Feather name="activity" color="#C8D0DB" size={16} />
          <Text style={s.label}>Status</Text>
          <Text style={s.value}>{status}</Text>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545', padding: 16 },
  card: { backgroundColor: '#3D4B64', borderRadius: 10, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  label: { marginLeft: 6, color: '#C8D0DB', fontSize: 14, flex: 1 },
  value: { color: '#fff', fontSize: 14, fontWeight: '600' }
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

