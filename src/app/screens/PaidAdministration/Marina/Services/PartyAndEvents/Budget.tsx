import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const EVENT_TYPES = [
  'Festa de aniversário',
  'Casamento',
  'Evento corporativo',
  'Confraternização',
  'Jantar temático',
  'Outro tipo de evento'
]

const DATE_OPTIONS = [
  '05/11/2025',
  '11/11/2025',
  '17/11/2025',
  '22/11/2025',
  '25/11/2025',
  '28/11/2025'
]

export default function EventosNovoOrcamentoScreen() {
  const navigation: any = useNavigation()

  const [tipoEvento, setTipoEvento] = useState<string>('')
  const [dataEvento, setDataEvento] = useState<string>('')
  const [quantidadePessoas, setQuantidadePessoas] = useState<string>('')
  const [telefone, setTelefone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [observacao, setObservacao] = useState<string>('')

  // 'type' | 'date' | null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const goBack = () => {
    navigation.goBack()
  }

  const openTypeDropdown = () => {
    setActiveDropdown('type')
  }

  const openDateDropdown = () => {
    setActiveDropdown('date')
  }

  const handleSelectOption = (option: string) => {
    if (activeDropdown === 'type') {
      setTipoEvento(option)
    } else if (activeDropdown === 'date') {
      setDataEvento(option)
    }
    setActiveDropdown(null)
  }

  const handleSubmit = () => {
    if (
      !tipoEvento ||
      !dataEvento ||
      !quantidadePessoas ||
      !telefone ||
      !email
    ) {
      Alert.alert(
        'Atenção',
        'Por favor, preencha todos os campos principais antes de solicitar o orçamento.'
      )
      return
    }

    Alert.alert(
      'Orçamento enviado',
      'Recebemos sua solicitação de orçamento. Em breve entraremos em contato.'
    )

    navigation.goBack()
  }

  const dropdownOptions =
    activeDropdown === 'type'
      ? EVENT_TYPES
      : activeDropdown === 'date'
        ? DATE_OPTIONS
        : []

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Orçamento para evento</Text>

        {/* X transparente */}
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            Você poderia nos dar mais{'\n'}informações sobre o seu{'\n'}evento?
          </Text>

          {/* Tipo de evento */}
          <Text style={styles.label}>Tipo de evento</Text>
          <TouchableOpacity
            style={styles.selectField}
            onPress={openTypeDropdown}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.selectPlaceholder,
                tipoEvento ? styles.selectValue : null
              ]}
              numberOfLines={1}
            >
              {tipoEvento || 'Selecione o tipo'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Data */}
          <Text style={styles.label}>Data</Text>
          <TouchableOpacity
            style={styles.selectField}
            onPress={openDateDropdown}
            activeOpacity={0.8}
          >
            <View style={styles.selectLeftIcon}>
              <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            </View>
            <Text
              style={[
                styles.selectPlaceholder,
                dataEvento ? styles.selectValue : null
              ]}
              numberOfLines={1}
            >
              {dataEvento || 'Informe a data'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Quantidade de pessoas */}
          <Text style={styles.label}>Quantidade de pessoas</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="Informe a quantidade de pessoas"
              placeholderTextColor="rgba(255,255,255,0.6)"
              keyboardType="number-pad"
              value={quantidadePessoas}
              onChangeText={setQuantidadePessoas}
            />
          </View>

          {/* Telefone */}
          <Text style={styles.label}>Telefone</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="Informe o número com DDD"
              placeholderTextColor="rgba(255,255,255,0.6)"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>

          {/* E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="Informe um e-mail para contato"
              placeholderTextColor="rgba(255,255,255,0.6)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Observação */}
          <Text style={styles.label}>Observação</Text>
          <View style={styles.textAreaField}>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva, se houver, mais informações sobre o seu evento."
              placeholderTextColor="rgba(255,255,255,0.7)"
              multiline
              textAlignVertical="top"
              value={observacao}
              onChangeText={setObservacao}
            />
          </View>
        </ScrollView>

        {/* BOTÃO FIXO */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={handleSubmit}>
            <Text style={styles.footerButtonText}>SOLICITAR ORÇAMENTO</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* DROPDOWN OVERLAY */}
      {activeDropdown && (
        <View style={styles.dropdownOverlay}>
          {/* Backdrop */}
          <TouchableOpacity
            style={styles.dropdownBackdrop}
            activeOpacity={1}
            onPress={() => setActiveDropdown(null)}
          />

          {/* Caixa de opções */}
          <View style={styles.dropdownContainer}>
            <ScrollView
              style={styles.dropdownScroll}
              contentContainerStyle={{ paddingVertical: 8 }}
            >
              {dropdownOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOption}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3545'
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6
  },
  selectField: {
    backgroundColor: '#3C4760',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  selectLeftIcon: {
    marginRight: 10
  },
  selectPlaceholder: {
    flex: 1,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14
  },
  selectValue: {
    color: '#FFFFFF'
  },
  inputField: {
    backgroundColor: '#3C4760',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 16,
    justifyContent: 'center'
  },
  input: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 10
  },
  textAreaField: {
    backgroundColor: '#3C4760',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 16,
    minHeight: 140
  },
  textArea: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonText: {
    color: '#111A33',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1
  },

  // Dropdown
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  dropdownContainer: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: '#3C4760',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  dropdownScroll: {
    flexGrow: 0
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 1
  },
  dropdownOptionText: {
    color: '#FFFFFF',
    fontSize: 14
  }
})
