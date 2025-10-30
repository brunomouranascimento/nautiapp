import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function CondominiumAdministration() {
  const navigation: any = useNavigation()

  const goToRoleSelection = () => {
    navigation.goBack()
  }

  const handleNavigate = (menu: string) => {
    navigation.navigate(menu)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/logoname_high_resolution.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={require('../../../assets/splash-icon.png')}
              style={styles.marinaImage}
            />
            <View>
              <Text style={styles.marinaName}>Condomínio XPTO</Text>
              <Text style={styles.marinaCnpj}>Fulano's House</Text>
            </View>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => handleNavigate('CondominiumData')}
            >
              <Feather name="edit-2" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.label}>Rua XYZ, 123</Text>
            <Text style={styles.value}>Porto Alegre, RS</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>(51) 1234-5678</Text>
            <Text style={styles.value}>email12345@gmail.com</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('PaidVessels')}
          >
            <FontAwesome5
              name="address-card"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Controle de acesso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Employees')}
          >
            <FontAwesome6
              name="screwdriver-wrench"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Manutenção</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Clients')}
          >
            <FontAwesome6
              name="box-archive"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Achados e perdidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Trips')}
          >
            <FontAwesome6
              name="building-user"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Administração</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Financial')}
          >
            <MaterialIcons
              name="pets"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Pets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Support')}
          >
            <FontAwesome5
              name="chart-line"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Prestação de contas</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={goToRoleSelection} style={styles.goBack}>
            <Text style={styles.goBackText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' }
})

