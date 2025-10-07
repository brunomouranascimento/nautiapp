import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Item = {
  id: string
  titulo: string
  modelo: string
  status: 'PROXIMO' | 'AGUARDANDO'
  confirmarPronto?: boolean
}

// depois
const initialItems: Item[] = [
  {
    id: '1',
    titulo: 'Tormenta dos Mares',
    modelo: 'Yamaha XC 700',
    status: 'PROXIMO'
  },
  {
    id: '2',
    titulo: 'Tormenta dos Mares II',
    modelo: 'Yamaha XC 700',
    status: 'AGUARDANDO'
  },
  {
    id: '3',
    titulo: 'Tormenta dos Mares III',
    modelo: 'Yamaha XC 700',
    status: 'AGUARDANDO'
  }
]

export default function OperatorServices() {
  const navigation: any = useNavigation()

  const [items, setItems] = useState(initialItems)

  const [modalVisible, setModalVisible] = useState(false)
  const [litros, setLitros] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleAbrirModal = (id: string) => {
    setSelectedId(id)
    setLitros('')
    setModalVisible(true)
  }

  const handleConfirmarLitros = () => {
    if (!selectedId) return
    setItems((prev: any[]) =>
      prev.map((it: any) =>
        it.id === selectedId ? { ...it, confirmarPronto: true } : it
      )
    )
    setModalVisible(false)
  }

  const handleFinalizar = (id: string) => {
    setItems((prev: any[]) => prev.filter((it: { id: string }) => it.id !== id))
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Abastecimento</Text>
        <View style={{ width: 22 }} />
        {/* espaçamento p/ manter centralização */}
      </View>

      {/* Subheader */}
      <View style={styles.subHeader}>
        <MaterialCommunityIcons name="water" size={16} color="#AFC3E2" />
        <Text style={styles.subHeaderText}>FILA DE ABASTECIMENTO</Text>
      </View>
      <View style={styles.subDivider} />

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {items.map((item: any) => (
          <View key={item.id} style={styles.card}>
            {/* Pill */}
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {item.status === 'PROXIMO' ? 'PRÓXIMO DA FILA' : 'AGUARDANDO'}
              </Text>
              <MaterialCommunityIcons
                name={
                  item.status === 'PROXIMO' ? 'arrow-up-down' : 'arrow-down'
                }
                size={18}
                color={item.status === 'PROXIMO' ? '#39E177' : '#FFC43D'}
              />
            </View>

            {/* Bloco título */}
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.subtitle}>{item.modelo}</Text>
            </View>

            {/* Botões */}
            {item.status === 'PROXIMO' && (
              <>
                {!item.confirmarPronto ? (
                  <TouchableOpacity
                    style={styles.btnPrimary}
                    onPress={() => handleAbrirModal(item.id)}
                  >
                    <Text style={styles.btnPrimaryText}>ABASTECER AGORA</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnFinalizar}
                    onPress={() => handleFinalizar(item.id)}
                    // activeOpacity={0.85}
                  >
                    <Text style={styles.btnFinalizarText}>
                      FINALIZAR ABASTECIMENTO
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Quantos litros foram abastecidos?
            </Text>

            <View style={styles.modalInputWrap}>
              <TextInput
                keyboardType="numeric"
                placeholder="Informe a quantidade de litros"
                placeholderTextColor="#C6D2E1"
                value={litros}
                onChangeText={setLitros}
                style={styles.modalInput}
              />
            </View>

            <TouchableOpacity
              style={styles.modalConfirm}
              onPress={handleConfirmarLitros}
              activeOpacity={0.9}
            >
              <Text style={styles.modalConfirmText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const c = {
  bg: '#1D2635',
  card: '#202E4A',
  label: '#AFC3E2',
  text: '#FFFFFF',
  pill: '#2C3E55',
  titleBox: '#3F506B',
  primary: '#FFFFFF',
  primaryText: '#0E1A2B',
  divider: '#5E6C83'
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50
  },
  headerTitle: { color: c.text, fontSize: 18, fontWeight: '600' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4
  },
  subHeaderText: {
    color: c.label,
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center'
  },
  subDivider: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: c.divider,
    opacity: 0.35,
    marginTop: 6,
    marginBottom: 10
  },

  listContainer: { padding: 16, paddingBottom: 40 },

  card: {
    backgroundColor: '#202E4A',
    borderRadius: 14,
    padding: 12,
    marginBottom: 18
  },
  pill: {
    backgroundColor: c.pill,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pillText: { color: c.label, fontWeight: '800' },

  titleBox: {
    backgroundColor: c.titleBox,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 10,
    marginBottom: 8
  },
  title: { color: c.text, fontWeight: '700', fontSize: 16 },
  subtitle: { color: '#B5C2D6', fontSize: 12, marginTop: 2 },

  btnPrimary: {
    backgroundColor: c.primary,
    borderRadius: 26,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8
  },
  btnPrimaryText: {
    color: c.primaryText,
    fontWeight: '800',
    letterSpacing: 0.5
  },

  btnFinalizar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8
  },
  btnFinalizarText: { color: '#0E1A2B', fontWeight: '800', letterSpacing: 0.4 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: c.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  modalClose: { position: 'absolute', right: 16, top: 16 },
  modalTitle: {
    color: c.text,
    fontWeight: '800',
    fontSize: 18,
    marginTop: 12,
    textAlign: 'center'
  },
  modalInputWrap: {
    backgroundColor: '#2C3E55',
    borderRadius: 24,
    marginTop: 18,
    paddingHorizontal: 16
  },
  modalInput: {
    color: c.text,
    paddingVertical: 12,
    fontSize: 15,
    textAlign: 'center'
  },
  modalConfirm: {
    backgroundColor: c.primary,
    borderRadius: 26,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14
  },
  modalConfirmText: {
    color: c.primaryText,
    fontWeight: '800',
    letterSpacing: 0.5
  }
})

