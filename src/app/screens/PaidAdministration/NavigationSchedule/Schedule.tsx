import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons'

type SelectType = 'boat' | 'date' | 'time' | null

const BOATS = ['Tormenta dos Mares II', 'Mar Azul', 'Nauti Star']
const DATES = ['01/03/2023', '02/03/2023', '03/03/2023']
const TIMES = ['09:00', '10:40', '12:00', '14:30']

export default function NavigationPlanScreen() {
  const navigation: any = useNavigation()

  const [selectedBoat, setSelectedBoat] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [adults, setAdults] = useState('')
  const [children, setChildren] = useState('')
  const [navigationPlan, setNavigationPlan] = useState('')

  const [selectModalVisible, setSelectModalVisible] = useState(false)
  const [currentSelectType, setCurrentSelectType] = useState<SelectType>(null)

  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const openSelectModal = (type: SelectType) => {
    setCurrentSelectType(type)
    setSelectModalVisible(true)
  }

  const closeSelectModal = () => {
    setSelectModalVisible(false)
    setCurrentSelectType(null)
  }

  const handleSelectValue = (value: string) => {
    if (currentSelectType === 'boat') setSelectedBoat(value)
    if (currentSelectType === 'date') setSelectedDate(value)
    if (currentSelectType === 'time') setSelectedTime(value)
    closeSelectModal()
  }

  const isFormValid =
    !!selectedBoat &&
    !!selectedDate &&
    !!selectedTime &&
    adults.trim() !== '' &&
    navigationPlan.trim() !== ''

  const handleSchedule = () => {
    if (!isFormValid) return
    setSuccessModalVisible(true)
  }

  const getOptionsForCurrentSelect = () => {
    if (currentSelectType === 'boat') return BOATS
    if (currentSelectType === 'date') return DATES
    if (currentSelectType === 'time') return TIMES
    return []
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Plano de navegação</Text>

        {/* X transparente para manter alinhamento */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.questionTitle}>
            Quando você gostaria de navegar?
          </Text>

          {/* Embarcação */}
          <Text style={styles.fieldLabel}>Embarcação</Text>
          <TouchableOpacity
            style={styles.selectField}
            activeOpacity={0.9}
            onPress={() => openSelectModal('boat')}
          >
            <View style={styles.selectLeft}>
              <FontAwesome5
                name="anchor"
                size={16}
                color="#FFFFFF"
                style={styles.selectIcon}
              />
              <Text
                style={[
                  styles.selectText,
                  !selectedBoat && styles.selectPlaceholder
                ]}
              >
                {selectedBoat || 'Selecione a embarcação'}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Data */}
          <Text style={styles.fieldLabel}>Data</Text>
          <TouchableOpacity
            style={styles.selectField}
            activeOpacity={0.9}
            onPress={() => openSelectModal('date')}
          >
            <View style={styles.selectLeft}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color="#FFFFFF"
                style={styles.selectIcon}
              />
              <Text
                style={[
                  styles.selectText,
                  !selectedDate && styles.selectPlaceholder
                ]}
              >
                {selectedDate || 'Informe a data'}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Horários disponíveis */}
          <Text style={styles.fieldLabel}>Horários disponíveis</Text>
          <TouchableOpacity
            style={styles.selectField}
            activeOpacity={0.9}
            onPress={() => openSelectModal('time')}
          >
            <View style={styles.selectLeft}>
              <Ionicons
                name="time-outline"
                size={18}
                color="#FFFFFF"
                style={styles.selectIcon}
              />
              <Text
                style={[
                  styles.selectText,
                  !selectedTime && styles.selectPlaceholder
                ]}
              >
                {selectedTime || 'Selecione um horário'}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Quantidade de adultos */}
          <Text style={styles.fieldLabel}>Quantidade de adultos</Text>
          <View style={styles.inputField}>
            <TextInput
              value={adults}
              onChangeText={setAdults}
              placeholder="Informe o número de adultos"
              placeholderTextColor="#A6B0C5"
              style={styles.inputText}
              keyboardType="number-pad"
            />
          </View>

          {/* Quantidade de crianças (não obrigatório) */}
          <Text style={styles.fieldLabel}>Quantidade de crianças</Text>
          <View style={styles.inputField}>
            <TextInput
              value={children}
              onChangeText={setChildren}
              placeholder="Informe o número de crianças (-xx anos)"
              placeholderTextColor="#A6B0C5"
              style={styles.inputText}
              keyboardType="number-pad"
            />
          </View>

          {/* Plano de navegação */}
          <Text style={styles.fieldLabel}>Plano de navegação</Text>
          <View style={styles.textArea}>
            <TextInput
              value={navigationPlan}
              onChangeText={setNavigationPlan}
              placeholder="Descreva os lugares que pretende ir e quanto tempo pretende permanecer em cada um."
              placeholderTextColor="#A6B0C5"
              style={styles.textAreaInput}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Bottom bar - AGENDAR */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            disabled={!isFormValid}
            activeOpacity={isFormValid ? 0.9 : 1}
            style={[
              styles.bottomButton,
              !isFormValid && styles.bottomButtonDisabled
            ]}
            onPress={handleSchedule}
          >
            <Text
              style={[
                styles.bottomButtonText,
                !isFormValid && styles.bottomButtonTextDisabled
              ]}
            >
              AGENDAR
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modal de seleção (dropdown) */}
      <Modal
        transparent
        visible={selectModalVisible}
        animationType="fade"
        onRequestClose={closeSelectModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.selectModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {currentSelectType === 'boat' && 'Selecionar embarcação'}
                {currentSelectType === 'date' && 'Selecionar data'}
                {currentSelectType === 'time' && 'Selecionar horário'}
              </Text>
              <TouchableOpacity onPress={closeSelectModal}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {getOptionsForCurrentSelect().map(option => (
              <TouchableOpacity
                key={option}
                style={styles.optionItem}
                onPress={() => handleSelectValue(option)}
                activeOpacity={0.9}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal de sucesso */}
      <Modal
        transparent
        visible={successModalVisible}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Navegação agendada</Text>
              <TouchableOpacity onPress={() => setSuccessModalVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Seu plano de navegação foi agendado com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalPrimaryButton}
              onPress={() => {
                setSuccessModalVisible(false)
                navigation.goBack()
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.modalPrimaryButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const DARK_BG = '#1F2633'
const FIELD_BG = '#3A4A63'
const WHITE = '#FFFFFF'
const ACCENT = '#223A7A'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600'
  },
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  questionTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24
  },
  fieldLabel: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10
  },
  selectField: {
    backgroundColor: FIELD_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  selectIcon: {
    marginRight: 10
  },
  selectText: {
    color: WHITE,
    fontSize: 13,
    flexShrink: 1
  },
  selectPlaceholder: {
    color: '#A6B0C5'
  },
  inputField: {
    backgroundColor: FIELD_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  inputText: {
    color: WHITE,
    fontSize: 13
  },
  textArea: {
    backgroundColor: FIELD_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 150,
    marginTop: 4
  },
  textAreaInput: {
    flex: 1,
    color: WHITE,
    fontSize: 13
  },
  bottomBar: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  bottomButton: {
    alignItems: 'center'
  },
  bottomButtonDisabled: {
    opacity: 0.5
  },
  bottomButtonText: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  bottomButtonTextDisabled: {
    color: '#8A93AC'
  },
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectModalContainer: {
    width: '82%',
    maxHeight: '60%',
    backgroundColor: '#262F4A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  successModalContainer: {
    width: '82%',
    backgroundColor: '#262F4A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 22
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  modalTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700'
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3A4461'
  },
  optionText: {
    color: WHITE,
    fontSize: 14
  },
  modalMessage: {
    color: '#E1E6FF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20
  },
  modalPrimaryButton: {
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE
  },
  modalPrimaryButtonText: {
    color: DARK_BG,
    fontSize: 13,
    fontWeight: '700'
  }
})
