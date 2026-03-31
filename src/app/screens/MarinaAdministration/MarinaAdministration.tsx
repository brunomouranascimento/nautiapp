import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'

export default function MarinaAdministration() {
  const navigation: any = useNavigation()
  const { session, setSession } = useAuth()
  const [isLoadingMarina, setIsLoadingMarina] = React.useState(false)
  const [hasLoadedMarina, setHasLoadedMarina] = React.useState(false)
  const username = session?.username || 'Usuário'
  const administratorName = session?.username || '--'
  const marina = session?.marina
  const showMarinaSkeleton = isLoadingMarina && !marina
  const marinaName = marina?.fantasy || marina?.socialReason || 'Marina'
  const marinaDocument = String(marina?.registrationPj || '')
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')

  useFocusEffect(
    React.useCallback(() => {
      if (marina) {
        setIsLoadingMarina(false)
        setHasLoadedMarina(true)

        return
      }

      let isActive = true

      const loadMarina = async () => {
        setIsLoadingMarina(true)

        try {
          const response = await fetch(
            'https://hml-ntslcl.nautisystem.com/partner/1',
            {
              headers: {
                Accept: 'application/json',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                lang: 'pt-BR',
                locale: 'pt-BR',
                'x-access-token': session?.authorization || ''
              }
            }
          )

          if (!response.ok) {
            return
          }

          const responseText = await response.text()
          const responseData = responseText ? JSON.parse(responseText) : null
          const company = responseData?.object?.company

          if (!isActive || !company) {
            return
          }

          setSession(currentSession => ({
            ...(currentSession || {}),
            marina: company
          }))
        } catch {
          // Mantém os dados atuais se a request falhar.
        } finally {
          if (!isActive) {
            return
          }

          setIsLoadingMarina(false)
          setHasLoadedMarina(true)
        }
      }

      loadMarina()

      return () => {
        isActive = false
      }
    }, [marina, session?.authorization, setSession])
  )

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

      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo {username}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={require('../../assets/splash-icon.png')}
            style={styles.marinaImage}
          />
          <View style={styles.cardHeaderContent}>
            {showMarinaSkeleton ? (
              <>
                <View style={[styles.skeletonLine, styles.skeletonTitle]} />
                <View style={[styles.skeletonLine, styles.skeletonSubtitle]} />
              </>
            ) : marina ? (
              <>
                <Text style={styles.marinaName}>{marinaName}</Text>
                <Text style={styles.marinaCnpj}>{marinaDocument || '--'}</Text>
              </>
            ) : (
              <>
                <Text style={styles.marinaName}>Marina indisponível</Text>
                <Text style={styles.marinaCnpj}>
                  {hasLoadedMarina
                    ? 'Não foi possível carregar os dados.'
                    : '--'}
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => handleNavigate('Profile')}
          >
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {showMarinaSkeleton ? (
          <>
            <View style={styles.cardRow}>
              <Feather name="user" color="#fff" size={16} />
              <Text style={styles.label}>Administrador</Text>
              <View style={[styles.skeletonLine, styles.skeletonValue]} />
            </View>
            <View style={styles.cardRow}>
              <Feather name="calendar" color="#fff" size={16} />
              <Text style={styles.label}>Nascimento</Text>
              <View style={[styles.skeletonLine, styles.skeletonValueSmall]} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.cardRow}>
              <Feather name="user" color="#fff" size={16} />
              <Text style={styles.label}>Administrador</Text>
              <Text style={styles.value}>{administratorName}</Text>
            </View>
            <View style={styles.cardRow}>
              <Feather name="calendar" color="#fff" size={16} />
              <Text style={styles.label}>Nascimento</Text>
              <Text style={styles.value}>01/02/1985</Text>
            </View>
          </>
        )}
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
          onPress={() => handleNavigate('Employees')}
        >
          <FontAwesome5
            name="users"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Funcionários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate('Clients')}
        >
          <FontAwesome5
            name="user-friends"
            size={24}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.buttonText}>Clientes</Text>
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
  cardHeaderContent: {
    flex: 1
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
  skeletonLine: {
    backgroundColor: '#55627C',
    borderRadius: 999
  },
  skeletonTitle: {
    height: 16,
    width: 150,
    marginBottom: 8
  },
  skeletonSubtitle: {
    height: 12,
    width: 120
  },
  skeletonValue: {
    height: 14,
    width: 110
  },
  skeletonValueSmall: {
    height: 14,
    width: 80
  },
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
