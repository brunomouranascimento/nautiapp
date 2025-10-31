// screens/PetFormScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  FlatList
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation, useRoute } from '@react-navigation/native'

type Pet = {
  id?: string
  name: string
  alias: string
  age: string
  breed: string
  color: string
  gender: string
  photo?: string
}

const GENDERS = ['Macho', 'Fêmea']
const AGES = [
  'Filhote',
  '1 ano',
  '2 anos',
  '3 anos',
  '4 anos',
  '5 anos',
  '6+ anos'
]

export default function PetFormScreen() {
  const navigation: any = useNavigation()
  const route = useRoute()
  const petParam = (route.params as any)?.pet as Partial<Pet> | undefined
  const isEditing = !!petParam

  const [form, setForm] = useState<Pet>({
    id: petParam?.id,
    name: petParam?.name || '',
    alias: '',
    age: petParam?.age || '',
    breed: petParam?.breed || '',
    color: petParam?.color || '',
    gender: petParam?.gender || '',
    photo: petParam?.photo
  })

  const [showGender, setShowGender] = useState(false)
  const [showAge, setShowAge] = useState(false)

  // Modal de carteira de vacinação (somente foto)
  const [vaccinesModal, setVaccinesModal] = useState(false)
  const [vaccinationPhoto, setVaccinationPhoto] = useState<string | undefined>(
    undefined // se quiser mock em edição, use: isEditing ? 'https://picsum.photos/seed/vacina/200' : undefined
  )

  function onChange<K extends keyof Pet>(key: K, value: Pet[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function choosePhoto(from: 'camera' | 'gallery') {
    const perm =
      from === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (perm.status !== 'granted') {
      alert('Permissão negada.')
      return
    }

    const res =
      from === 'camera'
        ? await ImagePicker.launchCameraAsync({
            quality: 0.8,
            allowsEditing: true
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true
          })

    if (!res.canceled && res.assets?.[0]?.uri) {
      setForm(prev => ({ ...prev, photo: res.assets[0].uri }))
    }
  }

  function handleSave() {
    if (!form.name.trim()) return alert('Informe o nome do pet.')

    const saved = {
      ...form,
      id: form.id || String(Date.now()),
      vaccinationPhoto // envia a foto da carteira junto (se existir)
    }

    navigation.navigate('PetsList', { saved })
  }

  function handleDelete() {
    if (!form.id) return navigation.goBack()
    navigation.navigate('PetsList', { deletedId: form.id })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEditing ? 'Editar pet' : 'Cadastrar pet'}
        </Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Foto do pet */}
      <View style={styles.photoArea}>
        <Image
          source={{
            uri: form.photo || 'https://picsum.photos/seed/petplaceholder/200'
          }}
          style={styles.photo}
        />
        <View style={styles.photoActions}>
          <TouchableOpacity
            style={styles.smallCircle}
            onPress={() => choosePhoto('gallery')}
          >
            <MaterialCommunityIcons
              name="image-outline"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallCircle}
            onPress={() => choosePhoto('camera')}
          >
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulário */}
      <View style={styles.formContent}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o nome do pet"
          placeholderTextColor="#9AA6B2"
          value={form.name}
          onChangeText={t => onChange('name', t)}
        />

        <Text style={styles.label}>Atende por</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o apelido do pet"
          placeholderTextColor="#9AA6B2"
          value={form.alias}
          onChangeText={t => onChange('alias', t)}
        />

        <Text style={styles.label}>Idade</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowAge(true)}
        >
          <Text style={styles.selectText}>
            {form.age || 'Informe a idade aproximada do pet'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
        </TouchableOpacity>

        <Text style={styles.label}>Raça</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a raça do pet"
          placeholderTextColor="#9AA6B2"
          value={form.breed}
          onChangeText={t => onChange('breed', t)}
        />

        <Text style={styles.label}>Cor</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a cor do pet"
          placeholderTextColor="#9AA6B2"
          value={form.color}
          onChangeText={t => onChange('color', t)}
        />

        <Text style={styles.label}>Sexo</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowGender(true)}
        >
          <Text style={styles.selectText}>
            {form.gender || 'Informe o sexo do pet'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
        </TouchableOpacity>

        {/* Botão Carteira de Vacinação (abre modal de upload/preview) */}
        <TouchableOpacity
          style={styles.roundedGhost}
          onPress={() => setVaccinesModal(true)}
        >
          <Ionicons name="camera" size={16} color="#fff" />
          <Text style={styles.roundedGhostText}>
            {vaccinationPhoto
              ? 'VER CARTEIRA DE VACINAÇÃO'
              : 'INCLUIR CARTEIRA DE VACINAÇÃO'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé fixo */}
      <View style={styles.footer}>
        {isEditing && (
          <TouchableOpacity style={styles.secondaryBar} onPress={handleDelete}>
            <Text style={styles.secondaryText}>EXCLUIR PET</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.primaryBar} onPress={handleSave}>
          <Text style={styles.primaryText}>SALVAR</Text>
        </TouchableOpacity>
      </View>

      {/* Picker Idade */}
      <SimplePicker
        visible={showAge}
        title="Selecione a idade"
        options={AGES}
        onClose={() => setShowAge(false)}
        onSelect={v => {
          onChange('age', v)
          setShowAge(false)
        }}
      />

      {/* Picker Sexo */}
      <SimplePicker
        visible={showGender}
        title="Selecione o sexo"
        options={GENDERS}
        onClose={() => setShowGender(false)}
        onSelect={v => {
          onChange('gender', v)
          setShowGender(false)
        }}
      />

      {/* Modal de Carteira de Vacinação (anexo único) */}
      <VaccinationModal
        visible={vaccinesModal}
        onClose={() => setVaccinesModal(false)}
        photoUri={vaccinationPhoto}
        onChange={uri => setVaccinationPhoto(uri)}
      />
    </View>
  )
}

