import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

// Habilitar animação de Layout no Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// Mock de dados do suporte
const MOCK_FAQS = [
  {
    pergunta: 'Como alterar minha senha?',
    resposta:
      'Você pode alterar sua senha acessando Configurações > Conta > Alterar senha.'
  },
  {
    pergunta: 'Como visualizar meus relatórios?',
    resposta:
      'Os relatórios estão disponíveis na tela de Relatórios, acessível pelo menu principal.'
  },
  {
    pergunta: 'Como entrar em contato com o suporte?',
    resposta:
      'Você pode nos enviar um e-mail para suporte@empresa.com ou usar o chat na tela de suporte.'
  }
]

const TELEFONE_WHATSAPP = '5511999999999' // Coloque o número do suporte aqui (com DDI + DDD)

const Support = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const navigation = useNavigation()

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setActiveIndex(activeIndex === index ? null : index)
  }

  const abrirWhatsapp = () => {
    const url = `https://wa.me/${TELEFONE_WHATSAPP}`
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        alert('Não foi possível abrir o WhatsApp.')
      }
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.headerTitle}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitleName}>Suporte</Text>
          <Ionicons name="close" size={24} color="transparent" />
        </View>

        {/* Título */}
        <Text style={styles.faqTitle}>Dúvidas frequentes</Text>

        {/* Accordion */}
        <View style={styles.accordionContainer}>
          {MOCK_FAQS.map((item, index) => (
            <View key={index} style={styles.accordionItem}>
              <TouchableOpacity
                onPress={() => toggleAccordion(index)}
                style={styles.accordionHeader}
              >
                <Text style={styles.accordionTitle}>{item.pergunta}</Text>
                <Ionicons
                  name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
              {activeIndex === index && (
                <View style={styles.accordionContent}>
                  <Text style={styles.accordionText}>{item.resposta}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Rodapé fixo */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.whatsappButton} onPress={abrirWhatsapp}>
          <Ionicons
            name="logo-whatsapp"
            size={20}
            color="#25D366"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.whatsappText}>Preciso de ajuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
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
  faqTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 12
  },
  accordionContainer: { marginHorizontal: 16 },
  accordionItem: {
    backgroundColor: '#3A4258',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden'
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center'
  },
  accordionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  accordionContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2C3545'
  },
  accordionText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center'
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24
  },
  whatsappText: { fontSize: 16, fontWeight: 'bold', color: '#25D366' }
})

export default Support

