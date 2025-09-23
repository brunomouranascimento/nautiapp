import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function EmbarcacaoScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Header branco */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1C2431" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Embarcação</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color="#1C2431" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Foto da embarcação */}
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.image}
        />

        {/* Campos */}
        <View style={styles.field}>
          <Text style={styles.label}>Marca</Text>
          <TextInput style={styles.input} editable={false} value="Yamaha" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Modelo</Text>
          <TextInput style={styles.input} editable={false} value="VX 700" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ano</Text>
          <TextInput style={styles.input} editable={false} value="2010" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Registro</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="12345678910"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Horas de navegação</Text>
          <TextInput style={styles.input} editable={false} value="200" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Última revisão</Text>
          <TextInput style={styles.input} editable={false} value="02/10/2022" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Última navegação</Text>
          <TextInput style={styles.input} editable={false} value="02/04/2023" />
        </View>

        {/* Botão Ver Documento */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>VER DOCUMENTO</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Documento */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/vessel_document.jpeg')}
            resizeMode="contain"
          />
        </View>
      </Modal>
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
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24
  },
  field: {
    width: '100%',
    marginBottom: 16
  },
  label: {
    color: '#A0AEC0',
    marginBottom: 6
  },
  input: {
    backgroundColor: '#4A5A72',
    borderRadius: 12,
    padding: 12,
    color: '#fff'
  },
  button: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalClose: {
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

