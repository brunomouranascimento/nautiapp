// screens/AccessForm.tsx
import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Platform
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'

type AccessRecord = {
  id?: string
  name: string
  cpf: string
  brand: string
  model: string
  plate: string
  visitDate: string // dd/MM/yyyy
  stayTime: string // e.g. '8 horas'
}

type RouteParams = {
  access?: AccessRecord
}

const BRANDS_MODELS: Record<string, string[]> = {
  Renault: ['Sandero', 'Kwid', 'Duster', 'Captur'],
  Toyota: ['Corolla', 'Yaris', 'Hilux'],
  Volkswagen: ['Gol', 'Polo', 'T-Cross'],
  Fiat: ['Argo', 'Mobi', 'Pulse'],
  BYD: ['Song Plus', 'Yuan Plus', 'Han']
}

const STAY_OPTIONS = [
  '1 hora',
  '2 horas',
  '4 horas',
  '6 horas',
  '8 horas',
  '12 horas',
  '24 horas'
]

export default function AccessForm() {
  const navigation: any = useNavigation()
  const route = useRoute()
  const params = (route.params || {}) as RouteParams
  const isEditing = !!params.access

  const [form, setForm] = useState<AccessRecord>({
    name: params.access?.name || '',
    cpf: params.access?.cpf || '',
    brand: params.access?.brand || '',
    model: params.access?.model || '',
    plate: params.access?.plate || '',
    visitDate: params.access?.visitDate || '',
    stayTime: params.access?.stayTime || ''
  })

  const [showBrandModal, setShowBrandModal] = useState(false)
  const [showModelModal, setShowModelModal] = useState(false)
  const [showStayModal, setShowStayModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const brandList = useMemo(() => Object.keys(BRANDS_MODELS), [])
  const modelList = useMemo(
    () => (form.brand ? BRANDS_MODELS[form.brand] : []),
    [form.brand]
  )

  function onChange<K extends keyof AccessRecord>(
    key: K,
    value: AccessRecord[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (key === 'brand') {
      // reset model ao trocar de marca
      setForm(prev => ({ ...prev, model: '' }))
    }
  }

  function onlyDigits(v: string) {
    return v.replace(/\D+/g, '')
  }

  function formatDate(d: Date) {
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }

  function validate() {
    if (!form.name.trim()) return 'Informe o nome.'
    if (!form.cpf || form.cpf.length < 11) return 'CPF inválido.'
    if (!form.brand) return 'Selecione a marca do veículo.'
    if (!form.model) return 'Selecione o modelo.'
    if (!form.plate || form.plate.length < 6) return 'Informe a placa.'
    if (!form.visitDate) return 'Selecione a data da visita.'
    if (!form.stayTime) return 'Selecione o tempo de permanência.'
    return ''
  }

  // dentro do AccessForm.tsx

  function handleSave() {
    const err = validate()
    if (err) {
      alert(err)
      return
    }
    const payload: AccessRecord = { ...form, id: params.access?.id }
    // Volta para a lista entregando o registro salvo
    navigation.navigate('AccessControl', { saved: payload })
  }

  function confirmCancel() {
    setShowCancelModal(false)
    // Volta informando qual registro foi cancelado
    if (params.access?.id) {
      navigation.navigate('AccessControl', { canceledId: params.access.id })
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Controle de acesso</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <FlatList
        data={[{ key: 'form' }]}
        keyExtractor={i => i.key}
        contentContainerStyle={styles.content}
        renderItem={() => (
          <>
            <Text style={styles.heading}>
              Quem você gostaria de autorizar o acesso?
            </Text>

            {/* Nome */}
            <Text style={styles.label}>Nome</Text>
            <TextInput
              placeholder="Informe o nome"
              placeholderTextColor="#9AA6B2"
              style={styles.input}
              value={form.name}
              onChangeText={t => onChange('name', t)}
              autoCapitalize="words"
              returnKeyType="next"
            />

            {/* CPF */}
            <Text style={styles.label}>CPF</Text>
            <TextInput
              placeholder="Informe apenas números"
              placeholderTextColor="#9AA6B2"
              style={styles.input}
              keyboardType="number-pad"
              value={form.cpf}
              onChangeText={t => onChange('cpf', onlyDigits(t))}
              maxLength={11}
              returnKeyType="done"
            />

            {/* Marca */}
            <Text style={styles.label}>Veículo</Text>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setShowBrandModal(true)}
            >
              <Text style={styles.selectText}>
                {form.brand || 'Selecione a marca do veículo'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
            </TouchableOpacity>

            {/* Modelo */}
            <Text style={styles.label}>Modelo</Text>
            <TouchableOpacity
              style={[styles.select, !form.brand && { opacity: 0.5 }]}
              onPress={() => form.brand && setShowModelModal(true)}
              disabled={!form.brand}
            >
              <Text style={styles.selectText}>
                {form.model || 'Selecione o modelo'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
            </TouchableOpacity>

            {/* Placa */}
            <Text style={styles.label}>Placa</Text>
            <TextInput
              placeholder="Informe a placa do veículo"
              placeholderTextColor="#9AA6B2"
              style={styles.input}
              autoCapitalize="characters"
              value={form.plate}
              onChangeText={t => onChange('plate', t.toUpperCase())}
              maxLength={8}
            />

            {/* Data da visita */}
            <Text style={styles.label}>Data da visita</Text>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setShowDatePicker(true)}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={18}
                  color="#C9D1D9"
                />
                <Text style={styles.selectText}>
                  {form.visitDate || 'Selecione uma data'}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
            </TouchableOpacity>

            {/* Tempo de permanência */}
            <Text style={styles.label}>Tempo de permanência</Text>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setShowStayModal(true)}
            >
              <Text style={styles.selectText}>
                {form.stayTime || 'Selecione o tempo de permanência'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#C9D1D9" />
            </TouchableOpacity>
          </>
        )}
      />

      {/* Barra de ações inferior */}
      {isEditing && (
        <TouchableOpacity
          style={styles.secondaryBar}
          onPress={() => setShowCancelModal(true)}
          activeOpacity={0.9}
        >
          <Text style={styles.secondaryText}>CANCELAR ACESSO</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.primaryBar}
        onPress={handleSave}
        activeOpacity={0.9}
      >
        <Text style={styles.primaryText}>SALVAR</Text>
      </TouchableOpacity>

      {/* Modal Marca */}
      <PickerModal
        visible={showBrandModal}
        title="Selecione a marca"
        options={brandList}
        onClose={() => setShowBrandModal(false)}
        onSelect={v => {
          onChange('brand', v)
          setShowBrandModal(false)
        }}
      />

      {/* Modal Modelo */}
      <PickerModal
        visible={showModelModal}
        title="Selecione o modelo"
        options={modelList}
        onClose={() => setShowModelModal(false)}
        onSelect={v => {
          onChange('model', v)
          setShowModelModal(false)
        }}
      />

      {/* Modal Tempo */}
      <PickerModal
        visible={showStayModal}
        title="Tempo de permanência"
        options={STAY_OPTIONS}
        onClose={() => setShowStayModal(false)}
        onSelect={v => {
          onChange('stayTime', v)
          setShowStayModal(false)
        }}
      />

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={form.visitDate ? parseDate(form.visitDate) : new Date()}
          onChange={(_, date) => {
            if (Platform.OS === 'ios') setShowDatePicker(false)
            if (date) onChange('visitDate', formatDate(date))
          }}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}

      {/* Confirmação de Cancelamento */}
      <Modal transparent visible={showCancelModal} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Cancelar acesso?</Text>
            <Text style={styles.confirmDesc}>
              Esta ação remove a autorização para este visitante.
            </Text>
            <View style={styles.confirmRow}>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: '#2C3545' }]}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.confirmBtnText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: '#D92D20' }]}
                onPress={confirmCancel}
              >
                <Text style={[styles.confirmBtnText, { color: '#fff' }]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

function parseDate(ddmmyyyy: string) {
  const [dd, mm, yy] = ddmmyyyy.split('/').map(v => parseInt(v, 10))
  return new Date(yy, mm - 1, dd)
}

function PickerModal({
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
  onSelect: (value: string) => void
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={i => i}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
  header: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { fontSize: 18, fontWeight: '600', color: '#FFF' },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  heading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 12
  },
  label: {
    color: '#C9D1D9',
    marginTop: 14,
    marginBottom: 8,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#3B4657',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22
  },
  select: {
    backgroundColor: '#3B4657',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectText: { color: '#C9D1D9' },

  secondaryBar: {
    backgroundColor: '#B0B4BB',
    paddingVertical: 14,
    alignItems: 'center'
  },
  secondaryText: {
    color: '#253069',
    fontWeight: '800',
    letterSpacing: 1
  },
  primaryBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryText: {
    color: '#001A70',
    fontWeight: '800',
    letterSpacing: 1
  },

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
  modalClose: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  modalCloseText: { color: '#9AA6B2', fontWeight: '600' },

  confirmCard: {
    width: '100%',
    backgroundColor: '#1F2738',
    borderRadius: 16,
    padding: 18
  },
  confirmTitle: { color: '#fff', fontWeight: '800', fontSize: 18 },
  confirmDesc: { color: '#C9D1D9', marginTop: 8, marginBottom: 14 },
  confirmRow: { flexDirection: 'row', gap: 10 },
  confirmBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center'
  },
  confirmBtnText: { color: '#C9D1D9', fontWeight: '700' }
})

