import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal
} from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'

type Embarcacao = {
  id: string
  nome: string
  modeloAno: string
  registro: string
  local: string
  cor: string
  compartilhada: string
  cotasDisponiveis: string
  proprietarios: string[]
  quantidadeProprietarios: number
  foto: any
}

const getImageSource = (value: string | null | undefined) => {
  if (!value) {
    return require('../../../assets/splash-icon.png')
  }

  return {
    uri: value.startsWith('data:')
      ? value
      : `data:image/jpeg;base64,${value}`
  }
}

const getLocationLabel = (bookcase: any) => {
  const shelf = bookcase?.shelves?.[0]
  const drawer = shelf?.drawers?.[0]
  const parts = [bookcase?.name, shelf?.name, drawer?.name].filter(Boolean)

  if (parts.length === 0) {
    return '--'
  }

  return parts.join(' | ')
}

const getOwners = (responsibles: any[] | undefined) =>
  Array.isArray(responsibles)
    ? responsibles
        .map(item => String(item?.ownerName || '').trim())
        .filter(Boolean)
    : []

export default function PaidVessel() {
  const navigation: any = useNavigation()
  const { session, setSession } = useAuth()
  const [isLoadingVessels, setIsLoadingVessels] = React.useState(false)
  const [hasLoadedVessels, setHasLoadedVessels] = React.useState(false)
  const [ownersVisible, setOwnersVisible] = React.useState(false)
  const [selectedOwners, setSelectedOwners] = React.useState<string[]>([])
  const sessionVessels = Array.isArray(session?.paidVessels)
    ? session.paidVessels
    : []
  const showSkeleton = isLoadingVessels && sessionVessels.length === 0

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Embarcações',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerTitleStyle: { color: '#2C3545', fontWeight: '700' },
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
        >
          <Feather name="arrow-left" size={20} color="#2C3545" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.popToTop?.() ?? navigation.navigate('Home')}
          style={styles.headerBtn}
        >
          <Feather name="x" size={22} color="#2C3545" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  useFocusEffect(
    React.useCallback(() => {
      if (sessionVessels.length > 0) {
        setIsLoadingVessels(false)
        setHasLoadedVessels(true)

        return
      }

      let isActive = true

      const loadVessels = async () => {
        setIsLoadingVessels(true)

        try {
          const response = await fetch(
            'https://hml-ntslcl.nautisystem.com/vessel/list',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Content-Type': 'application/json',
                lang: 'pt-BR',
                locale: 'pt-BR',
                'x-access-token': session?.authorization || ''
              },
              body: JSON.stringify({
                partnerId: 1,
                pagination: { limit: 100, offset: 0 }
              })
            }
          )

          if (!response.ok) {
            return
          }

          const responseText = await response.text()
          const responseData = responseText ? JSON.parse(responseText) : null
          const rows = Array.isArray(responseData?.object?.rows)
            ? responseData.object.rows
            : []

          if (!isActive) {
            return
          }

          setSession(currentSession => ({
            ...(currentSession || {}),
            paidVessels: rows
          }))
        } catch {
          // Mantém a tela funcional se a request falhar.
        } finally {
          if (!isActive) {
            return
          }

          setIsLoadingVessels(false)
          setHasLoadedVessels(true)
        }
      }

      loadVessels()

      return () => {
        isActive = false
      }
    }, [session?.authorization, sessionVessels.length, setSession])
  )

  const data = React.useMemo<Embarcacao[]>(
    () =>
      sessionVessels.map((item: any) => {
        const proprietarios = getOwners(item?.responsibles)

        return {
          id: String(item?.id || item?.identifyKey || item?.enrollment),
          nome: item?.name || 'Embarcação',
          modeloAno: `${item?.brand || '-'} ${item?.model || '-'}`.trim(),
          registro: item?.enrollment || '--',
          local: getLocationLabel(item?.bookcase),
          cor: item?.color || '#4A5878',
          compartilhada: item?.shared ? 'Sim' : 'Não',
          cotasDisponiveis:
            item?.quotasAvailable === 0 || item?.quotasAvailable
              ? String(item?.quotasAvailable)
              : '-',
          proprietarios,
          quantidadeProprietarios: proprietarios.length,
          foto: getImageSource(item?.image)
        }
      }),
    [sessionVessels]
  )

  const renderChip = (
    label: string,
    selected?: boolean,
    disabled?: boolean,
    id?: string
  ) => (
    <View
      key={id}
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled
      ]}
    >
      {selected && <Feather name="check" size={14} color="#DDE6F5" />}
      <Text
        style={[
          styles.chipText,
          selected && styles.chipTextSelected,
          disabled && styles.chipTextDisabled
        ]}
      >
        {label}
      </Text>
    </View>
  )

  const openDetalhe = (item: Embarcacao) => {
    navigation.navigate('ClientVessel', { id: item.id })
  }

  const openOwners = (owners: string[]) => {
    if (owners.length === 0) {
      return
    }

    setSelectedOwners(owners)
    setOwnersVisible(true)
  }

  const renderSkeleton = (_: unknown, index: number) => (
    <View key={index} style={styles.card}>
      <View style={[styles.topPill, styles.skeletonBlock]}>
        <View style={styles.rowAlign}>
          <View style={[styles.thumb, styles.skeletonBlock]} />
          <View style={{ flex: 1 }}>
            <View style={[styles.skeletonLine, styles.skeletonTitle]} />
            <View style={[styles.skeletonLine, styles.skeletonSubtitle]} />
          </View>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={[styles.skeletonLine, styles.skeletonInfo]} />
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.skeletonLine, styles.skeletonInfoWide]} />
      </View>
      <View style={styles.metaRow}>
        <View style={[styles.skeletonLine, styles.skeletonMeta]} />
        <View style={[styles.skeletonLine, styles.skeletonMeta]} />
      </View>
    </View>
  )

  const renderItem = ({ item }: { item: Embarcacao }) => (
    <View style={styles.card}>
      {/* Pílula superior dentro do card */}
      <TouchableOpacity
        style={styles.topPill}
        activeOpacity={0.9}
        onPress={() => openDetalhe(item)}
      >
        <View style={styles.rowAlign}>
          <Image source={item.foto} style={styles.thumb} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.nome}</Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>{item.modeloAno}</Text>
              <View style={styles.colorBadge}>
                <View
                  style={[styles.colorDot, { backgroundColor: item.cor }]}
                />
                <Text style={styles.colorText}>Cor</Text>
              </View>
            </View>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color="#D9DFEA" />
      </TouchableOpacity>

      {/* Linhas de informação */}
      <View style={styles.infoRow}>
        <Feather name="credit-card" size={16} color="#D9DFEA" />
        <Text style={styles.infoText}>{item.registro}</Text>
      </View>
      <View style={styles.infoRow}>
        <Feather name="map-pin" size={16} color="#D9DFEA" />
        <Text style={styles.infoText}>{item.local}</Text>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Compartilhada</Text>
          <Text style={styles.metaValue}>{item.compartilhada}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Cotas disp.</Text>
          <Text style={styles.metaValue}>{item.cotasDisponiveis}</Text>
        </View>
      </View>
      <View style={styles.ownersRow}>
        <TouchableOpacity
          style={styles.ownersButton}
          onPress={() => openOwners(item.proprietarios)}
          disabled={item.quantidadeProprietarios === 0}
        >
          <MaterialCommunityIcons
            name="account-group-outline"
            size={18}
            color={item.quantidadeProprietarios === 0 ? '#8A93A7' : '#D9DFEA'}
          />
          <Text style={styles.metaValue}>{item.quantidadeProprietarios}</Text>
          <Text style={styles.ownersLabel}>
            {item.quantidadeProprietarios === 1
              ? 'Proprietário'
              : 'Proprietários'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Embarcação</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>
      {/* Filtros / Ordenação */}
      <View style={styles.filtersWrap}>
        <Text style={styles.groupLabel}>Ordenar por</Text>
        <View style={styles.chipsRow}>
          {renderChip('Ano', true)}
          {renderChip('Horas navegadas', false, true)}
          {renderChip('…', false, true)}
          {renderChip('…', false, true)}
        </View>

        <Text style={[styles.groupLabel, { marginTop: 10, opacity: 0.5 }]}>
          Mostrar apenas
        </Text>
        <View style={styles.chipsRow}>
          {renderChip('Ano', false, true)}
          {renderChip('Horas navegadas', false, true)}
          {renderChip('…', false, true)}
        </View>
      </View>

      {showSkeleton ? (
        <FlatList
          data={[0, 1, 2]}
          keyExtractor={it => String(it)}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item, index }) => renderSkeleton(item, index)}
        />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={it => it.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhuma embarcação encontrada</Text>
          <Text style={styles.emptySubtitle}>
            {hasLoadedVessels
              ? 'Não houve retorno de embarcações para este parceiro.'
              : 'Carregando embarcações.'}
          </Text>
        </View>
      )}

      <Modal
        visible={ownersVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setOwnersVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              onPress={() => setOwnersVisible(false)}
              style={styles.modalClose}
            >
              <Feather name="x" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Proprietários</Text>
            {selectedOwners.map(owner => (
              <Text key={owner} style={styles.modalText}>
                {owner}
              </Text>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const BG = '#2C3545'
const CARD = '#253049'
const PILL = '#36436A'
const TEXT = '#E6ECF5'
const MUTED = '#D9DFEA'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
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
  headerBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  filtersWrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  groupLabel: { color: TEXT, fontSize: 12, fontWeight: '600', marginBottom: 8 },
  chipsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B475B',
    opacity: 0.85
  },
  chipSelected: { backgroundColor: '#435172', opacity: 1 },
  chipDisabled: { opacity: 0.4 },
  chipText: { color: MUTED, fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: TEXT },
  chipTextDisabled: { color: MUTED },
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 12,
    marginTop: 6,
    marginBottom: 10
  },
  topPill: {
    backgroundColor: PILL,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  rowAlign: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A5878'
  },
  title: { color: TEXT, fontSize: 15, fontWeight: '800' },
  subtitle: { color: MUTED, fontSize: 12, marginTop: 2, fontWeight: '600' },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
    flexWrap: 'wrap'
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)'
  },
  colorText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: '700'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6
  },
  infoText: { color: TEXT, fontSize: 14, fontWeight: '600', flex: 1 },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4
  },
  metaItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  metaLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4
  },
  metaValue: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '700'
  },
  ownersRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ownersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  ownersLabel: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '600'
  },
  skeletonBlock: {
    backgroundColor: '#46536C'
  },
  skeletonLine: {
    backgroundColor: '#5A6883',
    borderRadius: 6
  },
  skeletonTitle: {
    width: '65%',
    height: 16,
    marginBottom: 8
  },
  skeletonSubtitle: {
    width: '45%',
    height: 12
  },
  skeletonInfo: {
    width: '50%',
    height: 14
  },
  skeletonInfoWide: {
    width: '80%',
    height: 14
  },
  skeletonMeta: {
    flex: 1,
    height: 44
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  emptySubtitle: {
    color: MUTED,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24
  },
  modalBox: {
    backgroundColor: '#36436A',
    borderRadius: 16,
    padding: 18
  },
  modalClose: {
    alignSelf: 'flex-end'
  },
  modalTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12
  },
  modalText: {
    color: TEXT,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6
  }
})
