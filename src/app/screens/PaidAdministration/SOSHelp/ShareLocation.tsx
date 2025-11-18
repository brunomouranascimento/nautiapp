import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function SosShareLocationScreen() {
  const navigation: any = useNavigation()

  const [confirmVisible, setConfirmVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const handleShare = () => {
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

        <Text style={styles.headerTitle}>Compartilhar localização</Text>

        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={60}
            color="#B7D7FF"
          />
        </View>

        <Text style={styles.text}>
          Compartilhe sua localização com a sua marina para agilizar o
          atendimento.
        </Text>

        <TouchableOpacity
          style={styles.locationButton}
          activeOpacity={0.9}
          onPress={() => setConfirmVisible(true)}
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={22}
            color="#1F2633"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.locationButtonText}>
            Compartilhar minha localização
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}>
          <MaterialCommunityIcons
            name="map-outline"
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.outlineButtonText}>Visualizar no mapa</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL CONFIRMAR */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Compartilhar localização</Text>
              <TouchableOpacity onPress={() => setConfirmVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Deseja realmente enviar sua localização atual para sua marina?
            </Text>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalOutlineButton]}
              onPress={handleShare}
            >
              <Text style={styles.modalPrimaryButtonText}>COMPARTILHAR</Text>
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

      {/* MODAL SUCESSO */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successContainer}>
            <View style={styles.successHeader}>
              <Text style={styles.modalTitle}>Localização enviada</Text>
              <TouchableOpacity onPress={() => setSuccessVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Sua localização foi enviada com sucesso para a marina.
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
    paddingTop: 24,
    alignItems: 'center'
  },
  iconContainer: {
    marginBottom: 16
  },
  text: {
    color: WHITE,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20
  },
  locationButton: {
    backgroundColor: '#B7D7FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 12,
    width: '100%',
    justifyContent: 'center'
  },
  locationButtonText: {
    color: '#1F2633',
    fontSize: 15,
    fontWeight: '700'
  },
  outlineButton: {
    borderColor: WHITE,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    width: '100%',
    justifyContent: 'center'
  },
  outlineButtonText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600'
  },

  // MODAIS
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center'
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
  successHeader: {
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
    lineHeight: 20,
    textAlign: 'center'
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

