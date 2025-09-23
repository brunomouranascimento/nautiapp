import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function RoleSelection() {
  const navigation: any = useNavigation()

  const handlNavigate = (screen: string) => {
    navigation.navigate(screen)
  }

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
  }

  const roles = [
    {
      name: 'ADM MARINA',
      screen: 'MarinaAdministration'
    },
    {
      name: 'OPERADOR',
      screen: 'OperatorAdministration'
    },
    {
      name: 'USUÁRIO PAGO',
      screen: 'PayUser'
    },
    {
      name: 'USUÁRIO FREE',
      screen: 'FreeUser'
    }
  ]
  return (
    <View style={styles.container}>
      {roles.map((role, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => handlNavigate(role.screen)}
        >
          <Text style={styles.buttonText}>
            VISÃO DO {role.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303A4A'
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 25,
    width: '80%'
  },
  logout: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    width: 100,
    marginTop: 40
  },
  logoutText: { fontWeight: 'bold', color: '#2F3A4C' },
  buttonText: { color: '#303A4A', textAlign: 'center', fontWeight: 'bold' }
})

