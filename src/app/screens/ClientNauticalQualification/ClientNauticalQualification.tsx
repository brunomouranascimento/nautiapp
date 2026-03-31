import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView
} from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'

const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return ''
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value
  }

  const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch

    return `${day}/${month}/${year}`
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString('pt-BR')
}

const normalizeDocumentImage = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  return value.startsWith('data:')
    ? value
    : `data:image/png;base64,${value}`
}

const sanitizeArtifactValue = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  if (value.startsWith('data:image/png;base64,data:application/pdf;base64,')) {
    return value.replace(
      'data:image/png;base64,',
      ''
    )
  }

  if (value.startsWith('data:image/jpeg;base64,data:application/pdf;base64,')) {
    return value.replace(
      'data:image/jpeg;base64,',
      ''
    )
  }

  return value
}

const getDataUriParts = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  const match = value.match(/^data:([^;]+);base64,(.+)$/)

  if (!match) {
    return null
  }

  return {
    mimeType: match[1],
    base64: match[2]
  }
}

const getCategoryLabels = (value: string | null | undefined) => {
  if (!value) {
    return []
  }

  const categoryMap: Record<string, string> = {
    '0': 'ARA - Arrais Amador',
    '1': 'CPA - Capitão Amador',
    '2': 'MSA - Mestre Amador',
    '3': 'MTA - Motonauta',
    '4': 'VLA - Veleiro'
  }

  return value
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => categoryMap[item] || item)
}

