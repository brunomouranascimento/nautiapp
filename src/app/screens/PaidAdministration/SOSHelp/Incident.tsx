import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function SosIncidentScreen() {
  const navigation: any = useNavigation()

  const [category, setCategory] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const categories = [
    'Falha mecânica',
    'Problema elétrico',
    'Colisão',
    'Navegação perigosa',
    'Clima adverso',
    'Outro'
  ]

  const goBack = () => {
    navigation.goBack()
  }

  const handleSubmit = () => {
    setConfirmVisible(false)
    setSuccessVisible(true)
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Reportar incidente</Text>

        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* Tipo de incidente */}
        <Text style={styles.label}>Tipo de incidente</Text>

        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.9}
          onPress={() => setIsDropdownOpen(prev => !prev)}
        >
          <Text style={styles.dropdownText}>
            {category ?? 'Selecione uma opção'}
          </Text>

          <Ionicons
            name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Category options */}
        {isDropdownOpen && (
          <View style={styles.dropdownOverlay}>
            <TouchableOpacity
              style={styles.overlayBackground}
              activeOpacity={1}
              onPress={() => setIsDropdownOpen(false)}
            />

            <View style={styles.dropdownFloating}>
              {categories.map(c => (
                <TouchableOpacity
                  key={c}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCategory(c)
                    setIsDropdownOpen(false)
                  }}
                >
                  <Text style={styles.dropdownItemText}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Nome da embarcação */}
        <Text style={[styles.label, { marginTop: 24 }]}>
          Nome da embarcação
        </Text>
        <TextInput
          style={styles.textField}
          placeholder="Informe o nome da embarcação envolvida"
          placeholderTextColor="#A6B0C5"
        />

        {/* Detalhamento */}
        <Text style={[styles.label, { marginTop: 24 }]}>Detalhamento</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Descreva em detalhes o que aconteceu."
          placeholderTextColor="#A6B0C5"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Attach placeholder */}
        <TouchableOpacity style={styles.attachButton} activeOpacity={0.8}>
          <Feather
            name="camera"
            size={20}
            color="#1F2633"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.attachButtonText}>Adicionar foto</Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!category || !description.trim()) && { opacity: 0.5 }
          ]}
          disabled={!category || !description.trim()}
          onPress={() => setConfirmVisible(true)}
        >
          <Text style={styles.submitText}>REPORTAR ACIDENTE</Text>
        </TouchableOpacity>
      </View>

      {/* CONFIRM MODAL */}
      <Modal
        transparent
        visible={confirmVisible}
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enviar incidente</Text>
              <TouchableOpacity onPress={() => setConfirmVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Confirmar envio do incidente para sua marina?
            </Text>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalOutlineButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.modalPrimaryButtonText}>CONFIRMAR ENVIO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setConfirmVisible(false)}
            >
              <Text style={styles.modalSecondaryButtonText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal
        transparent
        visible={successVisible}
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Incidente enviado</Text>
              <TouchableOpacity onPress={() => setSuccessVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Seu incidente foi registrado com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setSuccessVisible(false)}
            >
              <Text style={styles.modalSecondaryButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const DARK_BG = '#1F2633'
const CARD_BG = '#262F4A'
const WHITE = '#FFFFFF'

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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16
  },
  label: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8
  },
  dropdown: {
    backgroundColor: '#3A4A63',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdownText: {
    color: WHITE,
    fontSize: 14
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    zIndex: 999
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  dropdownFloating: {
    marginTop: 210,
    marginHorizontal: 20,
    backgroundColor: '#2E3758',
    borderRadius: 14,
    paddingVertical: 6,
    zIndex: 1000
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  dropdownItemText: {
    color: WHITE,
    fontSize: 14
  },
  textField: {
    backgroundColor: '#3A4A63',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: WHITE,
    marginBottom: 16
  },
  textArea: {
    backgroundColor: '#3A4A63',
    borderRadius: 14,
    padding: 12,
    height: 160,
    color: WHITE,
    marginBottom: 16,
    textAlignVertical: 'top'
  },
  input: {
    backgroundColor: '#3A4A63',
    borderRadius: 14,
    padding: 12,
    height: 160,
    color: WHITE,
    marginBottom: 16,
    textAlignVertical: 'top'
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B7D7FF',
    paddingVertical: 12,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignSelf: 'center'
  },
  attachButtonText: {
    color: '#1F2633',
    fontSize: 14,
    fontWeight: '700'
  },
  submitButton: {
    backgroundColor: WHITE,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center'
  },
  submitText: {
    color: DARK_BG,
    fontSize: 15,
    fontWeight: '700'
  },

  // MODALS
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    width: '82%',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 20
  },
  successContainer: {
    width: '82%',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  modalTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700'
  },
  modalMessage: {
    color: '#E1E6FF',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20
  },
  modalPrimaryButton: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  modalOutlineButton: {
    borderWidth: 1,
    borderColor: WHITE
  },
  modalPrimaryButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700'
  },
  modalSecondaryButton: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE
  },
  modalSecondaryButtonText: {
    color: DARK_BG,
    fontSize: 14,
    fontWeight: '700'
  }
})

