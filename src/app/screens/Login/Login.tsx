import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation: any = useNavigation()

  const handleLogin = () => {
    navigation.navigate('RoleSelection')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/N.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.curve} />

      <View style={styles.form}>
        <Text style={styles.loginTitle}>Login</Text>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#fff"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry
            style={styles.input}
          />
          <Feather name="eye" size={20} color="#ccc" style={styles.iconRight} />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OU</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#303A4A' },
  header: { alignItems: 'center', marginTop: 60, position: 'relative' },
  logo: { height: 350, width: 350 },
  closeButton: { position: 'absolute', top: 0, right: 20 },
  curve: {
    height: 60,
    backgroundColor: '#4E5F78',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginTop: 20
  },
  form: {
    backgroundColor: '#4E5F78',
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  loginTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#303A4A',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 15,
    width: '80%',
    height: 50
  },
  input: { flex: 1, color: '#fff', paddingLeft: 10 },
  icon: { marginRight: 5 },
  iconRight: { marginLeft: 5 },
  forgotPassword: { alignSelf: 'flex-end', marginRight: '10%', marginTop: 10 },
  forgotText: { color: '#fff' },
  loginButton: {
    backgroundColor: '#3366FF',
    borderRadius: 25,
    color: '#fff',
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center',
    marginTop: 20
  },
  loginText: { fontWeight: 'bold', color: '#fff' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%'
  },
  line: { flex: 1, height: 1, backgroundColor: '#fff' },
  orText: { marginHorizontal: 10, color: '#fff' },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center'
  },
  createAccountText: { color: '#fff', fontWeight: 'bold' }
})

