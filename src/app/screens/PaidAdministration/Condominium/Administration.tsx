import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function AdministrationScreen() {
  const navigation: any = useNavigation()
  const [activeTab, setActiveTab] = useState<'portaria' | 'sindico'>('portaria')

  const handleGoBack = () => navigation.goBack()

  const openWhatsApp = (number: string, msg: string) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`
    Linking.openURL(url).catch(() => alert('Não foi possível abrir o WhatsApp'))
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Administração</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'portaria' && styles.activeTab]}
          onPress={() => setActiveTab('portaria')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'portaria' && styles.activeTabText
            ]}
          >
            PORTARIA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sindico' && styles.activeTab]}
          onPress={() => setActiveTab('sindico')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'sindico' && styles.activeTabText
            ]}
          >
            SÍNDICO E SUB
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        {activeTab === 'portaria' ? (
          <View style={styles.card}>
            <Text style={styles.name}>João da Silva</Text>
            <Text style={styles.role}>Porteiro</Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={18}
                color="#fff"
              />
              <Text style={styles.infoText}>Seg a sex 08:00 às 18:00</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="phone-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.infoText}>(51) 9222-3435</Text>
            </View>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => openWhatsApp('555199223435', 'Olá, portaria!')}
            >
              <MaterialCommunityIcons
                name="message-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.linkText}>Falar com a portaria</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.name}>João da Silva</Text>
              <Text style={styles.role}>Síndico</Text>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="home-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.infoText}>
                  Rua Vinte e Quatro de Julho, 822
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.infoText}>joaosilva@gmail.com</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.infoText}>(51) 9222-3435</Text>
              </View>

              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => openWhatsApp('555199223435', 'Olá, síndico!')}
              >
                <MaterialCommunityIcons
                  name="message-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.linkText}>Falar com o síndico</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.name}>João da Silva</Text>
              <Text style={styles.role}>Sub-síndico</Text>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="home-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.infoText}>
                  Rua Vinte e Quatro de Julho, 822
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.infoText}>joaosilva@gmail.com</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.infoText}>(51) 9222-3435</Text>
              </View>

              <TouchableOpacity
                style={styles.linkRow}
                onPress={() =>
                  openWhatsApp('555199223435', 'Olá, sub-síndico!')
                }
              >
                <MaterialCommunityIcons
                  name="message-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.linkText}>Falar com o sub-síndico</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomColor: '#444C5A',
    borderBottomWidth: 1
  },
  tab: {
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  activeTab: { borderBottomColor: '#FFFFFF' },
  tabText: { color: '#9AA6B2', fontWeight: '600' },
  activeTabText: { color: '#FFFFFF' },

  content: { paddingHorizontal: 20, marginTop: 20 },
  card: {
    backgroundColor: '#1F2738',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16
  },
  name: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  role: { color: '#C9D1D9', marginBottom: 10 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8
  },
  infoText: { color: '#FFFFFF', fontSize: 14 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8
  },
  linkText: {
    color: '#89A4FF',
    textDecorationLine: 'underline',
    fontWeight: '600'
  }
})
