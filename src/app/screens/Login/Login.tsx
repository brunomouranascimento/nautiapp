import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Video, ResizeMode } from 'expo-av'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginScreen() {
  const navigation: any = useNavigation()
  const { setSession } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const trimmedUsername = username.trim()
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedUsername)
  const isValidPassword = password.trim().length >= 3
  const isLoginDisabled = !isValidEmail || !isValidPassword || isLoading

  const handleLogin = async () => {
    if (!trimmedUsername || !password.trim()) {
      setErrorMessage('Preencha e-mail e senha.')
      return
    }

    if (!isValidEmail) {
      setErrorMessage('Informe um e-mail valido.')
      return
    }

    if (!isValidPassword) {
      setErrorMessage('A senha deve ter no minimo 3 caracteres.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const response: any = await fetch(
        'https://hml-ntssso.nautisystem.com/signin',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'pt-BR,pt;q=0.9',
            lang: 'pt-BR',
            locale: 'pt-BR'
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
            ip: '1.1.1.1'
          })
        }
      )

      const responseText = await response.text()
      let responseData: any = null

      if (responseText) {
        try {
          responseData = JSON.parse(responseText)
        } catch {
          responseData = responseText
        }
      }

      if (!response.ok) {
        const serviceMessage =
          responseData?.message ||
          responseData?.error ||
          'Nao foi possivel fazer login.'

        Alert.alert(serviceMessage)
        return
      }
      if (responseData?.success) {
        setSession(responseData.object)
        navigation.navigate('RoleSelection')
      } else {
        Alert.alert(
          'Erro',
          responseData?.message || 'Nao  aaa foi possivel fazer login.'
        )
      }
    } catch (error) {
      setErrorMessage('Falha ao conectar com o serviço de login.')
      Alert.alert('Erro', 'Falha ao conectar com o serviço de login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/login-video-2.mp4')}
        style={styles.fullscreenVideo}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted
      />
      <View style={styles.fullscreenOverlay} />

      <View style={styles.header}>
        <Image
          source={require('../../assets/N.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/logoname_high_resolution.png')}
          style={styles.logoName}
          resizeMode="contain"
        />
      </View>

      {/* <View style={styles.curve} /> */}

      <View style={styles.form}>
        <Text style={styles.loginTitle}>Login</Text>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#fff"
            style={styles.input}
            value={username}
            onChangeText={value => {
              setUsername(value)
              if (errorMessage) {
                setErrorMessage('')
              }
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
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
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={value => {
              setPassword(value)
              if (errorMessage) {
                setErrorMessage('')
              }
            }}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(current => !current)}
            disabled={isLoading}
          >
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#ccc"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.loginButton,
            isLoginDisabled && styles.loginButtonDisabled
          ]}
          disabled={isLoginDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
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
  container: { flex: 1, backgroundColor: '#000' },
  fullscreenVideo: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    height: '70%'
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 350,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  logo: { height: 250, width: 250, zIndex: 2, marginTop: -50 },
  logoName: { height: 100, width: 200, zIndex: 2, marginTop: -100 },
  curve: {
    height: 60,
    backgroundColor: '#4E5F78',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginTop: 50
  },
  form: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: '#4E5F78',
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    zIndex: 2,
    position: 'relative',
    bottom: 0
  },
  loginTitle: {
    marginTop: 20,
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
  errorText: {
    width: '80%',
    color: '#FFD6D6',
    marginTop: 12
  },
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
  loginButtonDisabled: {
    opacity: 0.7
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

