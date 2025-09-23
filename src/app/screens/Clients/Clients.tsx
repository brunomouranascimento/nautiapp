// Employees.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const clients: Array<any> = [
  {
    id: '1',
    name: 'Renato Gonçalves',
    role: 'Yamaha XC 700',
    birthDate: '01/02/1985',
    register: '01234567',
    photo: './../assets/splash-icon.png' // Substitua pela URL correta
  }
]

export default function Clients() {
  const navigation: any = useNavigation()

  const handlePress = (employee: any) => {
    navigation.navigate('EditClient', { employee })
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="calendar-today"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>Data de nascimento</Text>
        <Text style={styles.value}>{item.birthDate}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name="id-card"
          size={18}
          color="#ffffff"
          style={styles.icon}
        />
        <Text style={styles.label}>Matrícula</Text>
        <Text style={styles.value}>{item.register}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Clientes</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <FlatList
        data={clients}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3444',
    padding: 16
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 35
  },
  headerTitleName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center'
  },
  card: {
    backgroundColor: '#3D4B64',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  name: {
    fontWeight: 'bold',
    color: '#fff'
  },
  role: {
    color: '#ccc'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8
  },
  nameContainer: {
    flex: 1
  },
  icon: {
    width: 24
  },
  label: {
    flex: 1,
    color: '#ccc',
    fontSize: 14
  },
  value: {
    color: 'white',
    fontSize: 14
  }
})

