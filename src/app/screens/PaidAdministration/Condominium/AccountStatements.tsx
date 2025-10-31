// screens/AccountStatementsScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

type StatementItem = {
  id: string
  month: string
  year: string
  url: string // URL do PDF
}

export default function AccountStatementsScreen() {
  const navigation: any = useNavigation()
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const items: StatementItem[] = [
    {
      id: 'feb-2023',
      month: 'Fevereiro',
      year: '2023',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 'jan-2023',
      month: 'Janeiro',
      year: '2023',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ]

  async function handleDownload(item: StatementItem) {
    try {
      setDownloadingId(item.id)
      const filename = `prestacao_${item.month}_${item.year}.pdf`.replace(
        /\s+/g,
        '_'
      )
      const target = FileSystem.documentDirectory + filename

      const { uri, status } = await FileSystem.downloadAsync(item.url, target)
      if (status !== 200) {
        throw new Error('Falha no download')
      }

      const canShare = await Sharing.isAvailableAsync()
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Prestação de contas - ${item.month}/${item.year}`
        })
      } else {
        Alert.alert('Arquivo salvo', `PDF salvo em:\n${uri}`)
      }
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível baixar o PDF.')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Prestação de contas</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Tab */}
      <View style={styles.tab}>
        <Text style={styles.tabText}>Histórico</Text>
      </View>

      {/* Cabeçalho da tabela */}
      <View style={styles.tableHeader}>
        <Text style={[styles.th, { flex: 1.2 }]}>Mês</Text>
        <Text style={[styles.th, { width: 70, textAlign: 'center' }]}>Ano</Text>
        <Text style={[styles.th, { width: 40 }]} />
      </View>

      {/* Lista */}
      <ScrollView style={styles.content}>
        <View style={styles.list}>
          {items.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.row,
                idx % 2 === 1 && styles.rowAlt // linha com leve destaque como no protótipo
              ]}
            >
              <Text style={[styles.td, { flex: 1.2 }]}>{item.month}</Text>
              <Text style={[styles.td, { width: 70, textAlign: 'center' }]}>
                {item.year}
              </Text>

              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => handleDownload(item)}
                disabled={downloadingId === item.id}
              >
                {downloadingId === item.id ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <MaterialCommunityIcons
                    name="download"
                    size={18}
                    color="#FFFFFF"
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
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

  tab: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18
  },
  tabText: { color: '#1A1A1A', fontWeight: '600' },

  tableHeader: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#465065',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  th: { color: '#C9D1D9', fontWeight: '700', fontSize: 13 },

  content: { flex: 1, paddingHorizontal: 20 },
  list: { marginTop: 4 },

  row: {
    backgroundColor: '#1F2738',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowAlt: {
    backgroundColor: '#212C4F'
  },
  td: { color: '#FFFFFF', fontSize: 14 },
  downloadBtn: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
