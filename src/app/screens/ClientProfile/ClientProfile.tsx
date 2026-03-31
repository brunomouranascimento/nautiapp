import React from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'

const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return ''
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
    return ''
  }

  return date.toLocaleDateString('pt-BR')
}

const formatCpf = (value: string | number | null | undefined) =>
  String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

const formatPhone = (value: string | number | null | undefined) => {
  const digits = String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11)

  if (!digits) {
    return ''
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

const getMainPhone = (phones: any[] | undefined) =>
  phones?.find(phone => phone?.major || phone?.main || phone?.principal)
    ?.connection ||
  phones?.[0]?.connection ||
  phones?.[0]?.number ||
  ''

const formatGender = (value: string | null | undefined) => {
  if (!value) {
    return ''
  }

  const normalizedValue = value.toUpperCase()

  if (normalizedValue === 'M') {
    return 'Masculino'
  }

  if (normalizedValue === 'F') {
    return 'Feminino'
  }

  return value
}

export default function ClientProfile() {
  const navigation = useNavigation()
  const route = useRoute()
  const { session } = useAuth()
  const { clientId } = (route.params || {}) as any
  const clientData = session?.clientDetails?.[clientId] || {}
  const person = clientData?.people || {}

  const formValues = {
    name: person?.fullname || '',
    cpf: formatCpf(person?.registrationPf),
    birthDate: formatDate(person?.birth),
    gender: formatGender(person?.gender),
    bloodType: person?.blood || '',
    phone: formatPhone(getMainPhone(person?.phones)),
    email: person?.email || ''
  }

  const Field = ({ label, value, placeholder }: any) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={false}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-outline" size={20} color="#fff" />
          <Text style={styles.sectionText}>PESSOAL</Text>
        </View>
        <Field label="Nome" value={formValues.name} placeholder="Nome" />
        <Field label="CPF" value={formValues.cpf} placeholder="CPF" />
        <Field
          label="Data de nascimento"
          value={formValues.birthDate}
          placeholder="Data de nascimento"
        />
        <Field label="Gênero" value={formValues.gender} placeholder="Gênero" />
        <Field
          label="Tipo sanguíneo"
          value={formValues.bloodType}
          placeholder="Tipo sanguíneo"
        />

        <View style={styles.sectionHeader}>
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.sectionText}>CONTATOS</Text>
        </View>
        <Field label="Telefone" value={formValues.phone} placeholder="Telefone" />
        <Field label="E-mail" value={formValues.email} placeholder="E-mail" />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3A4D'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#2E3A4D'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  headerSpacer: {
    width: 24
  },
  scrollContent: {
    padding: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 25,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 5
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },
  fieldContainer: {
    marginBottom: 15
  },
  label: {
    color: '#A0AEC0',
    fontSize: 14,
    marginBottom: 5
  },
  input: {
    backgroundColor: '#4A5A72',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16
  }
})
