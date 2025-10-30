import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const UF_LIST = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]

const CITIES: Record<string, string[]> = {
  RS: ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
  SP: ['São Paulo', 'Campinas', 'Santos'],
  RJ: ['Rio de Janeiro', 'Niterói', 'Petrópolis']
}

function formatPhone(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{0,2})/, '($1')
      .replace(/^\((\d{2})(\d{0,4})/, '($1) $2')
      .replace(/^\((\d{2})\) (\d{4})(\d{0,4})/, '($1) $2-$3')
  }
  return digits
    .replace(/^(\d{0,2})/, '($1')
    .replace(/^\((\d{2})(\d{0,5})/, '($1) $2')
    .replace(/^\((\d{2})\) (\d{5})(\d{0,4})/, '($1) $2-$3')
}

export default function CondominiumDataScreen() {
  const navigation: any = useNavigation()

  const [nome, setNome] = useState('Fulano’s House')
  const [uf, setUf] = useState('RS')
  const [cidade, setCidade] = useState('Porto Alegre')
  const [condominio, setCondominio] = useState('Condomínio XPTO')
  const [endereco, setEndereco] = useState('Av. do Forte 281')
  const [telefone, setTelefone] = useState('(51) 3289-4523')
  const [site, setSite] = useState('http://www.marinadolago123.com.br')

  const cidadesDaUf = useMemo(() => CITIES[uf] ?? [], [uf])

  const canSave =
    nome.trim() &&
    uf &&
    cidade &&
    condominio.trim() &&
    endereco.trim() &&
    telefone.replace(/\D/g, '').length >= 10

  function handleSave() {
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#2C3545' }}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Meu condomínio</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Conteúdo rolável */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
              placeholderTextColor="#AAB4C8"
            />

            <Text style={styles.label}>UF</Text>
            <View style={styles.select}>
              <TextInput
                style={styles.inputText}
                value={uf}
                onChangeText={setUf}
                placeholder="UF"
                placeholderTextColor="#AAB4C8"
              />
            </View>

            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={cidade}
              onChangeText={setCidade}
              placeholder="Cidade"
              placeholderTextColor="#AAB4C8"
            />

            <Text style={styles.label}>Condomínio</Text>
            <TextInput
              style={styles.input}
              value={condominio}
              onChangeText={setCondominio}
              placeholder="Condomínio"
              placeholderTextColor="#AAB4C8"
            />

            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Endereço"
              placeholderTextColor="#AAB4C8"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={t => setTelefone(formatPhone(t))}
              placeholder="(00) 0000-0000"
              placeholderTextColor="#AAB4C8"
              maxLength={15}
            />

            <Text style={styles.label}>Site</Text>
            <TextInput
              style={styles.input}
              value={site}
              onChangeText={setSite}
              placeholder="https://"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              placeholderTextColor="#AAB4C8"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botão fixo */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.9}
          style={[styles.saveBtn, !canSave && { opacity: 0.5 }]}
          disabled={!canSave}
        >
          <Text style={styles.saveText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 50
  },
  headerTitleName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  scroll: {
    flex: 1,
    backgroundColor: '#2C3545'
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 20
  },
  label: {
    color: '#D7DFEE',
    fontSize: 12,
    marginBottom: 6
  },
  input: {
    backgroundColor: '#445067',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    color: '#EAF0FF',
    fontSize: 15
  },
  select: {
    backgroundColor: '#445067',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14
  },
  inputText: {
    color: '#EAF0FF',
    fontSize: 15
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  saveBtn: {
    alignItems: 'center',
    paddingVertical: 12
  },
  saveText: {
    color: '#273165',
    letterSpacing: 2,
    fontWeight: '700'
  }
})

