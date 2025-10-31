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

const REPORT_OPTIONS = [
  'Documento',
  'Chaves',
  'Eletrônico',
  'Vestuário',
  'Acessório',
  'Outros'
]

export default function LostAndFoundForm() {
  const navigation: any = useNavigation()
  const [report, setReport] = useState<string>('')
  const [observation, setObservation] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [attachSheet, setAttachSheet] = useState(false)
  const [photoUri, setPhotoUri] = useState<string>('')

  async function ensurePermissions(kind: 'camera' | 'media') {
    if (kind === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      return status === 'granted'
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    return status === 'granted'
  }

  async function pickFromLibrary() {
    const ok = await ensurePermissions('media')
    if (!ok) return alert('Permissão da galeria negada.')
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8
    })
    if (!res.canceled && res.assets?.[0]?.uri) setPhotoUri(res.assets[0].uri)
    setAttachSheet(false)
  }

  async function takePhoto() {
    const ok = await ensurePermissions('camera')
    if (!ok) return alert('Permissão da câmera negada.')
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8
    })
    if (!res.canceled && res.assets?.[0]?.uri) setPhotoUri(res.assets[0].uri)
    setAttachSheet(false)
  }

  function handleRemovePhoto() {
    setPhotoUri('')
  }

  function handleSave() {
    if (!report.trim()) {
      alert('Selecione uma opção de reporte.')
      return
    }
    // Se quiser enviar de volta:
    // navigation.navigate('PreviousScreen', { lostFound: { report, observation, photoUri }})
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Achados e perdidos</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.heading}>O que você gostaria de reportar?</Text>

        <Text style={styles.label}>Reportar</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.selectText}>
            {report || 'Selecione uma opção'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
        </TouchableOpacity>

        <Text style={styles.label}>Observação</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Descreva, se houver, mais informações sobre o objeto."
          placeholderTextColor="#9AA6B2"
          value={observation}
          onChangeText={setObservation}
        />

        {/* Anexo de foto */}
        <Text style={[styles.label, { marginTop: 14 }]}>Anexo (opcional)</Text>
        {photoUri ? (
          <View style={styles.previewRow}>
            <Image source={{ uri: photoUri }} style={styles.preview} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: '#C9D1D9', marginBottom: 8 }}>
                Foto selecionada
              </Text>
              <View style={styles.previewActions}>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() => setAttachSheet(true)}
                >
                  <MaterialCommunityIcons
                    name="image-edit-outline"
                    size={18}
                    color="#C9D1D9"
                  />
                  <Text style={styles.secondaryBtnText}>Trocar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={handleRemovePhoto}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color="#C9D1D9"
                  />
                  <Text style={styles.secondaryBtnText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.attachBtn}
            onPress={() => setAttachSheet(true)}
          >
            <MaterialCommunityIcons
              name="paperclip"
              size={18}
              color="#C9D1D9"
            />
            <Text style={styles.attachText}>Anexar foto</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Rodapé fixo */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBar} onPress={handleSave}>
          <Text style={styles.saveText}>REPORTAR</Text>
        </TouchableOpacity>
      </View>

      {/* Modal opções de Reportar */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecione o que quer reportar</Text>
            <FlatList
              data={REPORT_OPTIONS}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setReport(item)
                    setShowModal(false)
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sheet de anexar foto */}
      <Modal
        visible={attachSheet}
        transparent
        animationType="fade"
        onRequestClose={() => setAttachSheet(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.attachCard}>
            <Text style={styles.modalTitle}>Adicionar foto</Text>
            <TouchableOpacity style={styles.attachOption} onPress={takePhoto}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.attachOptionText}>Usar câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.attachOption}
              onPress={pickFromLibrary}
            >
              <MaterialCommunityIcons
                name="image-multiple-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.attachOptionText}>Escolher da galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setAttachSheet(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
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
  label: { color: '#C9D1D9', marginBottom: 8, marginTop: 8, fontWeight: '600' },

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
    textAlignVertical: 'top',
    marginTop: 8
  },

  // Anexo
  attachBtn: {
    backgroundColor: '#3B4657',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start'
  },
  attachText: { color: '#C9D1D9', fontWeight: '600' },

  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B4657',
    borderRadius: 14,
    padding: 10
  },
  preview: {
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: '#2C3545'
  },
  previewActions: { flexDirection: 'row', gap: 10 },
  secondaryBtn: {
    backgroundColor: '#2C3545',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  secondaryBtnText: { color: '#C9D1D9', fontWeight: '600' },

  // Footer fixo
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  saveBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  saveText: { color: '#001A70', fontWeight: '800', letterSpacing: 1 },

  // Modais
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
    borderRadius: 10
  },
  optionText: { color: '#FFFFFF' },
  modalClose: { marginTop: 10, alignSelf: 'center' },
  modalCloseText: { color: '#9AA6B2', fontWeight: '600' },

  attachCard: {
    width: '100%',
    backgroundColor: '#1F2738',
    borderRadius: 16,
    padding: 16,
    gap: 8
  },
  attachOption: {
    backgroundColor: '#2C3545',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  attachOptionText: { color: '#FFFFFF', fontWeight: '600' }
})
