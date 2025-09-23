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

export default function EditEmployee() {
  const route = useRoute()
  const navigation: any = useNavigation()
  const { employee } = route.params as any

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
          value={employee.name}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          defaultValue="123.456.789-10"
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="attach-file" size={18} color="#ccc" />
          <Text style={styles.section}>Foto de perfil</Text>
        </View>
        <TextInput style={styles.input} value="anexo01.jpg" editable={false} />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="phone" size={18} color="#ccc" />
          <Text style={styles.section}>CONTATOS</Text>
        </View>
        <TextInput
          style={styles.input}
          value="(51) 98228-7743"
          placeholder="Telefone"
        />
        <TextInput
          style={styles.input}
          value="juliocastilhos@gmail.com"
          placeholder="E-mail"
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="report-problem" size={18} color="#ccc" />
          <Text style={styles.section}>EMERGÊNCIA</Text>
        </View>
        <TextInput
          style={styles.input}
          value="Fulano de Tal"
          placeholder="Nome do contato"
        />
        <TextInput
          style={styles.input}
          value="(51) 98228-7743"
          placeholder="Telefone"
        />

        <View style={styles.sectionHeader}>
          <MaterialIcons name="location-on" size={18} color="#ccc" />
          <Text style={styles.section}>ENDEREÇO</Text>
        </View>
        <TextInput style={styles.input} value="91911-123" placeholder="CEP" />
        <TextInput
          style={styles.input}
          value="Av. do Forte 380, Ipanema - Porto Alegre/RS"
          placeholder="Endereço"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveText}>SALVAR</Text>
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

