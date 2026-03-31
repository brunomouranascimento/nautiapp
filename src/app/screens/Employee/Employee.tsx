import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

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

const formatZipCode = (value: string | number | null | undefined) =>
  String(value || '')
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2')

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

const formatAddress = (addressData: any) => {
  const address = Array.isArray(addressData) ? addressData[0] : addressData

  if (!address) {
    return ''
  }

  const baseAddress = address?.address || address
  const street = (
    baseAddress?.street ||
    baseAddress?.address ||
    baseAddress?.publicPlace ||
    baseAddress?.place ||
    baseAddress?.addressLine ||
    ''
  ).trim()
  const number = String(baseAddress?.number || '').trim()
  const complement = String(baseAddress?.complement || '').trim()
  const neighborhood = String(
    baseAddress?.neighborhood || baseAddress?.district || ''
  ).trim()
  const city = String(baseAddress?.city || '').trim()
  const state = String(baseAddress?.state || baseAddress?.uf || '').trim()

  const streetLine = [street, number, complement].filter(Boolean).join(' ')
  const regionLine = [
    neighborhood ? `, ${neighborhood}` : '',
    city || state ? ` - ${[city, state].filter(Boolean).join('/')}` : ''
  ]
    .filter(Boolean)
    .join('')

  return `${streetLine}${regionLine}`.trim()
}

const getMainPhone = (phones: any[] | undefined) =>
  phones?.find(phone => phone?.main || phone?.principal || phone?.priority)?.number ||
  phones?.[0]?.number ||
  phones?.[0]?.connection ||
  ''

const getEmergencyContact = (person: any) => {
  const emergencyPhone =
    person?.emergencyPhone ||
    person?.contactEmergencyPhone ||
    person?.responsiblePhone ||
    ''
  const emergencyName =
    person?.emergencyContact ||
    person?.contactEmergencyName ||
    person?.responsibleName ||
    ''

  return {
    emergencyName,
    emergencyPhone
  }
}

const getPhotoFileName = (imageValue: string | null | undefined) => {
  if (!imageValue) {
    return 'Nenhuma foto enviada'
  }

  const mimeTypeMatch = imageValue.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,/)
  const extension = mimeTypeMatch?.[1]?.replace('jpeg', 'jpg') || 'png'

  return `foto-perfil.${extension}`
}

export default function EditEmployee() {
  const route = useRoute()
  const navigation: any = useNavigation()
  const { employee } = route.params as any
  const rawEmployee = employee?.raw || {}
  const person = rawEmployee?.people || {}
  const address = person?.adresses?.[0]
  const { emergencyName, emergencyPhone } = getEmergencyContact(person)

  const formValues = {
    name: employee?.name || person?.fullname || '',
    cpf: employee?.cpf || formatCpf(person?.registrationPf),
    photoName: getPhotoFileName(person?.image),
    phone: formatPhone(getMainPhone(person?.phones)),
    email: person?.email || '',
    emergencyName,
    emergencyPhone: formatPhone(emergencyPhone),
    zipCode: formatZipCode(
      address?.address?.zipcode || address?.address?.postalCode || address?.address?.cep
    ),
    address: formatAddress(address),
    birthDate: employee?.birthDate || formatDate(person?.birth),
    admissionDate: employee?.admissionDate || formatDate(rawEmployee?.admission),
    credential: employee?.register || rawEmployee?.credential || '',
    role: employee?.role || rawEmployee?.occupation || '',
    employeeType: employee?.employeeType || rawEmployee?.employeeType || ''
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="person" size={18} color="#ccc" />
          <Text style={styles.section}>PESSOAL</Text>
        </View>
        <TextInput
          style={styles.input}
          value={formValues.name}
          placeholder="Nome"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.cpf}
          placeholder="CPF"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.birthDate}
          placeholder="Data de nascimento"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="badge" size={18} color="#ccc" />
          <Text style={styles.section}>VÍNCULO</Text>
        </View>
        <TextInput
          style={styles.input}
          value={formValues.role}
          placeholder="Cargo"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.employeeType}
          placeholder="Tipo de vínculo"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.credential}
          placeholder="Credencial"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.admissionDate}
          placeholder="Admissão"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="phone" size={18} color="#ccc" />
          <Text style={styles.section}>CONTATOS</Text>
        </View>
        <TextInput
          style={styles.input}
          value={formValues.phone}
          placeholder="Telefone"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.email}
          placeholder="E-mail"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="attach-file" size={18} color="#ccc" />
          <Text style={styles.section}>Foto de perfil</Text>
        </View>
        <TextInput
          style={styles.input}
          value={formValues.photoName}
          placeholder="Nome do arquivo"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="report-problem" size={18} color="#ccc" />
          <Text style={styles.section}>EMERGÊNCIA</Text>
        </View>
        <TextInput
          style={styles.input}
          value={formValues.emergencyName}
          placeholder="Nome do contato"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.emergencyPhone}
          placeholder="Telefone do contato"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="location-on" size={18} color="#ccc" />
          <Text style={styles.section}>ENDEREÇO</Text>
        </View>
        <TextInput
          style={styles.input}
          value={formValues.zipCode}
          placeholder="CEP"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={formValues.address}
          placeholder="Endereço"
          placeholderTextColor="#AFC3D9"
          editable={false}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveText}>VOLTAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3444',
    paddingTop: 60
  },
  title: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 40
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
    marginBottom: 8
  },
  section: {
    color: '#ccc',
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#3c4a60',
    color: '#fff',
    padding: 12,
    borderRadius: 25,
    marginBottom: 12
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  saveText: {
    color: '#2c3444',
    fontWeight: 'bold',
    fontSize: 16
  }
})
