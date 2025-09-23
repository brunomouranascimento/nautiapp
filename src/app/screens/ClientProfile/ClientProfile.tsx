import React from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ClientProfile() {
  const navigation = useNavigation()

  const Field = ({ label, value }: any) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={false}
        placeholderTextColor="#A0AEC0"
      />
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#1A2A44"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Perfil</Text>
        <Ionicons
          name="close"
          size={24}
          color="#1A2A44"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Seção Pessoal */}
        <View style={styles.sectionHeader}>
          <Ionicons name="person-outline" size={20} color="#fff" />
          <Text style={styles.sectionText}>PESSOAL</Text>
        </View>
        <Field label="Nome" value="Renato Gonçalves" />
        <Field label="CPF" value="123.456.789-10" />
        <Field label="Data de nascimento" value="09/01/1985" />
        <Field label="Gênero" value="não informado" />
        <Field label="Tipo sanguíneo" value="O+" />

        {/* Seção Contatos */}
        <View style={styles.sectionHeader}>
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.sectionText}>CONTATOS</Text>
        </View>
        <Field label="Telefone" value="(51) 98228-7743" />
        <Field label="E-mail" value="renatogs@gmail.com" />
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
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2A44'
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