/* ========== Componentes auxiliares ========== */

function SimplePicker({
  visible,
  title,
  options,
  onClose,
  onSelect
}: {
  visible: boolean
  title: string
  options: string[]
  onClose: () => void
  onSelect: (v: string) => void
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={m.modalBackdrop}>
        <View style={m.modalCard}>
          <Text style={m.modalTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={i => i}
            renderItem={({ item }) => (
              <TouchableOpacity style={m.option} onPress={() => onSelect(item)}>
                <Text style={m.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
          <TouchableOpacity style={m.modalClose} onPress={onClose}>
            <Text style={m.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

function VaccinationModal({
  visible,
  onClose,
  photoUri,
  onChange
}: {
  visible: boolean
  onClose: () => void
  photoUri?: string
  onChange: (uri?: string) => void
}) {
  async function ensurePermissions(kind: 'camera' | 'media') {
    if (kind === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      return status === 'granted'
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    return status === 'granted'
  }

  async function takePhoto() {
    const ok = await ensurePermissions('camera')
    if (!ok) return alert('Permissão de câmera negada.')
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8
    })
    if (!res.canceled && res.assets?.[0]?.uri) onChange(res.assets[0].uri)
  }

  async function pickFromGallery() {
    const ok = await ensurePermissions('media')
    if (!ok) return alert('Permissão da galeria negada.')
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })
    if (!res.canceled && res.assets?.[0]?.uri) onChange(res.assets[0].uri)
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={m.modalBackdrop}>
        <View style={[m.modalCard, { maxHeight: '80%' }]}>
          <Text style={m.modalTitle}>Carteira de vacinação</Text>

          {photoUri ? (
            <>
              <Image source={{ uri: photoUri }} style={v.preview} />
              <View style={v.previewActions}>
                <TouchableOpacity
                  style={v.secondaryBtn}
                  onPress={pickFromGallery}
                >
                  <MaterialCommunityIcons
                    name="image-edit-outline"
                    size={18}
                    color="#C9D1D9"
                  />
                  <Text style={v.secondaryText}>Trocar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={v.secondaryBtn} onPress={takePhoto}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={18}
                    color="#C9D1D9"
                  />
                  <Text style={v.secondaryText}>Tirar nova</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={v.secondaryBtn}
                  onPress={() => onChange(undefined)}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color="#C9D1D9"
                  />
                  <Text style={v.secondaryText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={{ color: '#C9D1D9', marginBottom: 12 }}>
                Nenhuma carteira anexada.
              </Text>
              <TouchableOpacity style={v.uploadBtn} onPress={takePhoto}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={v.uploadText}>Usar câmera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={v.uploadBtn} onPress={pickFromGallery}>
                <MaterialCommunityIcons
                  name="image-multiple-outline"
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={v.uploadText}>Escolher da galeria</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={m.modalClose} onPress={onClose}>
            <Text style={m.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

/* ========== Styles ========== */
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

  photoArea: { alignItems: 'center', marginTop: 10 },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3B4657'
  },
  photoActions: {
    position: 'absolute',
    bottom: -6,
    flexDirection: 'row',
    gap: 8
  },
  smallCircle: {
    backgroundColor: '#2C3545',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },

  formContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 150 },
  label: {
    color: '#C9D1D9',
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#3B4657',
    color: '#fff',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  select: {
    backgroundColor: '#3B4657',
    padding: 14,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectText: { color: '#C9D1D9' },

  roundedGhost: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 26,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  roundedGhostText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 1 },

  footer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  secondaryBar: {
    backgroundColor: '#B0B4BB',
    paddingVertical: 14,
    alignItems: 'center'
  },
  secondaryText: { color: '#253069', fontWeight: '800', letterSpacing: 1 },
  primaryBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryText: { color: '#001A70', fontWeight: '800', letterSpacing: 1 }
})

const m = StyleSheet.create({
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
  modalCloseText: { color: '#9AA6B2', fontWeight: '600' }
})

const v = StyleSheet.create({
  preview: {
    width: '100%',
    height: 260,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#2C3545'
  },
  previewActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
    marginBottom: 10
  },
  secondaryBtn: {
    backgroundColor: '#2C3545',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  secondaryText: { color: '#C9D1D9', fontWeight: '600' },
  uploadBtn: {
    backgroundColor: '#3B4657',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
    marginBottom: 8
  },
  uploadText: { color: '#FFFFFF', fontWeight: '600' }
})
