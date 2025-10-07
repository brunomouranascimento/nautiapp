import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  navigation: any
  route: any
}

type Bubble = {
  id: string
  from: 'op' | 'me'
  text: string
}

const COLORS = {
  bg: '#2C3545',
  white: '#FFFFFF',
  myBubble: '#CFEAFB',
  inputBg: '#55667E',
  text: '#0A0A0A',
  muted: '#C8D0DB',
  footerBg: '#1E2B58'
}

export default function OperatorSupport(props: Props) {
  const { navigation, route } = props
  const { nome, dataISO } = route.params

  const [msg, setMsg] = useState('')
  const [items, setItems] = useState<Bubble[]>([
    {
      id: '1',
      from: 'op',
      text: 'Olá! Meu nome é Matheus, sou o operador da sua embarcação. Como posso lhe ajudar hoje?'
    },
    {
      id: '2',
      from: 'me',
      text: 'Olá Matheus, estou com dificuldade para ... Pode me ajudar?'
    },
    { id: '3', from: 'op', text: 'Sem problemas! ...' }
  ])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Mensagens',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: COLORS.white },
      headerTintColor: '#0A0A0A',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="close" size={22} color="#0A0A0A" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const send = () => {
    if (!msg.trim()) return
    setItems(prev => [
      ...prev,
      { id: String(Date.now()), from: 'me', text: msg.trim() }
    ])
    setMsg('')
  }

  const renderBubble = ({ item }: { item: Bubble }) => {
    const isMe = item.from === 'me'
    return (
      <View
        style={[
          styles.bubble,
          isMe ? styles.bubbleMe : styles.bubbleOp,
          isMe ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }
        ]}
      >
        <Text style={[styles.bubbleText, isMe && { color: '#123' }]}>
          {item.text}
        </Text>
      </View>
    )
  }

  const headerDate = new Date(dataISO).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <>
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          // color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Mensagens</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: COLORS.bg }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 0}
      >
        <FlatList
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          data={items}
          keyExtractor={i => i.id}
          renderItem={renderBubble}
          ListHeaderComponent={
            <Text style={styles.dateTitle}>
              {headerDate.charAt(0).toUpperCase() + headerDate.slice(1)}
            </Text>
          }
        />

        {/* Input + botão enviar */}
        <View style={styles.inputWrap}>
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>Mensagem</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={msg}
                onChangeText={setMsg}
                placeholder="Escreva sua mensagem"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
                multiline
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={send}
                activeOpacity={0.9}
              >
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botão fixo rodapé */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.footerBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerBtnText}>ENCERRAR ATENDIMENTO</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 50,
    color: '#17202A'
  },
  headerTitleName: {
    color: '#17202A',
    fontWeight: 'bold',
    fontSize: 18
  },
  backArrow: { color: '#17202A', fontSize: 20 },
  dateTitle: {
    alignSelf: 'center',
    color: '#E5EAF2',
    marginVertical: 8,
    fontWeight: '700'
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 6
  },
  bubbleOp: { backgroundColor: '#FFFFFF' },
  bubbleMe: { backgroundColor: COLORS.myBubble },
  bubbleText: { color: '#17202A' },
  inputWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 72,
    paddingHorizontal: 16
  },
  inputInner: {},
  inputLabel: { color: '#B9C2CE', marginBottom: 6, fontSize: 12 },
  inputRow: {
    backgroundColor: '#4B5A70',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    color: '#FFFFFF'
  },
  sendBtn: {
    backgroundColor: '#1E2B58',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#3F4A5A'
  },
  footerBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center'
  },
  footerBtnText: {
    color: '#1E2B58',
    fontWeight: '800',
    letterSpacing: 0.4
  }
})

