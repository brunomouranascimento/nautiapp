import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function Trips() {
  const [ordenarPor, setOrdenarPor] = useState<'pessoas' | 'subida'>('pessoas')
  const [ativo, setAtivo] = useState('Hoje')
  const navigation = useNavigation()

  const renderMostrarApenas = () => {
    if (ordenarPor === 'pessoas') {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.disabledButton}>
            <Text style={styles.disabledText}>Qtd crianças</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.disabledButton}>
            <Text style={styles.disabledText}>Data de subida</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (ordenarPor === 'subida') {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.disabledButton}>
            <Text style={styles.disabledText}>Descida</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.disabledButton}>
            <Text style={styles.disabledText}>Ocupantes crianças</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

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
        <Text style={styles.headerTitleName}>Movimentações</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Filtros */}
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Text style={styles.label}>Ordenar por</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              ordenarPor === 'pessoas' && styles.filterActive
            ]}
            onPress={() => setOrdenarPor('pessoas')}
          >
            <Text
              style={[
                styles.filterText,
                ordenarPor === 'pessoas' && styles.filterTextActive
              ]}
            >
              Qtd pessoas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              ordenarPor === 'subida' && styles.filterActive
            ]}
            onPress={() => setOrdenarPor('subida')}
          >
            <Text
              style={[
                styles.filterText,
                ordenarPor === 'subida' && styles.filterTextActive
              ]}
            >
              Subida
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 8 }]}>Mostrar apenas</Text>
        {renderMostrarApenas()}

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, ativo === 'Hoje' && styles.tabActive]}
            onPress={() => setAtivo('Hoje')}
          >
            <Text
              style={[styles.tabText, ativo === 'Hoje' && styles.tabTextActive]}
            >
              HOJE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, ativo === 'Semana' && styles.tabActive]}
            onPress={() => setAtivo('Semana')}
          >
            <Text
              style={[
                styles.tabText,
                ativo === 'Semana' && styles.tabTextActive
              ]}
            >
              NA SEMANA
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card com métricas */}
        <View style={styles.card}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.cardText}>Total de movimentações</Text>
            <Text style={styles.cardText}>30</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.cardText}>Tempo médio de navegação</Text>
            <Text style={styles.cardText}>100 h</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.cardText}>Tempo médio de fila</Text>
            <Text style={styles.cardText}>12 min</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.cardText}>Navegando</Text>
            <Text style={styles.cardText}>15 barcos</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.cardText}>Vidas</Text>
            <Text style={styles.cardText}>50</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.cardText}>Menores</Text>
            <Text style={styles.cardText}>3</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3545'
  },
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
  back: { fontSize: 18, color: '#000' },
  title: { fontSize: 16, fontWeight: '600', color: '#000' },
  close: { fontSize: 18, color: '#000' },
  label: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 6,
    marginTop: 12
  },
  row: { flexDirection: 'row', gap: 8 },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555'
  },
  filterActive: {
    backgroundColor: '#4055D7',
    borderColor: '#4055D7'
  },
  filterText: { color: '#aaa', fontSize: 13 },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  disabledButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555',
    opacity: 0.5
  },
  disabledText: { color: '#aaa', fontSize: 13 },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#999'
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff'
  },
  tabText: { color: '#aaa', fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#3C4B63',
    padding: 16,
    borderRadius: 12,
    marginTop: 16
  },
  cardText: { color: '#fff', fontSize: 14, marginBottom: 6 }
})

