import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Message = {
  id: string
  from: 'user' | 'marina'
  text: string
  time: string
}

export default function SosMarinaChatScreen() {
  const navigation: any = useNavigation()
  const [message, setMessage] = useState('')
  const [chatEnded, setChatEnded] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'marina',
      text: 'Olá, aqui é a Marina NautiSystem. Como podemos te ajudar?',
      time: '10:21'
    },
    {
      id: '2',
      from: 'user',
      text: 'Meu motor parou de funcionar próximo à saída do canal.',
      time: '10:22'
    },
    {
      id: '3',
      from: 'marina',
      text: 'Entendido. Você está com coletes para todos a bordo?',
      time: '10:23'
    }
  ])

  const scrollRef = useRef<ScrollView | null>(null)

  const goBack = () => {
    navigation.goBack()
  }

  const handleSend = () => {
    if (!message.trim() || chatEnded) return

    const newMessage: Message = {
      id: String(Date.now()),
      from: 'user',
      text: message.trim(),
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true })
      }
    }, 50)
  }

  const handleEndChat = () => {
    setChatEnded(true)
    const closingMessage: Message = {
      id: String(Date.now()),
      from: 'marina',
      text: 'Atendimento encerrado. Se precisar de nova ajuda, abra um novo chamado pelo SOS.',
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    setMessages(prev => [...prev, closingMessage])

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true })
      }
    }, 50)
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Falar com minha marina</Text>

        {/* X transparente */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        {/* STATUS DO ATENDIMENTO */}
        <View style={styles.statusBanner}>
          <MaterialCommunityIcons
            name="lifebuoy"
            size={20}
            color="#1F2633"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.statusText}>
            Atendimento ativo com sua marina.
          </Text>
        </View>

        {/* CHAT */}
        <ScrollView
          ref={scrollRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map(msg => {
            const isUser = msg.from === 'user'
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isUser ? styles.messageRowUser : styles.messageRowMarina
                ]}
              >
                {!isUser && (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>M</Text>
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    isUser
                      ? styles.messageBubbleUser
                      : styles.messageBubbleMarina
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser ? styles.messageTextUser : styles.messageTextMarina
                    ]}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      isUser ? styles.messageTimeUser : styles.messageTimeMarina
                    ]}
                  >
                    {msg.time}
                  </Text>
                </View>

                {isUser && (
                  <View style={[styles.avatar, styles.avatarUser]}>
                    <Text style={styles.avatarText}>Você</Text>
                  </View>
                )}
              </View>
            )
          })}
        </ScrollView>

        {/* RODAPÉ: INPUT + ENCERRAR */}
        <View style={styles.footer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder={
                chatEnded ? 'Atendimento encerrado.' : 'Digite sua mensagem...'
              }
              placeholderTextColor="#A6B0C5"
              value={message}
              onChangeText={setMessage}
              editable={!chatEnded}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!message.trim() || chatEnded) && styles.sendButtonDisabled
              ]}
              onPress={handleSend}
              activeOpacity={0.9}
              disabled={!message.trim() || chatEnded}
            >
              <Ionicons name="send" size={18} color="#1F2633" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.endChatButton,
              chatEnded && styles.endChatButtonDisabled
            ]}
            onPress={handleEndChat}
            disabled={chatEnded}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.endChatText,
                chatEnded && styles.endChatTextDisabled
              ]}
            >
              {chatEnded ? 'Atendimento encerrado' : 'Encerrar atendimento'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const DARK_BG = '#1F2633'
const CHAT_BG = '#262F4A'
const USER_BUBBLE = '#B7D7FF'
const MARINA_BUBBLE = '#343F5C'
const WHITE = '#FFFFFF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600'
  },
  statusBanner: {
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#B7D7FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusText: {
    color: '#1F2633',
    fontSize: 13,
    fontWeight: '600'
  },
  chatContainer: {
    flex: 1
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end'
  },
  messageRowMarina: {
    justifyContent: 'flex-start'
  },
  messageRowUser: {
    justifyContent: 'flex-end'
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  messageBubbleMarina: {
    backgroundColor: MARINA_BUBBLE,
    borderBottomLeftRadius: 4
  },
  messageBubbleUser: {
    backgroundColor: USER_BUBBLE,
    borderBottomRightRadius: 4
  },
  messageText: {
    fontSize: 14,
    marginBottom: 4
  },
  messageTextMarina: {
    color: WHITE
  },
  messageTextUser: {
    color: '#1F2633'
  },
  messageTime: {
    fontSize: 11
  },
  messageTimeMarina: {
    color: '#C7CCEA',
    textAlign: 'right'
  },
  messageTimeUser: {
    color: '#304057',
    textAlign: 'right'
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CHAT_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6
  },
  avatarUser: {
    backgroundColor: '#4D5D80'
  },
  avatarText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '700'
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#30384A',
    backgroundColor: DARK_BG
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: CHAT_BG,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: WHITE,
    fontSize: 14
  },
  sendButton: {
    marginLeft: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#B7D7FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonDisabled: {
    opacity: 0.5
  },
  endChatButton: {
    alignItems: 'center',
    paddingVertical: 10
  },
  endChatButtonDisabled: {
    opacity: 0.5
  },
  endChatText: {
    color: '#FFB3B3',
    fontSize: 13,
    fontWeight: '600'
  },
  endChatTextDisabled: {
    color: '#A6B0C5'
  }
})

