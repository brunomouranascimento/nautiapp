import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Svg, { Path } from 'react-native-svg'

export default function MyMarinaScreen() {
  const navigation = useNavigation<any>()

  const [uf, setUf] = useState('RS')
  const [cidade, setCidade] = useState('Porto Alegre')
  const [marina, setMarina] = useState('Marina do Forte 123')
  const [endereco, setEndereco] = useState('Av. do Forte 281')
  const [telefone, setTelefone] = useState('(51) 3289–4523')
  const [site, setSite] = useState('http://www.marinadolago123.com.br')
  const [lat, setLat] = useState('-30.5500')
  const [lng, setLng] = useState('-30.5500')

  const goBack = () => navigation.goBack()

  const openGps = () => {
    navigation.navigate('NavigateToMarina', {
      lat: Number(String(lat).replace(',', '.')),
      lng: Number(String(lng).replace(',', '.')),
      label: marina,
      address: `${endereco} - ${cidade}/${uf}`
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.headerIcon}
        >
          <ChevronLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Minha Marina</Text>
        <Pressable
          onPress={() => navigation.popToTop()}
          hitSlop={10}
          style={styles.headerIcon}
        ></Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar + botão aviãozinho */}
          <View style={styles.avatarRow}>
            <Image
              source={require('../../../assets/splash-icon.png')}
              style={styles.avatar}
            />
          </View>

          <Field label="UF">
            <Select value={uf} onPress={() => setUf(uf)} />
          </Field>

          <Field label="Cidade">
            <Select value={cidade} onPress={() => setCidade(cidade)} />
          </Field>

          <Field label="Marina">
            <Select value={marina} onPress={() => setMarina(marina)} />
          </Field>

          <Field label="Endereço">
            <Input value={endereco} onChangeText={setEndereco} />
          </Field>

          <Field label="Telefone">
            <Input
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </Field>

          <Field label="Site">
            <Input value={site} onChangeText={setSite} autoCapitalize="none" />
          </Field>

          <View style={styles.row2}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Field label="Latitude">
                <Input
                  value={lat}
                  onChangeText={setLat}
                  keyboardType="numbers-and-punctuation"
                />
              </Field>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Field label="Longitude">
                <Input
                  value={lng}
                  onChangeText={setLng}
                  keyboardType="numbers-and-punctuation"
                />
              </Field>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Botões fixos */}
        <View style={styles.footer}>
          <Pressable style={styles.navButton} onPress={openGps}>
            <Text style={styles.navButtonText}>NAVEGAR ATÉ MARINA</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={goBack}>
            <Text style={styles.saveButtonText}>SALVAR</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

/** ---------- Subcomponentes ---------- */
function Field({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  )
}
function Select({ value, onPress }: { value: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.input}>
      <Text style={styles.inputText}>{value}</Text>
      <ChevronDown />
    </Pressable>
  )
}
function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.input}>
      <TextInput
        {...props}
        style={styles.textInput}
        placeholderTextColor="rgba(255,255,255,0.6)"
      />
    </View>
  )
}

/** ---------- Ícones SVG ---------- */
function ChevronLeft({ color = '#FFFFFF' }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
function CloseIcon({ color = '#FFFFFF' }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
function ChevronDown() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M6 9l6 6 6-6"
        stroke="#D6DEE9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
function PaperPlane() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M22 2L11 13"
        stroke="#2C3545"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M22 2l-7 20-4-9-9-4 20-7z"
        fill="none"
        stroke="#2C3545"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

/** ---------- Estilos ---------- */
const BG = '#2C3545'
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    marginTop: 50,
    paddingHorizontal: 16,
    height:
      64 + (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700'
  },

  content: { padding: 16, paddingBottom: 24 },
  avatarRow: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12
  },
  avatar: { width: 140, height: 140, borderRadius: 70, overflow: 'hidden' },
  label: { color: '#C7D1E2', fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: '#3E4B60',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  textInput: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', padding: 0 },
  row2: { flexDirection: 'row' },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  navButton: {
    backgroundColor: '#A6A6A6',
    paddingVertical: 16,
    alignItems: 'center'
  },
  navButtonText: { color: '#2C3545', fontWeight: '800', letterSpacing: 1 },
  saveButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    alignItems: 'center'
  },
  saveButtonText: { color: '#1F2A44', fontWeight: '800', letterSpacing: 1 }
})

