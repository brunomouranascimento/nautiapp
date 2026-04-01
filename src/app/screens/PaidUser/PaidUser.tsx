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
import {
  useFocusEffect,
  useNavigation,
  NavigationProp
} from '@react-navigation/native'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext'

type RootStackParamList = {
  ClientProfile: { clientId?: string | number }
  ClientNauticalQualification: { clientId?: string | number }
  ClientEmergencyContact: { clientId?: string | number }
  ClientVessel: { clientId?: string | number }
  ClientMarina: { clientId?: string | number }
  ExcluirPerfil: undefined
}

const getAvatarUri = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  return value.startsWith('data:image')
    ? value
    : `data:image/png;base64,${value}`
}

export default function PaidUser() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { session, setSession } = useAuth()
  const userId = session?.user?.id ?? session?.id
  const user = session?.user || session
  const clientData = (userId ? session?.clientDetails?.[userId] : null) || {
    people: user
  }
  const person = clientData?.people || {}
  const clientName =
    person?.fullname ||
    person?.fullName ||
    person?.name ||
    person?.username ||
    'Cliente'
  const avatarUri = getAvatarUri(
    person?.avatar || person?.image || session?.avatar
  )

  useFocusEffect(
    React.useCallback(() => {
      if (!userId || !user) {
        return
      }

      setSession(currentSession => ({
        ...(currentSession || {}),
        clientDetails: {
          ...(currentSession?.clientDetails || {}),
          [userId]: currentSession?.clientDetails?.[userId] || {
            people: user
          }
        }
      }))
    }, [userId, user, setSession])
  )

  const handleExcluir = () => {
    setModalVisible(false)
    console.log('Cliente excluído!')
  }

  type MenuButtonProps = {
    label: string
    icon: React.ReactNode
    screen?: keyof RootStackParamList
    danger?: boolean
  }

  const MenuButton = ({ label, icon, screen, danger }: MenuButtonProps) => (
    <TouchableOpacity
      style={[styles.menuButton, danger && styles.dangerButton]}
      onPress={() => {
        if (!screen || !userId) {
          return
        }

        navigation.navigate(
          screen as any,
          {
            clientId: userId
          } as never
        )
      }}
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
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>{clientName}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={
            avatarUri
              ? { uri: avatarUri }
              : require('../../assets/splash-icon.png')
          }
          style={styles.avatar}
        />

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
          icon={<FontAwesome5 name="anchor" size={20} color="#fff" />}
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Excluir Perfil</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
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
    backgroundColor: '#2E3A4D'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  headerSpacer: {
    width: 24
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 30
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF'
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
    fontSize: 15
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#C0392B',
    padding: 15,
    borderRadius: 30,
    width: '85%',
    marginTop: 20,
    justifyContent: 'center'
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#2E3A4D',
    borderRadius: 20,
    padding: 20
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  modalText: {
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 10
  },
  cancelText: {
    textAlign: 'center',
    color: '#2E3A4D',
    fontWeight: 'bold'
  },
  confirmButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    borderRadius: 25
  },
  confirmText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  }
})

