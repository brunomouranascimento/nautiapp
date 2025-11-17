import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const PRICE_PER_LITER = 6.98

const fuelHistory = [
  {
    id: '1',
    name: 'Tormenta do Mar II',
    date: '28/02/23',
    liters: 30,
    value: '322,00'
  },
  {
    id: '2',
    name: 'Tormenta do Mar I',
    date: '17/02/23',
    liters: 15,
    value: '118,00'
  },
  {
    id: '3',
    name: 'Tormenta do Mar II',
    date: '28/02/23',
    liters: 30,
    value: '322,00'
  },
  {
    id: '4',
    name: 'Tormenta do Mar I',
    date: '17/02/23',
    liters: 15,
    value: '118,00'
  }
]

export default function FuelScreen() {
  const navigation: any = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const handleStartFueling = (mode: 'now' | 'after') => {
    navigation.navigate('FuelDetails', { mode })
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Abastecimento</Text>

        <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.locationWrapper}>
          <Text style={styles.locationText}>Porto Alegre, RS</Text>
          <Text style={styles.locationText}>01/03/2023</Text>
        </View>

        <Text style={styles.priceText}>
          R$ {PRICE_PER_LITER.toFixed(2).replace('.', ',')}/litro
        </Text>

        {/* BOTÕES PRINCIPAIS */}
        <TouchableOpacity
          style={[styles.primaryButton, styles.primaryButtonFilled]}
          onPress={() => handleStartFueling('now')}
        >
          <Text style={styles.primaryButtonText}>ABASTECER AGORA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, styles.primaryButtonOutline]}
          onPress={() => handleStartFueling('after')}
        >
          <Text style={styles.secondaryButtonText}>ABASTECER APÓS O USO</Text>
        </TouchableOpacity>

        {/* HISTÓRICO */}
        <View style={styles.historyHeaderWrapper}>
          <Text style={styles.historyHeaderText}>
            HISTÓRICO DE ABASTECIMENTOS
          </Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>
            Abastecimento
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}
          >
            Data
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}
          >
            Litros
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}
          >
            R$
          </Text>
        </View>

        {fuelHistory.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlternate
            ]}
          >
            <Text style={[styles.tableCellText, { flex: 2 }]}>{item.name}</Text>
            <Text
              style={[styles.tableCellText, { flex: 1, textAlign: 'center' }]}
            >
              {item.date}
            </Text>
            <Text
              style={[styles.tableCellText, { flex: 1, textAlign: 'center' }]}
            >
              {item.liters}
            </Text>
            <Text
              style={[styles.tableCellText, { flex: 1, textAlign: 'right' }]}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202737'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: 'space-between'
  },
  iconButton: {
    padding: 8
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32
  },
  locationWrapper: {
    marginTop: 8,
    alignItems: 'center'
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  priceText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700'
  },
  primaryButton: {
    marginTop: 24,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryButtonFilled: {
    backgroundColor: '#FFFFFF'
  },
  primaryButtonOutline: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent'
  },
  primaryButtonText: {
    color: '#1E2340',
    fontWeight: '700',
    fontSize: 14
  },
  secondaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14
  },
  historyHeaderWrapper: {
    marginTop: 32,
    marginBottom: 12,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  historyHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2340'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    paddingBottom: 8
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  tableRowAlternate: {
    backgroundColor: '#1E2340'
  },
  tableCellText: {
    color: '#FFFFFF',
    fontSize: 12
  }
})

