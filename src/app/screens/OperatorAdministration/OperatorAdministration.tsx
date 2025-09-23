import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function OperatorAdministration() {
  const navigation: any = useNavigation()

  const goToRoleSelection = () => {
    navigation.goBack()
  }

  const handleNavigate = (menu: string) => {
    navigation.navigate(menu)
  }

  return (
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
            name="anchor"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate('Trips')}
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
          onPress={() => handleNavigate('Financial')}
        >
          <FontAwesome5
            name="chart-line"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Financeiro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate('Support')}
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
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={goToRoleSelection} style={styles.goBack}>
          <Text style={styles.goBackText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  title: { fontSize: 18, color: '#fff', fontWeight: '600' },
  subTitle: { fontSize: 14, color: '#fff', fontWeight: 'light' },
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

