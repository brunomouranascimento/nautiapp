import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

const REPORT_OPTIONS = [
  'Manutenção elétrica',
  'Manutenção hidráulica',
  'Pintura',
  'Limpeza',
  'Outros'
]

export default function MaintenanceForm() {
  const navigation: any = useNavigation()
  const route = useRoute()
  const maintenance = (route.params as any)?.maintenance

  const [report, setReport] = useState(maintenance?.report || '')
  const [observation, setObservation] = useState(maintenance?.observation || '')
  const [showModal, setShowModal] = useState(false)

  const isEditing = !!maintenance

  const handleSave = () => {
    if (!report.trim()) {
      alert('Selecione um tipo de manutenção.')
      return
    }

    const saved = {
      id: maintenance?.id || String(Date.now()),
      report,
      observation,
      date: new Date(), // salva Date nativo
      status: 'pending' as const // sempre pendente ao criar/editar
    }

    navigation.navigate('Maintenance', { saved })
  }

  const handleCancel = () => {
    if (maintenance?.id) {
      navigation.navigate('Maintenance', { canceledId: maintenance.id })
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Solicitar manutenção</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

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
          placeholder="Descreva, se houver, mais informações sobre a solicitação."
          placeholderTextColor="#9AA6B2"
          value={observation}
          onChangeText={setObservation}
        />
      </View>

      <View style={styles.footer}>
        {isEditing && (
          <TouchableOpacity style={styles.cancelBar} onPress={handleCancel}>
            <Text style={styles.cancelText}>CANCELAR SOLICITAÇÃO</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.saveBar} onPress={handleSave}>
          <Text style={styles.saveText}>REPORTAR</Text>
        </TouchableOpacity>
      </View>

      {/* Modal opções */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Selecione o tipo de manutenção
            </Text>
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
  content: { paddingHorizontal: 20, marginTop: 10 },
  heading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20
  },
  label: { color: '#C9D1D9', marginBottom: 8 },
  select: {
    backgroundColor: '#3B4657',
    padding: 14,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  selectText: { color: '#C9D1D9' },
  textArea: {
    backgroundColor: '#3B4657',
    color: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 120,
    textAlignVertical: 'top'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  cancelBar: {
    backgroundColor: '#B0B4BB',
    paddingVertical: 14,
    alignItems: 'center'
  },
  cancelText: {
    color: '#253069',
    fontWeight: '800',
    letterSpacing: 1
  },
  saveBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  saveText: {
    color: '#001A70',
    fontWeight: '800',
    letterSpacing: 1
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    backgroundColor: '#1F2738',
    width: '100%',
    borderRadius: 16,
    padding: 16
  },
  modalTitle: { color: '#FFFFFF', fontWeight: '700', marginBottom: 10 },
  option: {
    backgroundColor: '#2C3545',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8
  },
  optionText: { color: '#FFFFFF' },
  modalClose: { marginTop: 8, alignSelf: 'center' },
  modalCloseText: { color: '#9AA6B2', fontWeight: '600' }
})

