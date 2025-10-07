import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput
} from 'react-native'
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function OperatorAdministration() {
  const navigation: any = useNavigation()
  const [scanVisible, setScanVisible] = React.useState(false)
  const [scanCode, setScanCode] = React.useState('')

  const goToRoleSelection = () => {
    navigation.goBack()
  }

  const handleNavigate = (menu: string) => {
    navigation.navigate(menu)
  }

  const openNotifications = () => {
    navigation.navigate('OperatorNotifications')
  }

  const openScan = () => setScanVisible(true)
  const closeScan = () => setScanVisible(false)

  const confirmScan = () => {
    // aqui você poderia validar/ler QR; estamos mockando
    closeScan()
    navigation.navigate('VesselScan', {
      id: scanCode || 'XZ-001',
      nome: 'Yamaha XZ700',
      proprietario: 'Jorge Fernandes',
      status: 'Ativa'
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topActions}>
        <Image
          source={require('../../assets/logoname_high_resolution.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.actionsRight}>
          <TouchableOpacity
            onPress={openNotifications}
            style={styles.bellBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="bell" size={18} color="#1E2B58" />
            {/* badge opcional */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={require('../../assets/splash-icon.png')}
            style={styles.marinaImage}
          />
          <View>
            <Text style={styles.marinaName}>Jorge Fernandes</Text>
            <Text style={styles.marinaCnpj}>Mat. 123456789</Text>
          </View>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => handleNavigate('Profile')}
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
          onPress={() => handleNavigate('Profile')}
        >
          <FontAwesome5
            name="user-alt"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate('OperatorTrips')}
        >
          <MaterialCommunityIcons
            name="swap-vertical"
            size={34}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Movimentações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate('OperatorServices')}
        >
          <FontAwesome5
            name="wrench"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate('OperatorSupport')}
        >
          <FontAwesome5
            name="question-circle"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Suporte</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={openScan} style={styles.scanLink}>
        <Text style={styles.scanText}>Escanear embarcação</Text>
        <FontAwesome5
          name="qrcode"
          size={26}
          color="#C9D3E5"
          style={{ marginTop: 6 }}
        />
      </TouchableOpacity>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={goToRoleSelection} style={styles.goBack}>
          <Text style={styles.goBackText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
      {/* Modal de Escanear Embarcação */}
      <Modal
        visible={scanVisible}
        transparent
        animationType="fade"
        onRequestClose={closeScan}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Escanear embarcação</Text>
            <Text style={styles.modalDesc}>
              Aponte a câmera para o QR Code ou digite o código da embarcação.
            </Text>

            {/* Campo mock de código */}
            <View style={styles.inputWrap}>
              <Feather name="hash" color="#AFC3D9" size={16} />
              <TextInput
                placeholder="Ex.: XZ-001"
                placeholderTextColor="#AFC3D9"
                value={scanCode}
                onChangeText={setScanCode}
                style={styles.input}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={closeScan}
                style={[styles.modalBtn, styles.btnGhost]}
              >
                <Text style={[styles.modalBtnText, { color: '#1E2B58' }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmScan}
                style={[styles.modalBtn, styles.btnPrimary]}
              >
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>
                  Ver detalhes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const MenuButton = ({ icon, label, customIconSet }: any) => {
  const Icon =
    customIconSet === 'MaterialCommunityIcons'
      ? MaterialCommunityIcons
      : FontAwesome5

  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={icon} size={24} color="#fff" style={{ marginBottom: 8 }} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2F3A4C', padding: 16 },
  topActions: {
    marginTop: 40
  },
  actionsRight: { position: 'absolute', right: 16, top: 16 },
  logo: {
    height: 60,
    width: '60%',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scanLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  scanText: { color: '#C9D3E5', fontWeight: '700' },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E33',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  title: { fontSize: 18, color: '#fff', fontWeight: '600' },
  subTitle: { fontSize: 14, color: '#fff', fontWeight: 'light' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCard: {
    width: '88%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16
  },
  modalTitle: { fontWeight: '800', fontSize: 16, color: '#1E2B58' },
  modalDesc: { color: '#4A5B70', marginTop: 6, marginBottom: 12 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F0F7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  input: { flex: 1, marginLeft: 8, color: '#1E2B58' },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 14,
    gap: 10
  },
  modalBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  btnGhost: { backgroundColor: '#EDF3FA' },
  btnPrimary: { backgroundColor: '#1E2B58' },
  modalBtnText: { fontWeight: '800' },
  // logo: {
  //   alignSelf: 'center',
  //   height: 40,
  //   width: 160,
  //   marginTop: 40
  // },
  goBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    width: '30%',
    marginTop: 40
  },
  goBackText: { fontWeight: 'bold', color: '#2F3A4C' },
  card: {
    backgroundColor: '#3D4B64',
    borderRadius: 10,
    padding: 16,
    marginVertical: 12
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
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' }
})

