import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather
} from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'

export default function Profile() {
  const { session, setSession } = useAuth()
  const user = session?.user
  const marina = session?.marina
  const avatarBase64 = user?.avatar || session?.avatar
  const avatarUri = avatarBase64
    ? avatarBase64.startsWith('data:image')
      ? avatarBase64
      : `data:image/png;base64,${avatarBase64}`
    : null
  const formatCpf = (value: string | number | null | undefined) =>
    String(value || '')
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  const formatDate = (value: string | null | undefined) => {
    if (!value) {
      return ''
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return value
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return value
    }

    return date.toLocaleDateString('pt-BR')
  }
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

    const street = (
      address.street ||
      address.address ||
      address.publicPlace ||
      address.place ||
      address.addressLine ||
      ''
    ).trim()
    const number = String(address.number || '').trim()
    const complement = String(address.complement || '').trim()
    const neighborhood = String(
      address.neighborhood || address.district || ''
    ).trim()
    const city = String(address.city || '').trim()
    const state = String(address.state || address.uf || '').trim()

    const streetLine = [street, number, complement].filter(Boolean).join(' ')
    const regionLine = [
      neighborhood ? `, ${neighborhood}` : '',
      city || state ? ` - ${[city, state].filter(Boolean).join('/')}` : ''
    ]
      .filter(Boolean)
      .join('')

    return `${streetLine}${regionLine}`.trim()
  }
  const formatZipCode = (value: string | number | null | undefined) =>
    String(value || '')
      .replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, '$1-$2')
  const formatCnpj = (value: string | number | null | undefined) =>
    String(value || '')
      .replace(/\D/g, '')
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')

  const [nome, setNome] = useState('João da Silva Xavier')
  const [cpf, setCpf] = useState('123.456.789-10')
  const [nascimento, setNascimento] = useState('')
  const [razaoSocial, setRazaoSocial] = useState(
    'Marina para embarcações do Lago 123'
  )
  const [nomeFantasia, setNomeFantasia] = useState('Marina do Lago 123')
  const [cnpj, setCnpj] = useState('01.234.567/0001-10')
  const [site, setSite] = useState('http://www.marinadolago123.com.br')
  const [telefone, setTelefone] = useState('(51) 3589-2732')
  const [email, setEmail] = useState('marinadolago@gmail.com')
  const [cep, setCep] = useState('91911-123')
  const [endereco, setEndereco] = useState(
    'Av. do Forte 380, Ipanema - Porto Alegre/RS'
  )

  const navigation: any = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true

      const loadMarina = async () => {
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
        }
      }

      loadMarina()

      return () => {
        isActive = false
      }
    }, [setSession])
  )

  useEffect(() => {
    setNome(
      user?.name || user?.fullName || user?.username || session?.username || ''
    )
    setCpf(formatCpf(user?.registrationPf))
    setNascimento(
      formatDate(
        user?.birthDate || user?.dateBirth || user?.birthday || user?.bornAt
      )
    )
    setTelefone(
      formatPhone(
        user?.phones?.[0]?.connection || user?.mobilePhone || user?.cellPhone
      )
    )
    setEmail(user?.email || session?.email || '')
    setCep(
      formatZipCode(
        user?.adresses?.[0]?.address?.zipcode ||
          user?.adresses?.[0]?.address?.postalCode ||
          user?.adresses?.[0]?.address?.cep
      )
    )
    setEndereco(formatAddress(user?.adresses?.[0]?.address))
    setRazaoSocial(marina?.socialReason || '')
    setNomeFantasia(marina?.fantasy || '')
    setCnpj(formatCnpj(marina?.registrationPj))
    setSite(marina?.site || '')
  }, [session])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Editar perfil</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={
            avatarUri
              ? { uri: avatarUri }
              : require('../../assets/splash-icon.png')
          }
          style={styles.avatar}
        />
        <View style={styles.editIcon}>
          <Feather name="image" size={20} color="#1B1B4D" />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <FontAwesome5 name="user" size={16} color="white" />
        <Text style={styles.sectionTitle}> PESSOAL</Text>
      </View>

      <Text style={styles.inputTitle}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="CPF"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>Data de nascimento</Text>
      <TextInput
        style={styles.input}
        value={nascimento}
        onChangeText={setNascimento}
        placeholder="Data de nascimento"
        placeholderTextColor="#ccc"
      />

      <View style={styles.sectionHeader}>
        <MaterialIcons name="sailing" size={20} color="white" />
        <Text style={styles.sectionTitle}> EMPRESA</Text>
      </View>
      <Text style={styles.inputTitle}>Razão Social</Text>

      <TextInput
        style={styles.input}
        value={razaoSocial}
        onChangeText={setRazaoSocial}
        placeholder="Razão Social"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>Nome Fantasia</Text>

      <TextInput
        style={styles.input}
        value={nomeFantasia}
        onChangeText={setNomeFantasia}
        placeholder="Nome Fantasia"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>CNPJ</Text>

      <TextInput
        style={styles.input}
        value={cnpj}
        onChangeText={setCnpj}
        placeholder="CNPJ"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>Site</Text>

      <TextInput
        style={styles.input}
        value={site}
        onChangeText={setSite}
        placeholder="Site"
        placeholderTextColor="#ccc"
      />

      <View style={styles.sectionHeader}>
        <Feather name="phone" size={18} color="white" />
        <Text style={styles.sectionTitle}> CONTATOS</Text>
      </View>
      <Text style={styles.inputTitle}>Telefone</Text>

      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={value => setTelefone(formatPhone(value))}
        placeholder="Telefone"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>E-mail</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor="#ccc"
      />

      <View style={styles.sectionHeader}>
        <Feather name="map-pin" size={18} color="white" />
        <Text style={styles.sectionTitle}> ENDEREÇO</Text>
      </View>
      <Text style={styles.inputTitle}>CEP</Text>

      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        placeholder="CEP"
        placeholderTextColor="#ccc"
      />
      <Text style={styles.inputTitle}>Endereço</Text>

      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço"
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.saveText}>SALVAR</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3441',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 35
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 130,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  sectionTitle: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  inputTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10
  },
  input: {
    backgroundColor: '#4E6077',
    color: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 10,
    fontSize: 15
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
    color: '#1B1B4D',
    fontWeight: 'bold'
  }
})

