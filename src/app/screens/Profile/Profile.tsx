import React, { useState } from 'react'
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
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
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
          source={require('../../assets/splash-icon.png')}
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
        onChangeText={setTelefone}
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

