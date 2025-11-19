import React, { useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  StatusBar
} from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'

type DayForecast = {
  label: string // "Hoje", "Amanhã", etc.
  condition: WeatherKind
  description: string // "nublado", "chuva", "tempestade"...
  max: number
  min: number
}

type WeatherKind = 'sunny' | 'cloudy' | 'rain' | 'storm'

type Props = {
  city?: string // "Porto Alegre, RS"
  tempC?: number // 23
  condition?: WeatherKind // 'storm'
  minC?: number // 21
  maxC?: number // 28
  aqi?: number // 15
  alertText?: string | null // "Alerta laranja para tempestade"
  forecast?: DayForecast[]
}

/**
 * WeatherScreen
 * - Animação Lottie de fundo (troca por condição)
 * - Card de previsão de 7 dias
 * - Pill de alerta quando existir
 * - Ícones SVG próprios (sem expo/vector-icons)
 */
export default function WeatherScreen(props: Props) {
  const navigation = useNavigation<any>()

  // Mock seguro para visual — troque pela sua store/serviço
  const { city, tempC, condition, minC, maxC, aqi, alertText, forecast } =
    useMemo(() => {
      return {
        city: props.city ?? 'Porto Alegre, RS',
        tempC: props.tempC ?? 23,
        condition: props.condition ?? 'storm',
        minC: props.minC ?? 21,
        maxC: props.maxC ?? 28,
        aqi: props.aqi ?? 15,
        alertText: props.alertText ?? 'Alerta laranja para tempestade',
        forecast:
          props.forecast ??
          ([
            {
              label: 'Hoje',
              condition: 'cloudy',
              description: 'nublado',
              max: 28,
              min: 21
            },
            {
              label: 'Amanhã',
              condition: 'rain',
              description: 'chuva',
              max: 29,
              min: 21
            },
            {
              label: 'Sábado',
              condition: 'storm',
              description: 'tempestade',
              max: 29,
              min: 21
            },
            {
              label: 'Domingo',
              condition: 'storm',
              description: 'tempestade',
              max: 29,
              min: 21
            },
            {
              label: 'Segunda',
              condition: 'rain',
              description: 'chuva',
              max: 29,
              min: 21
            },
            {
              label: 'Terça',
              condition: 'cloudy',
              description: 'nublado',
              max: 28,
              min: 20
            },
            {
              label: 'Quarta',
              condition: 'sunny',
              description: 'ensolarado',
              max: 32,
              min: 24
            }
          ] as DayForecast[])
      }
    }, [props])

  const headerTitle = 'Clima'

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Animação de fundo */}
      <View style={styles.animationWrap} pointerEvents="none">
        <View style={styles.overlay} />
      </View>

      {/* Header simples (voltar/fechar) */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.headerIcon}
        >
          <ChevronLeft />
        </Pressable>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <Pressable
          onPress={() => navigation.popToTop()}
          hitSlop={10}
          style={styles.headerIcon}
        ></Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloco principal */}
        <View style={styles.centerBlock}>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.temp}>
            {tempC}
            <Text style={styles.tempSuffix}>°C</Text>
          </Text>

          <Text style={styles.subtitle}>
            {labelFor(condition)} <Text style={styles.arrowUp}>↑</Text> {maxC}°C{' '}
            <Text style={styles.arrowDown}>↓</Text> {minC}°C
          </Text>

          <View style={styles.aqiPill}>
            <AQIIcon />
            <Text style={styles.aqiText}>IQA {aqi}</Text>
          </View>
        </View>

        {/* Alerta */}
        {alertText ? (
          <View style={styles.alertPill}>
            <InfoIcon />
            <Text style={styles.alertText}>{alertText}</Text>
          </View>
        ) : null}

        {/* Card: previsão 7 dias */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CalendarIcon />
            <Text style={styles.cardTitle}>Previsão para 7 dias</Text>
          </View>

          {forecast.map((d, idx) => (
            <View
              key={idx}
              style={[styles.row, idx !== 0 && styles.rowDivider]}
            >
              <View style={styles.rowLeft}>
                <WeatherIcon kind={d.condition} />
                <Text style={styles.rowLabel}>
                  {d.label}{' '}
                  <Text style={styles.rowDesc}>– {d.description}</Text>
                </Text>
              </View>
              <Text style={styles.rowTemp}>
                {d.max}°/{d.min}°
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

/** ===== Helpers & Icons (SVG) ===== */

function labelFor(kind: WeatherKind) {
  switch (kind) {
    case 'sunny':
      return 'Ensolarado'
    case 'cloudy':
      return 'Nublado'
    case 'rain':
      return 'Chuva'
    case 'storm':
    default:
      return 'Nublado'
  }
}

function ChevronLeft() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M15 18l-6-6 6-6"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
function CloseIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
function CalendarIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
        stroke="#2C3545"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
function InfoIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke="#2C3545"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M12 8h.01M11 12h2v6h-2z"
        stroke="#2C3545"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
function AQIIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path
        d="M3 12h7a4 4 0 0 0 0-8M13 20h8M13 16h6"
        stroke="#2C3545"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  )
}

function WeatherIcon({ kind }: { kind: WeatherKind }) {
  if (kind === 'sunny') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="4" fill="#F5C518" />
        <Path
          d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"
          stroke="#F5C518"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    )
  }
  if (kind === 'rain') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path
          d="M7 17c-2.8 0-5-2.2-5-5s2.3-5 5.1-5c.8-2.4 3-4 5.6-4 3.3 0 6 2.7 6 6v.1C21.4 9.6 23 11.5 23 14c0 2.8-2.2 5-5 5H7z"
          fill="#BFC6CF"
        />
        <Path
          d="M8 22l1.2-2M12 22l1.2-2M16 22l1.2-2"
          stroke="#5A8DEE"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    )
  }
  if (kind === 'storm') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path
          d="M7 17c-2.8 0-5-2.2-5-5s2.3-5 5.1-5c.8-2.4 3-4 5.6-4 3.3 0 6 2.7 6 6v.1C21.4 9.6 23 11.5 23 14c0 2.8-2.2 5-5 5H7z"
          fill="#BFC6CF"
        />
        <Path d="M11 14l-2 4h3l-1 4 4-5h-3l2-3h-3z" fill="#F5C518" />
      </Svg>
    )
  }
  // cloudy
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M7 17c-2.8 0-5-2.2-5-5s2.3-5 5.1-5c.8-2.4 3-4 5.6-4 3.3 0 6 2.7 6 6v.1C21.4 9.6 23 11.5 23 14c0 2.8-2.2 5-5 5H7z"
        fill="#BFC6CF"
      />
    </Svg>
  )
}

