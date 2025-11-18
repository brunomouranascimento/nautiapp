// BistroHomeScreen.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const mockOrders = [
  { id: '0123', date: '28/02/23', hour: '12:16', status: 'ok' },
  { id: '0123', date: '28/02/23', hour: '12:16', status: 'warning' }
]

export default function BistroHomeScreen() {
  const navigation: any = useNavigation()

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bistrô e restaurante</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      {/* BOTÕES */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        <TouchableOpacity
          style={[styles.btn, styles.btnFilled]}
          onPress={() => navigation.navigate('OrderByTable')}
        >
          <Text style={styles.btnText}>PEDIR AGORA (MESA)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnOutline]}
          onPress={() => navigation.navigate('OrderByVessel')}
        >
          <Text style={styles.btnSecondaryText}>DELIVERY EMBARCAÇÃO</Text>
        </TouchableOpacity>

        {/* TITULO HISTÓRICO */}
        <View style={styles.historyTitleWrap}>
          <Text style={styles.historyTitle}>ACOMPANHE SEUS PEDIDOS</Text>
        </View>

        {/* TABELA */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Pedido</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Data</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Hora</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Status</Text>
        </View>

        {mockOrders.map((item, index) => (
          <View
            key={index}
            style={[styles.tableRow, index % 2 !== 0 && styles.tableRowAlt]}
          >
            <Text style={[styles.tableText, { flex: 1 }]}>{item.id}</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>{item.date}</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>{item.hour}</Text>

            <View style={{ flex: 1, alignItems: 'center' }}>
              {item.status === 'ok' && (
                <Feather name="check-circle" size={20} color="#3BD671" />
              )}
              {item.status === 'warning' && (
                <Feather name="alert-circle" size={20} color="#FFCC33" />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#202737' },

  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'
  },

  btn: {
    marginTop: 24,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center'
  },

  btnFilled: {
    backgroundColor: '#FFF'
  },

  btnOutline: {
    borderWidth: 1,
    borderColor: 'white'
  },

  btnText: {
    color: '#1E2340',
    fontWeight: '700',
    fontSize: 14
  },
  btnSecondaryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14
  },

  historyTitleWrap: {
    marginTop: 32,
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6
  },

  historyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2340'
  },

  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    paddingBottom: 10
  },

  tableHeaderText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12
  },

  tableRowAlt: {
    backgroundColor: '#1E2340'
  },

  tableText: {
    color: '#FFF',
    fontSize: 12
  }
})

