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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
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

const formatPhone = (value: string | number | null | undefined) => {
  const digits = String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11)

  if (!digits) {
    return '--'
  }

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const getAvatarUri = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  return value.startsWith('data:image')
    ? value
    : `data:image/png;base64,${value}`
}

const getMainPhone = (phones: any[] | undefined) =>
  phones?.find(phone => phone?.major || phone?.main || phone?.principal)
    ?.connection ||
  phones?.[0]?.connection ||
  phones?.[0]?.number ||
  ''

export default function Clients() {
  const navigation: any = useNavigation()
  const { session, setSession } = useAuth()
  const [isLoadingClients, setIsLoadingClients] = React.useState(false)
  const [hasLoadedClients, setHasLoadedClients] = React.useState(false)

  const sessionClients = Array.isArray(session?.clients) ? session?.clients : []
  const showClientsSkeleton = isLoadingClients && sessionClients.length === 0

  useFocusEffect(
    React.useCallback(() => {
      if (sessionClients.length > 0) {
        setIsLoadingClients(false)
        setHasLoadedClients(true)

        return
      }

      let isActive = true

      const loadClients = async () => {
        setIsLoadingClients(true)

        try {
          const response = await fetch(
            'https://hml-ntslcl.nautisystem.com/member/list',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Content-Type': 'application/json',
                lang: 'pt-BR',
                locale: 'pt-BR',
                'x-access-token': session?.authorization || ''
              },
              body: JSON.stringify({
                partnerId: 1,
                pagination: { limit: 1000, offset: 0 }
              })
            }
          )

          if (!response.ok) {
            return
          }

          const responseText = await response.text()
          const responseData = responseText ? JSON.parse(responseText) : null
          const rows = Array.isArray(responseData?.object?.rows)
            ? responseData.object.rows
            : []

          if (!isActive) {
            return
          }

          setSession(currentSession => ({
            ...(currentSession || {}),
            clients: rows
          }))
        } catch {
          // Mantém a tela funcional se a request falhar.
        } finally {
          if (!isActive) {
            return
          }

          setIsLoadingClients(false)
          setHasLoadedClients(true)
        }
      }

      loadClients()

      return () => {
        isActive = false
      }
    }, [session?.authorization, sessionClients.length, setSession])
  )

  const clients = React.useMemo(
    () =>
      sessionClients.map((client: any) => {
        const person = client?.people || {}

        return {
          id: String(client?.id || person?.id),
          clientId: client?.id,
          name: person?.fullname || person?.name || 'Cliente',
          phone: formatPhone(getMainPhone(person?.phones)),
          birthDate: formatDate(person?.birth),
          register: formatCpf(person?.registrationPf),
          avatarUri: getAvatarUri(person?.image),
          raw: client
        }
      }),
    [sessionClients]
  )

  const handlePress = (client: any) => {
    navigation.navigate('EditClient', {
      clientId: client?.clientId || client?.id,
      client
    })
  }

  const renderSkeleton = (_: unknown, index: number) => (
    <View key={index} style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, styles.skeletonAvatar]} />
        <View style={styles.nameContainer}>
          <View style={[styles.skeletonLine, styles.skeletonTitle]} />
          <View style={[styles.skeletonLine, styles.skeletonSubtitle]} />
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="calendar-today"
          size={18}
          color="#ccc"
          style={styles.icon}
        />
        <Text style={styles.label}>Data de nascimento</Text>
        <View style={[styles.skeletonLine, styles.skeletonValue]} />
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="call" size={18} color="#ffffff" style={styles.icon} />
        <Text style={styles.label}>Telefone</Text>
        <View style={[styles.skeletonLine, styles.skeletonValue]} />
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name="id-card"
          size={18}
          color="#ffffff"
          style={styles.icon}
        />
        <Text style={styles.label}>CPF</Text>
        <View style={[styles.skeletonLine, styles.skeletonValue]} />
      </View>
    </View>
  )

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
          <Text style={styles.role}>{item.phone}</Text>
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
        <Ionicons name="call" size={18} color="#ffffff" style={styles.icon} />
        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.value}>{item.phone}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name="id-card"
          size={18}
          color="#ffffff"
          style={styles.icon}
        />
        <Text style={styles.label}>CPF</Text>
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

      {showClientsSkeleton ? (
        <FlatList
          data={[0, 1, 2]}
          keyExtractor={item => String(item)}
          renderItem={({ index }) => renderSkeleton(null, index)}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={clients}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            clients.length === 0 && styles.emptyListContent
          ]}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="groups" size={32} color="#9FB0C8" />
              <Text style={styles.emptyTitle}>Nenhum cliente encontrado</Text>
              <Text style={styles.emptyDescription}>
                {hasLoadedClients
                  ? 'A lista de clientes retornou vazia.'
                  : 'Os clientes ainda não foram carregados.'}
              </Text>
            </View>
          }
        />
      )}
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
  skeletonAvatar: {
    backgroundColor: '#55627C'
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
    paddingTop: 8,
    alignItems: 'center'
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
  skeletonLine: {
    backgroundColor: '#55627C',
    borderRadius: 999
  },
  skeletonTitle: {
    height: 16,
    width: 170,
    marginBottom: 8
  },
  skeletonSubtitle: {
    height: 12,
    width: 120
  },
  skeletonValue: {
    height: 14,
    width: 100
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