/** ===== Styles ===== */

const BG = '#2C3545'
const CARD = '#D9D9D9'
const WHITE = '#FFFFFF'
const MUTED = 'rgba(255,255,255,0.8)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG
  },
  animationWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0
  },
  animation: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44,53,69,0.6)' // escurece a animação
  },
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
    color: WHITE,
    fontSize: 20,
    fontWeight: '700'
  },
  scroll: {
    zIndex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28
  },
  centerBlock: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16
  },
  city: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12
  },
  temp: {
    color: WHITE,
    fontSize: 86,
    fontWeight: '800',
    lineHeight: 92,
    marginTop: 4
  },
  tempSuffix: {
    fontSize: 40,
    fontWeight: '700'
  },
  subtitle: {
    color: MUTED,
    fontSize: 16,
    marginTop: 6
  },
  arrowUp: { color: WHITE, fontWeight: '700' },
  arrowDown: { color: WHITE, fontWeight: '700' },
  aqiPill: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#B3D1FF',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  aqiText: {
    color: '#2C3545',
    fontWeight: '700'
  },

  alertPill: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#F4A701',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  alertText: {
    color: '#2C3545',
    fontWeight: '700'
  },

  card: {
    marginTop: 20,
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  cardTitle: {
    color: '#2C3545',
    fontWeight: '700'
  },
  row: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C3C7CE'
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  rowLabel: {
    color: '#2C3545',
    fontWeight: '700'
  },
  rowDesc: {
    color: '#4A5568',
    fontWeight: '400'
  },
  rowTemp: {
    color: '#2C3545',
    fontWeight: '600'
  }
})

