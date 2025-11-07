import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  Linking
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation, useRoute } from '@react-navigation/native'
import Svg, { Path } from 'react-native-svg'

type Params = {
  lat: number
  lng: number
  label?: string
  address?: string
}

export default function NavigateToMarinaScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const {
    lat = -30.033,
    lng = -51.23,
    label = 'Marina',
    address = ''
  } = (route.params || {}) as Params

  const openExternalMaps = () => {
    const g = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    const a = `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`
    const url = Platform.select({ ios: a, android: g })!
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.headerIcon}
        >
          <ChevronLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Marina</Text>
        <Pressable
          onPress={() => navigation.popToTop()}
          hitSlop={10}
          style={styles.headerIcon}
        ></Pressable>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.externalBtn} onPress={openExternalMaps}>
          <Text style={styles.externalText}>ABRIR NO MAPA</Text>
        </Pressable>
      </View>
    </View>
  )
}

/** Icons */
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

/** Styles */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3545' },
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

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: 'transparent'
  },
  externalBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  externalText: { color: '#1F2A44', fontWeight: '800', letterSpacing: 1 }
})

