// ChooseTableScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const LOCALS = ['Salão interno', 'Deck', 'Área externa']
const TABLE_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08']

type PickerType = 'local' | 'table' | null

export default function OrderByTableScreen() {
  const navigation: any = useNavigation()

  const [selectedLocal, setSelectedLocal] = useState<string | null>(null)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const [pickerVisible, setPickerVisible] = useState(false)
  const [pickerType, setPickerType] = useState<PickerType>(null)

  const openPicker = (type: PickerType) => {
    setPickerType(type)
    setPickerVisible(true)
  }

  const handleSelectItem = (item: string) => {
    if (pickerType === 'local') setSelectedLocal(item)
    if (pickerType === 'table') setSelectedTable(item)
    setPickerVisible(false)
  }

  const canAdvance = !!selectedLocal && !!selectedTable

  const handleAdvance = () => {
    if (!canAdvance) return

    navigation.navigate('SelectProducts', {
      orderType: 'table',
      local: selectedLocal,
      tableNumber: selectedTable
    })
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Fazer pedido</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.questionText}>
          Em qual mesa você está no momento?
        </Text>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.fieldLabel}>Local</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => openPicker('local')}
          >
            <Text style={styles.dropdownText}>
              {selectedLocal || 'Selecione o local'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.fieldLabel}>Número da mesa</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => openPicker('table')}
          >
            <Text style={styles.dropdownText}>
              {selectedTable || 'Selecione o número da mesa'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTÃO AVANÇAR */}
      <TouchableOpacity
        style={[styles.bottomButton, !canAdvance && { opacity: 0.5 }]}
        onPress={handleAdvance}
        activeOpacity={canAdvance ? 0.8 : 1}
      >
        <Text style={styles.bottomButtonText}>AVANÇAR</Text>
      </TouchableOpacity>

      {/* MODAL PICKER SIMPLES */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {pickerType === 'local'
                  ? 'Selecione o local'
                  : 'Selecione a mesa'}
              </Text>
              <TouchableOpacity onPress={() => setPickerVisible(false)}>
                <Ionicons name="close" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={pickerType === 'local' ? LOCALS : TABLE_NUMBERS}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectItem(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202737'
  },
  header: {
    paddingTop: 50,
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700'
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#30384A',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  bottomButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    paddingVertical: 14,
    alignItems: 'center'
  },
  bottomButtonText: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  },
  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000077',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#202737',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF22'
  },
  modalItemText: {
    color: '#FFFFFF',
    fontSize: 14
  }
})

