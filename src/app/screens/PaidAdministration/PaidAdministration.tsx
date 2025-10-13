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
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function PaidAdministration() {
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
              <Text style={styles.marinaName}>Jorge Fernandes</Text>
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
            onPress={() => handleNavigate('Profile')}
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
            onPress={() => handleNavigate('Employees')}
          >
            <FontAwesome5
              name="laptop-house"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Condomínio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Clients')}
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
            onPress={() => handleNavigate('Trips')}
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
            onPress={() => handleNavigate('Financial')}
          >
            <FontAwesome5
              name="location-arrow"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Agendar navegação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Support')}
          >
            <MaterialIcons
              name="loyalty"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Cupons e descontos</Text>
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
            <Text style={styles.buttonText}>Financeiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Support')}
          >
            <MaterialCommunityIcons
              name="map-marker-check"
              size={28}
              color="#fff"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Check-in</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 10,
            textAlign: 'center'
          }}
        >
          Movimentação
        </Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.buttonMovement}
            onPress={() => handleNavigate('Support')}
          >
            <AntDesign
              name="arrowdown"
              size={38}
              color="red"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Solicitar descida</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMovement}
            onPress={() => handleNavigate('Support')}
          >
            <AntDesign
              name="arrowup"
              size={38}
              color="green"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.buttonText}>Solicitar subida</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={goToRoleSelection}
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

