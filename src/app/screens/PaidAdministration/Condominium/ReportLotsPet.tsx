import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Image
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'

const TYPES = ['Cachorro', 'Gato', 'Ave', 'Outro']

export default function ReportLostPetScreen() {
  const navigation: any = useNavigation()
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')
  const [modal, setModal] = useState(false)
  const [photoUri, setPhotoUri] = useState<string>('')

  async function choose(from: 'camera' | 'gallery') {
    const perm =
      from === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (perm.status !== 'granted') return
    const res =
      from === 'camera'
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8
          })
    if (!res.canceled && res.assets?.[0]?.uri) setPhotoUri(res.assets[0].uri)
  }

  function handleReport() {
    if (!type.trim()) return alert('Selecione um tipo.')
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Reportar pet perdido</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>O que você gostaria de reportar?</Text>

        <Text style={styles.label}>Tipo</Text>
        <TouchableOpacity style={styles.select} onPress={() => setModal(true)}>
          <Text style={styles.selectText}>{type || 'Selecione uma opção'}</Text>
          <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
        </TouchableOpacity>

        <Text style={styles.label}>Observação</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Descreva características, local e horário vistos pela última vez."
          placeholderTextColor="#9AA6B2"
          value={desc}
          onChangeText={setDesc}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Foto (opcional)</Text>
        {photoUri ? (
          <View style={styles.previewRow}>
            <Image source={{ uri: photoUri }} style={styles.preview} />
            <View style={{ flexDirection: 'row', gap: 10, marginLeft: 10 }}>
              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => choose('gallery')}
              >
                <MaterialCommunityIcons
                  name="image-edit-outline"
                  size={18}
                  color="#C9D1D9"
                />
                <Text style={styles.smallBtnText}>Trocar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => setPhotoUri('')}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={18}
                  color="#C9D1D9"
                />
                <Text style={styles.smallBtnText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => choose('camera')}
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={18}
                color="#C9D1D9"
              />
              <Text style={styles.attachText}>Usar câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => choose('gallery')}
            >
              <MaterialCommunityIcons
                name="image-multiple-outline"
                size={18}
                color="#C9D1D9"
              />
              <Text style={styles.attachText}>Galeria</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBar} onPress={handleReport}>
          <Text style={styles.primaryText}>REPORTAR</Text>
        </TouchableOpacity>
      </View>

      {/* Picker tipo */}
      <Modal
        visible={modal}
        transparent
        animationType="fade"
        onRequestClose={() => setModal(false)}
      >
        <View style={modalStyles.modalBackdrop}>
          <View style={modalStyles.modalCard}>
            <Text style={modalStyles.modalTitle}>Selecione o tipo</Text>
            <FlatList
              data={TYPES}
              keyExtractor={i => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={modalStyles.option}
                  onPress={() => {
                    setType(item)
                    setModal(false)
                  }}
                >
                  <Text style={modalStyles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={modalStyles.modalClose}
              onPress={() => setModal(false)}
            >
              <Text style={modalStyles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  title: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  content: { paddingHorizontal: 20, marginTop: 10, paddingBottom: 160 },
  heading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20
  },
  label: { color: '#C9D1D9', marginTop: 8, marginBottom: 8, fontWeight: '600' },
  select: {
    backgroundColor: '#3B4657',
    padding: 14,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectText: { color: '#C9D1D9' },
  textArea: {
    backgroundColor: '#3B4657',
    color: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 140,
    textAlignVertical: 'top'
  },
  // anexos
  previewRow: { flexDirection: 'row', alignItems: 'center' },
  preview: {
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: '#2C3545'
  },
  smallBtn: {
    backgroundColor: '#2C3545',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  smallBtnText: { color: '#C9D1D9', fontWeight: '600' },
  attachBtn: {
    backgroundColor: '#3B4657',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  attachText: { color: '#C9D1D9', fontWeight: '600' },

  footer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  primaryBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryText: { color: '#001A70', fontWeight: '800', letterSpacing: 1 }
})

const modalStyles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: '#1F2738',
    borderRadius: 16,
    padding: 16
  },
  modalTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10
  },
  option: {
    backgroundColor: '#2C3545',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8
  },
  optionText: { color: '#FFFFFF' },
  modalClose: { marginTop: 10, alignSelf: 'center' },
  modalCloseText: { color: '#9AA6B2', fontWeight: '600' }
})