export default function NauticalQualification() {
  const navigation = useNavigation()
  const route = useRoute()
  const { session, setSession } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoadingArtifact, setIsLoadingArtifact] = useState(false)
  const { clientId } = (route.params || {}) as any
  const clientData = session?.clientDetails?.[clientId] || {}
  const person = clientData?.people || {}
  const nauticalDocument = person?.documentsNautical?.[0] || {}
  const peopleId = person?.id || clientData?.peopleId
  const artifactCache = session?.clientArtifacts || {}
  const cachedArtifact = artifactCache?.[peopleId]
  const artifactValue = sanitizeArtifactValue(
    cachedArtifact || nauticalDocument?.document
  )
  const documentImage = normalizeDocumentImage(artifactValue)
  const artifactParts = getDataUriParts(artifactValue)
  const isPdfArtifact = artifactParts?.mimeType === 'application/pdf'
  const categoryLabels = getCategoryLabels(nauticalDocument?.category)

  const formValues = {
    enrollment: nauticalDocument?.enrollment || '',
    category: nauticalDocument?.category || '',
    expeditionDate: formatDate(nauticalDocument?.expedition),
    validityDate: formatDate(nauticalDocument?.validity),
    limits: nauticalDocument?.limits || '',
    location: nauticalDocument?.location || '',
    comments: nauticalDocument?.comments || ''
  }

  const Field = ({ label, value, placeholder }: any) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={false}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
      />
    </View>
  )

  const openQualification = async () => {
    if (!peopleId || cachedArtifact) {
      if (isPdfArtifact && artifactParts) {
        const fileUri = `${FileSystem.cacheDirectory}habilitacao-${peopleId}.pdf`

        await FileSystem.writeAsStringAsync(fileUri, artifactParts.base64, {
          encoding: FileSystem.EncodingType.Base64
        })

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Abrir habilitação'
          })
          return
        }
      }

      setModalVisible(true)
      return
    }

    setIsLoadingArtifact(true)

    try {
      const response = await fetch(
        `https://hml-ntscdu.nautisystem.com/artifact/source/PEOPLE/identy/${peopleId}/norm/FILE_RESIDENCE`,
        {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'pt-BR,pt;q=0.9',
            lang: 'pt-BR',
            locale: 'pt-BR',
            'x-access-token': session?.authorization || ''
          }
        }
      )

      if (!response.ok) {
        return
      }

      const contentType = response.headers.get('content-type') || ''
      let artifactSource = ''

      if (contentType.includes('application/json')) {
        const responseData = await response.json()
        artifactSource =
          responseData?.object?.document ||
          responseData?.object?.source ||
          responseData?.object?.artifact ||
          responseData?.source ||
          ''
      } else {
        artifactSource = await response.text()
      }

      if (!artifactSource) {
        return
      }

      const normalizedArtifact = normalizeDocumentImage(artifactSource)
      const artifactData = normalizedArtifact || artifactSource

      setSession(currentSession => ({
        ...(currentSession || {}),
        clientArtifacts: {
          ...(currentSession?.clientArtifacts || {}),
          [peopleId]: artifactData
        }
      }))

      const loadedArtifactParts = getDataUriParts(artifactData)

      if (loadedArtifactParts?.mimeType === 'application/pdf') {
        const fileUri = `${FileSystem.cacheDirectory}habilitacao-${peopleId}.pdf`

        await FileSystem.writeAsStringAsync(fileUri, loadedArtifactParts.base64, {
          encoding: FileSystem.EncodingType.Base64
        })

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Abrir habilitação'
          })
          return
        }
      }

      setModalVisible(true)
    } catch {
      // Mantém o modal funcional mesmo se o anexo não puder ser carregado.
    } finally {
      setIsLoadingArtifact(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Habilitação</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Habilitação Náutica</Text>

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryBox}>
            {categoryLabels.length > 0 ? (
              categoryLabels.map(category => (
                <Text key={category} style={styles.categoryText}>
                  {category}
                </Text>
              ))
            ) : (
              <Text style={styles.placeholderValue}>
                Nenhuma categoria informada
              </Text>
            )}
          </View>

          <Text style={styles.label}>Limite</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formValues.limits}
            editable={false}
            multiline
            placeholder="Limite"
            placeholderTextColor="#A0AEC0"
          />
        </View>

        <Field
          label="Número da habilitação"
          value={formValues.enrollment}
          placeholder="Número da habilitação"
        />
        <Field
          label="Categoria"
          value={formValues.category}
          placeholder="Categoria"
        />
        <Field
          label="Data de emissão"
          value={formValues.expeditionDate}
          placeholder="Data de emissão"
        />
        <Field
          label="Data de validade"
          value={formValues.validityDate}
          placeholder="Data de validade"
        />
        <Field label="UF" value={formValues.location} placeholder="UF" />
        <Field
          label="Capitanias, Delegacias e Agências"
          value={formValues.comments}
          placeholder="Capitanias, Delegacias e Agências"
        />
        <TouchableOpacity style={styles.button} onPress={openQualification}>
          <Text style={styles.buttonText}>VER HABILITAÇÃO</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            {isLoadingArtifact ? (
              <Text style={styles.emptyDocumentText}>Carregando habilitação...</Text>
            ) : isPdfArtifact ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={42} color="#fff" />
                <Text style={styles.emptyDocumentText}>
                  Este arquivo foi recebido em PDF e não pode ser renderizado
                  pelo componente de imagem.
                </Text>
                <Text style={styles.helperText}>
                  Em simuladores, o visualizador externo pode não abrir. Teste
                  em um dispositivo físico ou compartilhe o PDF.
                </Text>
                <TouchableOpacity style={styles.secondaryButton} onPress={openQualification}>
                  <Text style={styles.secondaryButtonText}>ABRIR PDF</Text>
                </TouchableOpacity>
              </View>
            ) : documentImage ? (
              <Image
                source={{ uri: documentImage }}
                style={styles.documentImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="document-outline" size={36} color="#fff" />
                <Text style={styles.emptyDocumentText}>
                  Nenhuma habilitação disponível para este cliente.
                </Text>
              </View>
            )}
          </View>
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
    backgroundColor: '#2E3A4D'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  headerSpacer: {
    width: 24
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  sectionBlock: {
    marginBottom: 18
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12
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
  categoryBox: {
    backgroundColor: '#4A5A72',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6
  },
  placeholderValue: {
    color: '#A0AEC0',
    fontSize: 14
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20
  },
  buttonText: {
    color: '#2E3A4D',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '88%',
    minHeight: 280,
    maxHeight: '70%',
    backgroundColor: '#2E3A4D',
    borderRadius: 18,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 20,
    zIndex: 10
  },
  documentImage: {
    width: '100%',
    height: 360,
    borderRadius: 12
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  emptyDocumentText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 12
  },
  helperText: {
    color: '#C9D3E5',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18
  },
  secondaryButton: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  secondaryButtonText: {
    color: '#2E3A4D',
    fontSize: 14,
    fontWeight: '700'
  }
})
