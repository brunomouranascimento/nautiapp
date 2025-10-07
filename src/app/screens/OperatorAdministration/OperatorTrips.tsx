// MovimentacoesScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

const MovimentacoesScreen = () => {
  const navigation: any = useNavigation()
  const [activeTab, setActiveTab] = useState<'hoje' | 'proximos'>('hoje')
  const [modalVisible, setModalVisible] = useState(false)

  const handleGoDetalhes = () => {
    navigation.navigate('VesselDetails')
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
        <Text style={styles.headerTitleName}>Movimentações do dia</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterActive}>
          <Text style={styles.filterTextActive}>Qtd pessoas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterDisabled}>
          <Text style={styles.filterTextDisabled}>Qtd crianças</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterDisabled}>
          <Text style={styles.filterTextDisabled}>Data de subida</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hoje' && styles.activeTab]}
          onPress={() => setActiveTab('hoje')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'hoje' && styles.activeTabText
            ]}
          >
            HOJE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'proximos' && styles.activeTab]}
          onPress={() => setActiveTab('proximos')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'proximos' && styles.activeTabText
            ]}
          >
            PRÓXIMOS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.statusText}>FILA DE DESCIDA</Text>
            <Text style={styles.statusIcon}>↧</Text>
          </View>

          <TouchableOpacity onPress={handleGoDetalhes}>
            <View style={styles.boatInfo}>
              <Text style={styles.boatTitle}>Tormenta dos Mares</Text>
              <Text style={styles.boatSub}>Yamaha XC 700</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="swap-vertical"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Movimento</Text>
              <Text style={styles.infoValue}>Descida</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Adultos</Text>
              <Text style={styles.infoValue}>8</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="account-child"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Crianças</Text>
              <Text style={styles.infoValue}>2</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Data</Text>
              <Text style={styles.infoValue}>01/02/2023</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Horário</Text>
              <Text style={styles.infoValue}>12:00</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="timer-sand"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Tempo médio de espera</Text>
              <Text style={styles.infoValue}>20 min</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#FFFFFF"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Localizador</Text>
              <Text style={styles.infoValueHighlight}>RT6H87</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnOutlineText}>INFORMAR POSIÇÃO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFilled}>
            <Text style={styles.btnFilledText}>CONCLUIR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Qual a posição da embarcação?</Text>

            <TouchableOpacity style={styles.modalInput}>
              <Text style={styles.modalInputText}>
                Informe a posição da embarcação
              </Text>
            </TouchableOpacity>

            <Text style={styles.modalOu}>ou</Text>

            <TouchableOpacity style={styles.modalBtnOutline}>
              <Text style={styles.modalBtnOutlineText}>ESCANEAR QR CODE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalBtnFilled}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnFilledText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1D2635' },
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
  backArrow: { color: '#fff', fontSize: 20 },
  closeIcon: { color: '#fff', fontSize: 20 },

  filters: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 10 },
  filterActive: {
    backgroundColor: '#2C3E55',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8
  },
  filterDisabled: {
    backgroundColor: '#1D2635',
    borderWidth: 1,
    borderColor: '#3A4A62',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8
  },
  filterTextActive: { color: '#fff' },
  filterTextDisabled: { color: '#6B7B8E' },
  infoList: {
    marginTop: 6
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 3,
    marginVertical: 3
  },
  infoIcon: {
    width: 28,
    textAlign: 'center'
  },
  infoText: {
    color: '#AFC3E2',
    flex: 1,
    marginLeft: 8
  },
  infoValue: {
    color: '#AFC3E2',
    fontWeight: '600'
  },
  infoValueHighlight: {
    color: '#FFFFFF',
    fontWeight: '700'
  },

  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTab: { borderBottomColor: '#fff' },
  tabText: { color: '#6B7B8E', fontWeight: '600' },
  activeTabText: { color: '#fff' },

  cardsContainer: { padding: 16 },
  card: {
    backgroundColor: '#202E4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  statusText: { color: '#AFC3E2', fontWeight: '700', fontSize: 12 },
  statusIcon: { color: '#48FF88', fontSize: 36 },
  boatInfo: {
    backgroundColor: '#2F3E5F',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  boatTitle: { color: '#fff', fontWeight: '600', fontSize: 16 },
  boatSub: { color: '#B0BED1', fontSize: 13 },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  label: { color: '#AFC3E2', fontSize: 14 },
  value: { color: '#fff', fontSize: 14 },
  valueBold: { color: '#fff', fontSize: 14, fontWeight: '700' },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 12
  },
  btnOutlineText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  btnFilled: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 8
  },
  btnFilledText: { color: '#1D2635', textAlign: 'center', fontWeight: '700' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: '#1D2635',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  modalClose: { position: 'absolute', top: 16, right: 16 },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    textAlign: 'center'
  },
  modalInput: {
    backgroundColor: '#2C3E55',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20
  },
  modalInputText: { color: '#AFC3E2', textAlign: 'center' },
  modalOu: { color: '#AFC3E2', textAlign: 'center', marginVertical: 10 },
  modalBtnOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10
  },
  modalBtnOutlineText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },
  modalBtnFilled: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 8
  },
  modalBtnFilledText: {
    color: '#1D2635',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default MovimentacoesScreen

