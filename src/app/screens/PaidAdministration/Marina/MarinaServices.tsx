import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Svg, { Path, Circle } from 'react-native-svg'

type MenuItemProps = {
  label: string
  onPress: () => void
  icon: React.ReactNode
}

export default function MarinaServicesScreen() {
  const navigation = useNavigation<any>()

  const goBack = () => navigation.goBack()
  const closeAll = () => navigation.popToTop()

  const goAbastecimento = () => navigation.navigate('Fuel')
  const goBistro = () => navigation.navigate('Bistro')
  const goFestas = () => navigation.navigate('PartyAndEvents')

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.headerIcon}
        >
          <ChevronLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Serviços</Text>
        <Pressable
          onPress={() => navigation.popToTop()}
          hitSlop={10}
          style={styles.headerIcon}
        ></Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Nossos serviços</Text>

        <MenuItem
          label="Abastecimento"
          onPress={goAbastecimento}
          icon={<DropIcon />}
        />
        <MenuItem
          label="Bistrô & restaurante"
          onPress={goBistro}
          icon={<CoffeeIcon />}
        />
        <MenuItem
          label="Festas & Eventos"
          onPress={goFestas}
          icon={<PeopleIcon />}
        />
      </ScrollView>
    </View>
  )
}

/** ---------- Components ---------- */

function MenuItem({ label, onPress, icon }: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && { opacity: 0.9 }]}
    >
      <View style={styles.itemLeft}>
        <View style={styles.itemIconWrap}>{icon}</View>
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      <ChevronRight color="#D6DEE9" />
    </Pressable>
  )
}

/** ---------- Icons (SVG) ---------- */

function ChevronLeft({ color = '#FFFFFF' }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
function CloseIcon({ color = '#FFFFFF' }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
function ChevronRight({ color = '#FFFFFF' }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
function DropIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M12 3s6 6.8 6 11a6 6 0 1 1-12 0c0-4.2 6-11 6-11z"
        fill="none"
        stroke="#D6DEE9"
        strokeWidth={2}
      />
    </Svg>
  )
}
function CoffeeIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M4 8h10a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"
        fill="none"
        stroke="#D6DEE9"
        strokeWidth={2}
      />
      <Path
        d="M14 10h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-3"
        stroke="#D6DEE9"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M6 15v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1"
        stroke="#D6DEE9"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* vapor */}
      <Path
        d="M8 5c0 1 .8 1.2.8 2s-.8 1-.8 2"
        stroke="#D6DEE9"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M11 4.5c0 1 .8 1.2.8 2s-.8 1-.8 2"
        stroke="#D6DEE9"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
function PeopleIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Circle
        cx="8"
        cy="9"
        r="3"
        stroke="#D6DEE9"
        strokeWidth={2}
        fill="none"
      />
      <Circle
        cx="16"
        cy="9"
        r="3"
        stroke="#D6DEE9"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M3 19a5 5 0 0 1 10 0"
        stroke="#D6DEE9"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M11 19a5 5 0 0 1 10 0"
        stroke="#D6DEE9"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  )
}

/** ---------- Styles ---------- */

const BG = '#2C3545'
const ITEM_BG = '#3A4659'
const ITEM_TEXT = '#E6ECF5'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    marginTop: 50,
    paddingHorizontal: 16,
    height:
      64 + (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700'
  },

  content: { padding: 16, paddingBottom: 24 },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16
  },

  item: {
    backgroundColor: ITEM_BG,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemLabel: { color: ITEM_TEXT, fontSize: 16, fontWeight: '700' }
})

