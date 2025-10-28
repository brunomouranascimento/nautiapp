import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const BG = '#2C3545'
const TEXT = '#E6ECF5'
const MUTED = '#C8D0DF'
const PILL = '#3F4B60'

export default function PaidTrackerAccess() {
  const navigation: any = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Rastreamento',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerTitleStyle: { color: '#2C3545', fontWeight: '700' },
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 8 }}
        >
          <Feather name="arrow-left" size={20} color="#2C3545" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.popToTop?.() ?? navigation.navigate('Home')}
          style={{ padding: 8 }}
        >
          <Feather name="x" size={22} color="#2C3545" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const handleAgree = () => setShowModal(true)

  const handleConfirm = () => {
    // aqui futuramente podemos validar; por agora só fecha
    setShowModal(false)
    // volta para o menu inicial de Embarcações
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Rastreamento</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 120
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headline}>
          Leia atentamente os termos de uso. Em caso de dúvidas entre em contato
          com o suporte.
        </Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          sit amet ipsum id ex vulputate porttitor. Integer volutpat odio at
          massa aliquam mollis eu eu enim. Proin porta nibh sed libero
          condimentum, vitae pretium quam rutrum. Class aptent taciti sociosqu
          ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean
          porttitor leo sed lacus volutpat blandit. Sed aliquet, nisl ac aliquam
          maximus, eros ligula varius turpis, vitae sollicitudin felis velit id
          tortor. Morbi eleifend molestie dolor, eu finibus turpis malesuada
          quis.
        </Text>

        <Text style={styles.paragraph}>
          Nam condimentum justo sit amet magna gravida suscipit vitae ac turpis.
          Donec sapien ligula, posuere eu augue non, laoreet varius odio. Cras
          mollis magna nec erat blandit, eu sodales quam dapibus. Donec non
          libero maximus, tristique nunc et, ultrices mauris. Donec lacinia nisi
          justo, sit amet semper libero sodales vel. Vivamus scelerisque nibh
          justo, sed tempor turpis ornare nec. Praesent dignissim sapien sit
          amet porta feugiat.
        </Text>

        <Text style={styles.paragraph}>
          In nec varius est, nec gravida tellus. Nam a egestas est, eget
          convallis erat. Sed vel tortor facilisis, ultrices lacus a, eleifend
          mauris. Quisque at velit eget nunc condimentum porta. Donec sem neque,
          rutrum vel accumsan id, egestas ac enim. Donec sed porta diam.
          Praesent ac pulvinar mauris. Sed at ante lacus. Aenean urna mi,
          maximus gravida vehicula rhoncus, rhoncus in orci. Ut imperdiet dui
          quis lacus tincidunt tempor.
        </Text>

        <Text style={styles.paragraph}>
          Cras feugiat diam ex, ac hendrerit velit sodales at. Proin id finibus
          tortor. Etiam non luctus elit. Quisque et ligula eu tellus auctor
          ultrices. Phasellus tempor luctus odio, in egestas purus accumsan id.
          Pellentesque vulputate, quam non dictum feugiat, diam felis facilisis
          nulla, nec blandit justo lacus a nunc. Pellentesque semper, ipsum sit
          amet ornare volutpat, magna lacus mollis erat, et bibendum neque nunc
          eget enim.
        </Text>
      </ScrollView>

      {/* Botão fixo de ação */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cta}
          onPress={handleAgree}
        >
          <Text style={styles.ctaText}>LI E CONCORDO</Text>
        </TouchableOpacity>
      </View>

      {/* Modal bottom-sheet */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          />
          <View style={styles.sheet}>
            <TouchableOpacity
              style={styles.closeFab}
              onPress={() => setShowModal(false)}
            >
              <Feather name="x" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.sheetTitle}>Validar cadastro.</Text>
            <Text style={styles.sheetSub}>
              Informe seu usuário e senha da plataforma XXX para vincular o
              serviço ao Nautisystem.
            </Text>

            {/* Campo Usuário */}
            <View style={styles.inputWrap}>
              <TextInput
                value={user}
                onChangeText={setUser}
                placeholder="Usuário"
                placeholderTextColor="#A9B4C7"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* Campo Senha */}
            <View style={styles.inputWrap}>
              <TextInput
                value={pass}
                onChangeText={setPass}
                placeholder="Senha"
                placeholderTextColor="#A9B4C7"
                style={styles.input}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity
                onPress={() => setShowPass(v => !v)}
                style={styles.eyeBtn}
              >
                <Feather
                  name={showPass ? 'eye-off' : 'eye'}
                  size={18}
                  color="#D9DFEA"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.confirmBtn}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 50
  },
  headerTitleName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  headline: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 12
  },
  paragraph: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24
  },
  cta: {
    height: 52,
    borderRadius: 28,
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaText: { color: '#2C3545', fontWeight: '800', letterSpacing: 0.5 },

  // Modal / Bottom sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: BG,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    paddingTop: 24
  },
  closeFab: {
    position: 'absolute',
    right: 16,
    top: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(44,53,69,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6A768C'
  },
  sheetTitle: { color: TEXT, fontSize: 22, fontWeight: '800', marginBottom: 6 },
  sheetSub: { color: MUTED, fontSize: 14, lineHeight: 20, marginBottom: 16 },
  inputWrap: {
    backgroundColor: PILL,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 12
  },
  input: { color: TEXT, fontSize: 15 },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    height: 52,
    justifyContent: 'center'
  },
  confirmBtn: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  confirmText: {
    color: '#2C3545',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5
  }
})

