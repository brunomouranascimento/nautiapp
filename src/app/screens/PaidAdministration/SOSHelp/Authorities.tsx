import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function SosAuthorities() {
  const navigation: any = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  const confirmCall = (label: string, phone: string) => {
    Alert.alert(
      'Confirmar ligação',
      `Deseja ligar para ${label}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Ligar',
          onPress: () => Linking.openURL(`tel:${phone}`)
        }
      ],
      { cancelable: true }
    )
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

        <Text style={styles.headerTitle}>Contato com autoridades</Text>

        {/* ícone transparente */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* BOTÕES */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.9}
          onPress={() => confirmCall('Marinha (Salvamar)', '185')}
        >
          <View style={styles.callButtonLeft}>
            <MaterialCommunityIcons
              name="ship-wheel"
              size={20}
              color="#1F2633"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.callButtonText}>LIGAR PARA MARINHA</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.9}
          onPress={() => confirmCall('Bombeiros', '193')}
        >
          <View style={styles.callButtonLeft}>
            <MaterialCommunityIcons
              name="fire-truck"
              size={20}
              color="#1F2633"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.callButtonText}>LIGAR PARA BOMBEIROS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.9}
          onPress={() => confirmCall('Polícia', '190')}
        >
          <View style={styles.callButtonLeft}>
            <MaterialCommunityIcons
              name="shield-star-outline"
              size={20}
              color="#1F2633"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.callButtonText}>LIGAR PARA POLÍCIA</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.9}
          onPress={() => confirmCall('SAMU', '192')}
        >
          <View style={styles.callButtonLeft}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={20}
              color="#1F2633"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.callButtonText}>LIGAR PARA SAMU</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const DARK_BG = '#1F2633'
const BUTTON_BG = '#B7D7FF'
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16
  },
  callButton: {
    backgroundColor: BUTTON_BG,
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    justifyContent: 'center'
  },
  callButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  callButtonText: {
    color: '#1F2633',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.6
  }
})

