// ChooseDeliveryModeScreen.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function OrderByVesselScreen() {
  const navigation: any = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const handleNow = () => {
    navigation.navigate('SelectProducts', {
      orderType: 'delivery_now'
    })
  }

  const handleSchedule = () => {
    navigation.navigate('ScheduleOrder')
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Fazer pedido</Text>

        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.questionText}>
          Você gostaria do pedido para agora ou quer agendar para outro
          dia/horário?
        </Text>

        <TouchableOpacity
          style={[styles.optionButton, styles.optionButtonFilled]}
          onPress={handleNow}
        >
          <Text style={styles.optionButtonTextFilled}>AGORA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, styles.optionButtonOutline]}
          onPress={handleSchedule}
        >
          <Text style={styles.optionButtonTextOutline}>AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202737'
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 40
  },
  optionButton: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16
  },
  optionButtonFilled: {
    backgroundColor: '#FFFFFF'
  },
  optionButtonOutline: {
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  optionButtonTextFilled: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  },
  optionButtonTextOutline: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  }
})

