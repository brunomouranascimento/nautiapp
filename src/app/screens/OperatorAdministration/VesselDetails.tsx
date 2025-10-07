import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const VesselDetails = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
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

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Status</Text>
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>FILA DE DESCIDA</Text>
            <Text style={styles.statusIcon}>↧</Text>
          </View>
        </View>

        {/* Cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Cliente</Text>
          <Text style={styles.sectionValue}>João da Silva</Text>
          <Text style={styles.divider}></Text>
          <Text style={styles.sectionValue}>Matrícula 12345678</Text>
        </View>

        {/* Embarcação */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Embarcação</Text>
          <Text style={styles.sectionValue}>Quebra Vento dos Mares</Text>
          <Text style={styles.sectionValue}>Yamaha XC 700</Text>
          <Text style={styles.sectionValue}>40 pés</Text>
        </View>

        {/* Ocupantes */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ocupantes</Text>
          <Text style={styles.sectionValue}>8 adultos</Text>
          <Text style={styles.sectionValue}>2 crianças</Text>
        </View>

        {/* Movimentação */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Movimentação</Text>
          <Text style={styles.sectionValue}>Data de saída 01/03/2023</Text>
          <Text style={styles.sectionValue}>Hora de saída 12:00</Text>
          <Text style={styles.sectionValue}>Data de chegada 01/03/2023</Text>
          <Text style={styles.sectionValue}>Hora de chegada 17:00</Text>
        </View>

        {/* Navegação */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Navegação</Text>
          <Text style={styles.navText}>
            Saída da marina em direção à praia XX por cerca de 2 horas. Atracar
            para almoço no restaurante marinho XX por 1 hora e meia. Mergulho na
            bacia XX por 1 hora. Retornar à Marina.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1D2635' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 50
  },
  backArrow: { color: '#fff', fontSize: 20 },
  closeIcon: { color: 'transparent', fontSize: 20 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  section: { marginBottom: 20 },
  sectionLabel: { color: '#AFC3E2', fontWeight: '700', marginBottom: 6 },
  sectionValue: { color: '#fff', fontSize: 15, marginBottom: 4 },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#2C3E55',
    marginVertical: 6
  },

  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C3E55',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  statusText: { color: '#AFC3E2', fontWeight: '700', fontSize: 13 },
  statusIcon: { color: '#48FF88', fontSize: 36 },

  navText: {
    color: '#AFC3E2',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  }
})

export default VesselDetails

