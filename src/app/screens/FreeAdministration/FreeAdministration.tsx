import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator
} from 'react-native'
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type MovementType = 'SUBIDA' | 'DESCIDA'
type MovementStep = 1 | 2 | 3 | 4

export default function FreeAdministration() {
  const navigation: any = useNavigation()

  const [movementModalVisible, setMovementModalVisible] = useState(false)
  const [movementType, setMovementType] = useState<MovementType | null>(null)
  const [movementStep, setMovementStep] = useState<MovementStep>(1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const goToRoleSelection = () => {
    navigation.goBack()
  }
  const goToSosHelp = () => {
    navigation.navigate('SosHelp')
  }

  const handleNavigate = (menu: string) => {
    navigation.navigate(menu)
  }

  const clearFlowTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const advanceStep = (step: MovementStep) => {
    setMovementStep(step)

    if (step < 4) {
      clearFlowTimeout()
      timeoutRef.current = setTimeout(() => {
        advanceStep((step + 1) as MovementStep)
      }, 2500)
    }
  }

  const startMovementFlow = (type: MovementType) => {
    clearFlowTimeout()
    setMovementType(type)
    setMovementModalVisible(true)
    advanceStep(1)
  }

  const closeMovementFlow = () => {
    clearFlowTimeout()
    setMovementModalVisible(false)
    setMovementStep(1)
    setMovementType(null)
  }

  useEffect(() => {
    return () => {
      clearFlowTimeout()
    }
  }, [])

  const getModalTexts = () => {
    if (!movementType) {
      return {
        title: '',
        subtitle: ''
      }
    }

    if (movementStep === 1) {
      return {
        title: 'Aguarde confirmação do operador ...',
        subtitle: ''
      }
    }

    if (movementStep === 2) {
      return {
        title: 'Confirmado!',
        subtitle:
          movementType === 'SUBIDA'
            ? 'O operador confirmou seu movimento de subida, aguarde sua vez.\n\nTempo médio de espera: 20 minutos'
            : 'O operador confirmou seu movimento de descida, aguarde sua vez.\n\nTempo médio de espera: 20 minutos'
      }
    }

    if (movementStep === 3) {
      return {
        title: 'Você é o próximo da fila!',
        subtitle: 'Dirija-se à rampa imediatamente.'
      }
    }

    // step 4 – textos finais diferentes
    if (movementType === 'SUBIDA') {
      return {
        title: 'Retirada finalizada com sucesso!',
        subtitle:
          'Sua embarcação foi guardada na posição XXX.\nObrigada e até a próxima!'
      }
    } else {
      return {
        title: 'Descida finalizada com sucesso!',
        subtitle: 'Sua embarcação está posicionada na rampa.\nBoa navegação!'
      }
    }
  }

  const { title: modalTitle, subtitle: modalSubtitle } = getModalTexts()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logoname_high_resolution.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={require('../../assets/splash-icon.png')}
              style={styles.marinaImage}
            />
            <View>
              <Text style={styles.marinaName}>Renato Augusto</Text>
              <Text style={styles.marinaCnpj}>Mat. 123456789</Text>
            </View>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => handleNavigate('EditClient')}
            >
              <Feather name="edit-2" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardRow}>
            <Feather name="user" color="#fff" size={16} />
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.value}>123.456.789-10</Text>
          </View>
          <View style={styles.cardRow}>
            <Feather name="calendar" color="#fff" size={16} />
            <Text style={styles.label}>Nascimento</Text>
            <Text style={styles.value}>01/02/1985</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('PaidVessels')}
          >
            <Ionicons
              name="boat"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Embarcações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('PaidMarinaAdministration')}
          >
            <MaterialCommunityIcons
              name="anchor"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Marina</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Weather')}
          >
            <FontAwesome5
              name="cloud-sun"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Clima</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Coupons')}
          >
            <MaterialIcons
              name="loyalty"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Cupons e descontos</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={goToSosHelp}
            style={styles.emergencyButton}
          >
            <Text style={styles.emergencyText}>SOS & RESGATE</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={goToRoleSelection} style={styles.goBack}>
            <Text style={styles.goBackText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL FLUXO DE MOVIMENTAÇÃO */}
      <Modal
        visible={movementModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMovementFlow}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>

              <TouchableOpacity onPress={closeMovementFlow}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {!!modalSubtitle && (
              <Text style={styles.modalMessage}>{modalSubtitle}</Text>
            )}

            {/* Loader */}
            {modalTitle !== 'Descida finalizada com sucesso!' &&
              modalTitle !== 'Retirada finalizada com sucesso!' && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={styles.loaderText}>Aguarde</Text>
                </View>
              )}

            {movementStep === 4 && (
              <TouchableOpacity
                style={styles.modalFinalButton}
                onPress={closeMovementFlow}
              >
                <Text style={styles.modalFinalButtonText}>FINALIZAR</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2F3A4C', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  title: { fontSize: 18, color: '#fff', fontWeight: '600' },
  logo: {
    alignSelf: 'center',
    height: 40,
    width: 160,
    marginTop: 40
  },
  goBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    width: '30%',
    marginTop: 20
  },
  goBackText: { fontWeight: 'bold', color: '#2F3A4C' },
  emergencyText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  card: {
    backgroundColor: '#3D4B64',
    borderRadius: 10,
    padding: 16,
    marginVertical: 12
  },
  emergencyButton: {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: 'bold',
    borderRadius: 6,
    paddingVertical: 10,
    width: '100%',
    marginTop: 5
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  marinaImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 12
  },
  marinaName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  marinaCnpj: { color: '#ccc', fontSize: 14 },
  editIcon: { marginLeft: 'auto' },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  label: { marginLeft: 6, color: '#ccc', fontSize: 14, flex: 1 },
  value: { color: '#fff', fontSize: 14 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10
  },
  button: {
    backgroundColor: '#2B2F66',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    marginBottom: 16
  },
  buttonMovement: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    marginBottom: 16
  },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },

  // Modal fluxo
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    width: '82%',
    backgroundColor: '#2F3A4C',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 26
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    flex: 1,
    marginRight: 12
  },
  modalMessage: {
    color: '#E1E6FF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  loaderText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 13
  },
  modalFinalButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4
  },
  modalFinalButtonText: {
    color: '#2F3A4C',
    fontSize: 14,
    fontWeight: '700'
  }
})

