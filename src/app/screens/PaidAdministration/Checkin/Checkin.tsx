import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native'
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'

const LOCATOR_CODE = 'RT6H87'

export default function CheckInScreen() {
  const navigation: any = useNavigation()

  const [locator, setLocator] = useState('')
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [reservationFound, setReservationFound] = useState(false)

  const [scannerVisible, setScannerVisible] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const [checkInConfirmVisible, setCheckInConfirmVisible] = useState(false)
  const [checkInSuccessVisible, setCheckInSuccessVisible] = useState(false)

  const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false)
  const [cancelSuccessVisible, setCancelSuccessVisible] = useState(false)

  const goBack = () => navigation.goBack()

  const handleSearch = () => {
    if (!locator.trim()) return
    setLoadingSearch(true)

    // mock de busca de reserva
    setTimeout(() => {
      setLoadingSearch(false)
      setReservationFound(true)
    }, 800)
  }

  const handleCheckInPress = () => setCheckInConfirmVisible(true)

  const handleConfirmCheckIn = () => {
    setCheckInConfirmVisible(false)
    setCheckInSuccessVisible(true)
  }

  const handleCancelReservationPress = () => setCancelConfirmVisible(true)

  const handleConfirmCancelReservation = () => {
    setCancelConfirmVisible(false)
    setCancelSuccessVisible(true)
  }

  const openScanner = async () => {
    const perm = await requestPermission()
    if (perm?.granted) {
      setScannerVisible(true)
    } else {
      // se negar, não abre o scanner
      setScannerVisible(false)
    }
  }

  const handleBarcodeScanned = (event: { data: string }) => {
    if (!event?.data) return
    setScannerVisible(false)
    setLocator(event.data)
    setReservationFound(true)
  }

  const renderReservationCard = () => {
    if (!reservationFound) {
      return (
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>
            Informe seu localizador para carregar as{'\n'}
            informações da sua reserva.
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.card}>
        {/* Status */}
        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>AGUARDANDO OPERADOR</Text>
          </View>
          <MaterialCommunityIcons
            name="swap-vertical"
            size={18}
            color="#F3B23A"
          />
        </View>

        {/* Embarcação */}
        <TouchableOpacity style={styles.boatCard} activeOpacity={0.8}>
          <View>
            <Text style={styles.boatName}>Tormenta dos Mares II</Text>
            <Text style={styles.boatSubTitle}>Yamaha XC 700</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Posição */}
        <Text style={styles.positionTitle}>Posição 2</Text>

        {/* Info rows */}
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="swap-vertical"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Movimento</Text>
          <Text style={styles.infoValue}>Descida</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome5
            name="user-friends"
            size={16}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Adultos</Text>
          <Text style={styles.infoValue}>8</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="happy-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Crianças</Text>
          <Text style={styles.infoValue}>2</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Data</Text>
          <Text style={styles.infoValue}>01/03/2023</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Horário</Text>
          <Text style={styles.infoValue}>12:00</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Tempo médio de espera</Text>
          <Text style={styles.infoValue}>20 min</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Localizador</Text>
          <Text style={[styles.infoValue, styles.locatorValue]}>
            {locator || LOCATOR_CODE}
          </Text>
        </View>

        {/* Ações */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, styles.checkInButton]}
            activeOpacity={0.9}
            onPress={handleCheckInPress}
          >
            <Text style={styles.primaryButtonText}>EFETUAR CHECK-IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, styles.cancelButton]}
            activeOpacity={0.9}
            onPress={handleCancelReservationPress}
          >
            <Text style={styles.primaryButtonText}>CANCELAR RESERVA</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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

        <Text style={styles.headerTitle}>Check-in</Text>

        {/* X transparente */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Campo Localizador */}
        <Text style={styles.fieldLabel}>Localizador</Text>
        <View style={styles.locatorRow}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={locator}
              onChangeText={text => {
                setLocator(text)
                if (!text) setReservationFound(false)
              }}
              placeholder="Informe seu localizador"
              placeholderTextColor="#A6B0C5"
              style={styles.input}
              autoCapitalize="characters"
            />

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={openScanner}
              activeOpacity={0.9}
            >
              <Ionicons name="qr-code-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão BUSCAR */}
        <TouchableOpacity
          style={[
            styles.searchButton,
            !locator.trim() && styles.searchButtonDisabled
          ]}
          activeOpacity={locator.trim() ? 0.9 : 1}
          onPress={handleSearch}
          disabled={!locator.trim() || loadingSearch}
        >
          {loadingSearch ? (
            <ActivityIndicator color="#1F2633" />
          ) : (
            <Text style={styles.searchButtonText}>BUSCAR</Text>
          )}
        </TouchableOpacity>

        {/* Card / Placeholder */}
        {renderReservationCard()}
      </ScrollView>

      {/* MODAL SCANNER */}
      <Modal
        visible={scannerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setScannerVisible(false)}
      >
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerHeader}>
            <Text style={styles.scannerTitle}>Ler QR Code do localizador</Text>
            <TouchableOpacity onPress={() => setScannerVisible(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.scannerContent}>
            {permission?.granted ? (
              <CameraView
                style={{ flex: 1 }}
                facing="back"
                barcodeScannerSettings={{
                  barcodeTypes: ['qr', 'code128', 'ean13']
                }}
                onBarcodeScanned={handleBarcodeScanned}
              />
            ) : (
              <View style={styles.permissionBox}>
                <Text style={styles.permissionText}>
                  É necessário permitir o uso da câmera para ler o QR Code.
                </Text>
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={openScanner}
                >
                  <Text style={styles.permissionButtonText}>
                    PERMITIR CÂMERA
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.scannerHint}>
            Aponte a câmera para o QR Code do seu localizador.
          </Text>
        </View>
      </Modal>

      {/* MODAIS CHECK-IN */}
      <Modal
        transparent
        visible={checkInConfirmVisible}
        animationType="fade"
        onRequestClose={() => setCheckInConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Efetuar check-in</Text>
              <TouchableOpacity onPress={() => setCheckInConfirmVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Confirma o check-in para o localizador {locator || LOCATOR_CODE}?
            </Text>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalOutlineButton]}
              onPress={handleConfirmCheckIn}
              activeOpacity={0.9}
            >
              <Text style={styles.modalPrimaryButtonText}>
                CONFIRMAR CHECK-IN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCheckInConfirmVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={checkInSuccessVisible}
        animationType="fade"
        onRequestClose={() => setCheckInSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Check-in efetuado</Text>
              <TouchableOpacity onPress={() => setCheckInSuccessVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              O check-in do localizador {locator || LOCATOR_CODE} foi efetuado
              com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCheckInSuccessVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAIS CANCELAMENTO */}
      <Modal
        transparent
        visible={cancelConfirmVisible}
        animationType="fade"
        onRequestClose={() => setCancelConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cancelar reserva</Text>
              <TouchableOpacity onPress={() => setCancelConfirmVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Tem certeza que deseja cancelar a reserva do localizador{' '}
              {locator || LOCATOR_CODE}?
            </Text>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalOutlineButton]}
              onPress={handleConfirmCancelReservation}
              activeOpacity={0.9}
            >
              <Text style={styles.modalPrimaryButtonText}>
                CANCELAR RESERVA
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCancelConfirmVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={cancelSuccessVisible}
        animationType="fade"
        onRequestClose={() => setCancelSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reserva cancelada</Text>
              <TouchableOpacity onPress={() => setCancelSuccessVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              A reserva do localizador {locator || LOCATOR_CODE} foi cancelada
              com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCancelSuccessVisible(false)}
              activeOpacity={0.9}
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
const STATUS_BG = '#3A4461'
const GREEN = '#00B140'
const RED = '#E53935'
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
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  fieldLabel: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6
  },
  locatorRow: {
    marginBottom: 12
  },
  inputWrapper: {
    backgroundColor: '#3A4A63',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    color: WHITE,
    fontSize: 14,
    paddingVertical: 6
  },
  cameraButton: {
    marginLeft: 8,
    padding: 4
  },
  searchButton: {
    backgroundColor: WHITE,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16
  },
  searchButtonDisabled: {
    opacity: 0.5
  },
  searchButtonText: {
    color: DARK_BG,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  placeholderBox: {
    backgroundColor: '#D3D3D3',
    borderRadius: 16,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  placeholderText: {
    color: '#555555',
    fontSize: 13,
    textAlign: 'center'
  },

  // Card
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginTop: 12
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  statusBadge: {
    backgroundColor: STATUS_BG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  statusText: {
    color: '#E1E6FF',
    fontSize: 11,
    fontWeight: '600'
  },
  boatCard: {
    backgroundColor: '#2E3758',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boatName: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600'
  },
  boatSubTitle: {
    color: '#C0C6E0',
    fontSize: 12,
    marginTop: 2
  },
  positionTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 16
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  infoIcon: {
    width: 22,
    marginRight: 6
  },
  infoLabel: {
    flex: 1,
    color: '#C0C6E0',
    fontSize: 13
  },
  infoValue: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600'
  },
  locatorValue: {
    letterSpacing: 0.5
  },
  actionsContainer: {
    marginTop: 24
  },
  primaryButton: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  checkInButton: {
    backgroundColor: GREEN
  },
  cancelButton: {
    backgroundColor: RED
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700'
  },

  // Scanner modal
  scannerOverlay: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 60,
    paddingHorizontal: 16
  },
  scannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  scannerTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600'
  },
  scannerContent: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16
  },
  scannerHint: {
    color: '#CCCCCC',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24
  },
  permissionBox: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  permissionText: {
    color: '#DDDDDD',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16
  },
  permissionButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: WHITE
  },
  permissionButtonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600'
  },

  // Modais
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
    marginBottom: 10
  },
  modalOutlineButton: {
    borderWidth: 1,
    borderColor: WHITE
  },
  modalPrimaryButtonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700'
  },
  modalSecondaryButton: {
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE
  },
  modalSecondaryButtonText: {
    color: DARK_BG,
    fontSize: 13,
    fontWeight: '700'
  }
})
