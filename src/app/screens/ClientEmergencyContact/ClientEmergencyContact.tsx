import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ClientEmergencyContact() {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

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
        <Text style={styles.headerText}>Contato de emergência</Text>
        <Ionicons
          name="close"
          size={24}
          color="#1A2A44"
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Campos */}
      <View style={styles.content}>
        <Field label="Nome" value="Não informado" disabled />
        <Field label="Telefone" value="Não informado" disabled />
      </View>
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
  content: {
    flex: 1,
    padding: 20
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
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10
  },
  documentImage: {
    width: '90%',
    height: '80%'
  }
})

