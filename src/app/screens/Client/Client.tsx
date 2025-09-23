import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'

type RootStackParamList = {
  ClientProfile: undefined
  ClientNauticalQualification: undefined
  ClientEmergencyContact: undefined
  ClientVessel: undefined
  ClientMarina: undefined
  ExcluirPerfil: undefined
}

export default function Client() {
  const [modalVisible, setModalVisible] = useState(false)

  const handleExcluir = () => {
    setModalVisible(false)
    console.log('Cliente excluído!')
  }
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  type MenuButtonProps = {
    label: string
    icon: React.ReactNode
    screen?: keyof RootStackParamList
    danger?: boolean
    onPress?: () => void
  }

  const MenuButton = ({ label, icon, screen, danger }: MenuButtonProps) => (
    <TouchableOpacity
      style={[styles.menuButton, danger && styles.dangerButton]}
      onPress={() => navigation.navigate(screen!)}
    >
      <View style={styles.iconLabel}>
        {icon}
        <Text style={styles.menuText}>{label}</Text>
      </View>
      {!danger && <Ionicons name="chevron-forward" size={20} color="#fff" />}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#1A2A44"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Renato Gonçalves</Text>
        <Ionicons
          name="close"
          size={24}
          color="#1A2A44"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Foto */}
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.avatar}
        />

        {/* Botões */}
        <MenuButton
          label="Perfil"
          screen="ClientProfile"
          icon={<Ionicons name="person-outline" size={20} color="#fff" />}
        />
        <MenuButton
          label="Habilitação Náutica"
          screen="ClientNauticalQualification"
          icon={
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={20}
              color="#fff"
            />
          }
        />
        <MenuButton
          label="Emergência"
          screen="ClientEmergencyContact"
          icon={<Ionicons name="alert-circle-outline" size={20} color="#fff" />}
        />
        <MenuButton
          label="Embarcação"
          screen="ClientVessel"
          icon={
            <MaterialCommunityIcons name="ship-wheel" size={20} color="#fff" />
          }
        />
        <MenuButton
          label="Marina"
          screen="ClientMarina"
          icon={
            <FontAwesome5
              name="anchor"
              size={24}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
          }
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Excluir Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Modal de exclusão */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            {/* Botão de fechar (X) */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Excluir cliente?</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir este cliente? O perfil não poderá
              ser recuperado posteriormente e será necessário um novo cadastro
              para o uso deste usuário.
            </Text>

            {/* Botões de ação */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleExcluir}
            >
              <Text style={styles.confirmText}>EXCLUIR</Text>
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
    backgroundColor: '#2E3A4D'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2A44'
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 30
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4A5A72',
    padding: 15,
    borderRadius: 30,
    width: '85%',
    marginVertical: 8
  },
  dangerButton: {
    backgroundColor: '#C0392B'
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  menuText: {
    color: '#fff',
    fontSize: 16
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end'
  },
  modalBox: {
    backgroundColor: '#2D3748',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '35%',
    position: 'relative'
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#C0392B',
    padding: 15,
    borderRadius: 30,
    width: '85%',
    marginVertical: 8
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center'
  },
  modalText: {
    color: '#CBD5E0',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 14,
    marginBottom: 12
  },
  cancelText: {
    color: '#1C2431',
    fontWeight: '700',
    textAlign: 'center'
  },
  confirmButton: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 14
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  }
})

