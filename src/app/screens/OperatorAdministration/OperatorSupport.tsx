import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
  navigation: any
  route: any
}

type MensagemItem = {
  id: string
  nome: string
  embarcacao: string
  hora: string
  dataISO: string
  status: 'Pendente' | 'Concluído'
  lida: boolean
}

const C = {
  bg: '#2C3545',
  tabLine: '#8893A3',
  white: '#FFFFFF',
  card: '#1F2A57',
  pill: '#516178',
  text: '#F2F4F7',
  muted: '#C8D0DB',
  navy: '#1E2B58'
}

const MOCK: MensagemItem[] = [
  {
    id: '1',
    nome: 'José Luis',
    embarcacao: 'Yamaha XZ700',
    hora: '10:42',
    dataISO: '2023-03-01',
    status: 'Pendente',
    lida: false
  }
]

export default function OperatorSupport(props: Props) {
  const { navigation } = props
  const [aba, setAba] = useState<'naoLidas' | 'lidas'>('naoLidas')
  const dados = useMemo(
    () => MOCK.filter(m => (aba === 'naoLidas' ? !m.lida : m.lida)),
    [aba]
  )

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Mensagens',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: C.white },
      headerTintColor: '#0A0A0A',
      headerTitleStyle: {},
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color="#0A0A0A" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="close" size={20} color="#0A0A0A" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const openChat = (item: MensagemItem) => {
    navigation.navigate('OperatorChat', {
      id: item.id,
      nome: item.nome,
      embarcacao: item.embarcacao,
      dataISO: item.dataISO,
      status: item.status,
      hora: item.hora
    })
  }

  const renderItem = ({ item }: { item: MensagemItem }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => openChat(item)}
      activeOpacity={0.9}
    >
      {/* pill superior */}
      <View style={s.pillRow}>
        <Text style={s.pillName}>
          {item.nome} ({item.embarcacao})
        </Text>

        <View style={s.timeWrap}>
          <Text style={s.timeText}>{item.hora}</Text>
        </View>

        <View style={s.chevBtn}>
          <Ionicons name="chevron-forward" size={16} color={C.white} />
        </View>
      </View>

      {/* meta inferior */}
      <View style={s.metaRow}>
        <View style={s.inline}>
          <Ionicons name="calendar-outline" size={16} color={C.muted} />
          <Text style={s.metaText}>
            {new Date(item.dataISO).toLocaleDateString('pt-BR')}
          </Text>
        </View>

        <View style={[s.inline, { marginLeft: 18 }]}>
          <MaterialCommunityIcons
            name="account-outline"
            size={16}
            color={C.muted}
          />
          <Text style={s.metaText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Mensagens</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      {/* Abas */}
      <View style={s.tabsWrap}>
        <View style={s.tabsRow}>
          {/* NÃO LIDAS */}
          <TouchableOpacity
            style={aba === 'naoLidas' ? s.tabActive : s.tabPlain}
            onPress={() => setAba('naoLidas')}
            activeOpacity={0.8}
          >
            <Text style={aba === 'naoLidas' ? s.tabActiveText : s.tabPlainText}>
              NÃO LIDAS
            </Text>
          </TouchableOpacity>

          {/* LIDAS */}
          <TouchableOpacity
            style={aba === 'lidas' ? s.tabActive : s.tabPlain}
            onPress={() => setAba('lidas')}
            activeOpacity={0.8}
          >
            <Text style={aba === 'lidas' ? s.tabActiveText : s.tabPlainText}>
              LIDAS
            </Text>
          </TouchableOpacity>
        </View>

        <View style={s.tabLine} />
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 24
        }}
        data={dados}
        keyExtractor={i => i.id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1D2635' },
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
  backArrow: { color: '#fff', fontSize: 20 }
})

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  tabsWrap: { paddingHorizontal: 16, paddingTop: 12 },
  tabsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  tabActive: {
    backgroundColor: C.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  tabActiveText: { color: C.navy, fontWeight: '800', letterSpacing: 0.2 },
  tabPlain: { paddingVertical: 8, paddingHorizontal: 6 },
  tabPlainText: { color: C.white, opacity: 0.8, fontWeight: '700' },
  tabLine: {
    height: 1,
    backgroundColor: C.tabLine,
    opacity: 0.5,
    marginTop: 6
  },

  card: {
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 12,
    marginTop: 12
  },
  pillRow: {
    backgroundColor: C.pill,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pillName: { color: C.white, fontWeight: '600', flexShrink: 1 },
  timeWrap: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#6A7A92',
    marginLeft: 10
  },
  timeText: { color: C.white, fontWeight: '700' },
  chevBtn: {
    marginLeft: 'auto',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6A7A92',
    alignItems: 'center',
    justifyContent: 'center'
  },

  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { color: C.muted, fontWeight: '700' }
})

