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
import { useAuth } from '../../contexts/AuthContext'

const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return '--'
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value
  }

  const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch

    return `${day}/${month}/${year}`
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '--'
  }

  return date.toLocaleDateString('pt-BR')
}

const formatCpf = (value: string | number | null | undefined) =>
  String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') || '--'

const formatSector = (value: string | null | undefined) => {
  if (!value) {
    return '--'
  }

  return value
    .split('_')
    .join(' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}

export default function Employees() {
  const navigation: any = useNavigation()
  const { session } = useAuth()

  const employees = React.useMemo(() => {
    const marinaEmployees = Array.isArray(session?.marina?.employees)
      ? session?.marina?.employees
      : []

    return marinaEmployees.map((employee: any) => {
      const person = employee?.people || {}
      const rawImage = person?.image
      const avatarUri = rawImage
        ? rawImage.startsWith('data:image')
          ? rawImage
          : `data:image/png;base64,${rawImage}`
        : null

      return {
        id: String(employee?.id || employee?.peopleId || person?.id),
        peopleId: employee?.peopleId || person?.id,
        name: person?.fullname || person?.name || 'Funcionário',
        role: employee?.occupation || '--',
        employeeType: employee?.employeeType || '--',
        sector: formatSector(employee?.sector),
        birthDate: formatDate(person?.birth),
        admissionDate: formatDate(employee?.admission),
        register: employee?.credential || '--',
        cpf: formatCpf(person?.registrationPf),
        avatarUri,
        raw: employee
      }
    })
  }, [session?.marina?.employees])

  const handlePress = (employee: any) => {
    navigation.navigate('EditEmployee', { employee })
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <View style={styles.header}>
        <Image
          source={
            item.avatarUri
              ? { uri: item.avatarUri }
              : require('../../assets/splash-icon.png')
          }
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>
            {item.role} • {item.sector}
          </Text>
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
        <MaterialIcons
          name="check-circle"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>Admissão</Text>
        <Text style={styles.value}>{item.admissionDate}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="badge"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>Tipo</Text>
        <Text style={styles.value}>{item.employeeType}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="work"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>Cargo</Text>
        <Text style={styles.value}>{item.role}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="credit-card"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>Credencial</Text>
        <Text style={styles.value}>{item.register}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="fingerprint"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.value}>{item.cpf}</Text>
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
        <Text style={styles.headerTitleName}>Funcionários</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          employees.length === 0 && styles.emptyListContent
        ]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="groups" size={32} color="#9FB0C8" />
            <Text style={styles.emptyTitle}>Nenhum funcionário encontrado</Text>
            <Text style={styles.emptyDescription}>
              Os funcionários da marina ainda não estão disponíveis na sessão.
            </Text>
          </View>
        }
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
  listContent: {
    paddingBottom: 20
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center'
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
    fontSize: 14,
    maxWidth: '45%',
    textAlign: 'right'
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 12
  },
  emptyDescription: {
    color: '#C9D3E5',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20
  }
})
