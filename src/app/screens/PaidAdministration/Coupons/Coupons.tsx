import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { useNavigation } from '@react-navigation/native'

export default function CouponsScreen() {
  const navigation: any = useNavigation()

  const goBack = () => navigation.goBack()

  const coupons = [
    {
      store: 'Centauro',
      image: require('../../../assets/centauro.png'),
      discount: '10% OFF em toda a loja',
      code: 'NAUTI10'
    },
    {
      store: 'Amazon',
      image: require('../../../assets/amazon.png'),
      discount: 'R$ 20 OFF em compras acima de R$ 150',
      code: 'NAUTIAMZ20'
    },
    {
      store: 'Kabum',
      image: require('../../../assets/kabum.png'),
      discount: '5% OFF em eletrônicos selecionados',
      code: 'NAUTIKBM5'
    },
    {
      store: 'Nike',
      image: require('../../../assets/nike.png'),
      discount: '15% OFF em produtos lifestyle',
      code: 'NAUTINIKE15'
    },
    {
      store: 'iFood',
      image: require('../../../assets/ifood.png'),
      discount: '12 reais OFF no seu pedido',
      code: 'NAUTIFOOD12'
    },
    {
      store: 'Decathlon',
      image: require('../../../assets/decathlon.png'),
      discount: '10% OFF em itens de camping',
      code: 'NAUTICAMP10'
    },
    {
      store: 'Netshoes',
      image: require('../../../assets/netshoes.png'),
      discount: 'Frete grátis + 8% OFF',
      code: 'NAUTINET8'
    },
    {
      store: 'Renner',
      image: require('../../../assets/renner.png'),
      discount: 'R$ 25 de desconto em moda casual',
      code: 'NAUTIRENNER25'
    }
  ]

  const copyCode = (code: string) => {
    Clipboard.setStringAsync(code)
    Alert.alert('Cupom copiado!', `O código ${code} foi copiado.`)
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

        <Text style={styles.headerTitle}>Cupons e descontos</Text>

        {/* X transparente */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.description}>
          Aproveite os benefícios Nautisystem, utilize os cupons parceiros e
          obtenha descontos.
        </Text>

        {coupons.map((item, index) => (
          <View key={index} style={styles.couponCard}>
            <View style={styles.leftRow}>
              <Image source={item.image} style={styles.logo} />
              <View>
                <Text style={styles.discountText}>{item.discount}</Text>
                <Text style={styles.codeText}>Usando o cupom {item.code}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => copyCode(item.code)}>
              <Ionicons name="copy-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const DARK_BG = '#1F2633'
const CARD_BG = '#262F4A'
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
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  description: {
    color: WHITE,
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20
  },
  couponCard: {
    backgroundColor: CARD_BG,
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  logo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    marginRight: 12
  },
  discountText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700'
  },
  codeText: {
    color: '#AEB6CE',
    fontSize: 12,
    marginTop: 2
  }
})

