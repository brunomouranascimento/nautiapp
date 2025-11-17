import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

const PRICE_PER_LITER = 6.98

export default function FuelDetailsScreen() {
  const navigation: any = useNavigation()
  const route: any = useRoute()
  const mode: 'now' | 'after' = route.params?.mode ?? 'now'

  const [usageHours, setUsageHours] = useState('')

  const [liters, setLiters] = useState('')
  const [showLitersModal, setShowLitersModal] = useState(false)

  const [showTerms, setShowTerms] = useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [isCompletingTank, setIsCompletingTank] = useState(false)

  const litersNumber = Number(liters.replace(',', '.')) || 0
  const totalValue = litersNumber * PRICE_PER_LITER

  const handleGoBack = () => {
    if (showTerms) {
      setShowTerms(false)
      return
    }
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const handleOpenLitersModal = () => {
    setShowLitersModal(true)
  }

  const handleConfirmLiters = () => {
    if (!liters && !isCompletingTank) return
    setShowLitersModal(false)
    setShowTerms(true)
  }

  const handleCompleteTank = () => {
    // mock: completar tanque com 30L
    setIsCompletingTank(true)
    setLiters('30')
    setShowLitersModal(false)
    setShowTerms(true)
  }

  const handleAgreeTerms = () => {
    setShowLoadingModal(true)

    setTimeout(() => {
      setShowLoadingModal(false)
      setShowSuccessModal(true)
    }, 5000)
  }

  const handleFinishFueling = () => {
    setShowSuccessModal(false)
    setShowTerms(false)
    setShowLitersModal(false)
    setIsCompletingTank(false)
    setUsageHours('')
    setLiters('')

    // volta para a tela inicial de serviços
    navigation.goBack() // ajuste o nome da rota se for diferente
  }

  const renderHeader = (title: string) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
        <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
        <Ionicons name="close" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )

  // ========= TELA DE TERMOS =========
  if (showTerms) {
    return (
      <View style={styles.container}>
        {renderHeader('Abastecer')}

        <ScrollView contentContainerStyle={styles.termsContent}>
          <Text style={styles.termsTitle}>
            Leia atentamente os termos de uso. Em caso de dúvidas entre em
            contato com o suporte.
          </Text>

          <Text style={styles.termsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            sit amet mollis odio. Integer volutpat odio at vulputate porttitor.
            Proin porta nibh sed libero condimentum, vitae pretium quam rutrum.
            Donec varius, urna eget gravida pharetra, libero velit lacinia
            nulla, non ultrices turpis magna non est.
          </Text>

          <Text style={styles.termsText}>
            In nec varius est, nec gravida tellus. Nam a egestas est, eget
            convallis erat. Sed vel tortor facilisis, ultrices lacus a, eleifend
            mauris. Quisque at velit eu urna scelerisque ornare. Integer in
            accumsan nibh. Ut vestibulum eros et lorem venenatis.
          </Text>
        </ScrollView>

        <TouchableOpacity style={styles.agreeButton} onPress={handleAgreeTerms}>
          <Text style={styles.agreeButtonText}>LI E CONCORDO</Text>
        </TouchableOpacity>

        {/* MODAL LOADING */}
        <Modal visible={showLoadingModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.bottomModal}>
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => {}}
              >
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>
                Aguarde o operador efetuar o abastecimento ...
              </Text>

              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Aguarde</Text>
            </View>
          </View>
        </Modal>

        {/* MODAL SUCESSO */}
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.bottomModal}>
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={handleFinishFueling}
              >
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Abastecimento concluído!</Text>
              <Text style={styles.modalSubtitle}>
                Confira a quantidade de litros e o valor final do abastecimento:
              </Text>

              <View style={styles.resultRow}>
                <View style={styles.resultColumn}>
                  <Text style={styles.resultLabel}>Litros</Text>
                  <Text style={styles.resultValue}>{litersNumber}</Text>
                </View>

                <View style={styles.resultColumn}>
                  <Text style={styles.resultLabel}>R$</Text>
                  <Text style={styles.resultValue}>
                    {totalValue.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinishFueling}
              >
                <Text style={styles.finishButtonText}>
                  ABASTECIMENTO FINALIZADO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  // ========= TELA INFORMAR HORAS =========
  return (
    <View style={styles.container}>
      {renderHeader('Informar horas')}

      <View style={styles.hoursContent}>
        <Text style={styles.questionText}>
          Deseja informar as horas de uso?
        </Text>

        <Text style={styles.fieldLabel}>Horas de uso (opcional)</Text>

        <View style={styles.timeInputWrapper}>
          <Ionicons name="time-outline" size={20} color="#FFFFFF" />
          <TextInput
            value={usageHours}
            onChangeText={setUsageHours}
            placeholder="00:00"
            placeholderTextColor="#B0B5C3"
            keyboardType="numeric"
            style={styles.timeInput}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.bottomPrimaryButton}
        onPress={handleOpenLitersModal}
      >
        <Text style={styles.bottomPrimaryButtonText}>ABASTECER</Text>
      </TouchableOpacity>

      {/* MODAL LITROS */}
      <Modal
        visible={showLitersModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLitersModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomModal}>
            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={() => {
                setShowLitersModal(false)
                setIsCompletingTank(false)
              }}
            >
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Quantos litros gostaria de abastecer?
            </Text>

            <Text style={styles.fieldLabel}>Litros</Text>

            <View style={styles.textInputWrapper}>
              <TextInput
                value={liters}
                onChangeText={text => {
                  setIsCompletingTank(false)
                  setLiters(text)
                }}
                placeholder="Informe os litros"
                placeholderTextColor="#B0B5C3"
                keyboardType="numeric"
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, { marginTop: 24 }]}
              onPress={handleConfirmLiters}
            >
              <Text style={styles.modalPrimaryButtonText}>ABASTECER</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>ou</Text>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={handleCompleteTank}
            >
              {/* mantém o typo do layout */}
              <Text style={styles.modalSecondaryButtonText}>COMPLETAR</Text>
            </TouchableOpacity>
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
  hoursContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8
  },
  timeInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#30384A',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  timeInput: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16
  },
  bottomPrimaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center'
  },
  bottomPrimaryButtonText: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  },
  // TERMS
  termsContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120
  },
  termsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16
  },
  agreeButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center'
  },
  agreeButtonText: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  },
  // MODAIS
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end'
  },
  bottomModal: {
    backgroundColor: '#202737',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    marginRight: 32
  },
  modalSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 24
  },
  textInputWrapper: {
    backgroundColor: '#30384A',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 16
  },
  modalPrimaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center'
  },
  modalPrimaryButtonText: {
    color: '#1E2340',
    fontWeight: '700',
    fontSize: 14
  },
  orText: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 12
  },
  modalSecondaryButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  modalSecondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center'
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24
  },
  resultColumn: {
    flex: 1,
    alignItems: 'center'
  },
  resultLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 4
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700'
  },
  finishButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8
  },
  finishButtonText: {
    color: '#1E2340',
    fontWeight: '700',
    fontSize: 14
  }
})

