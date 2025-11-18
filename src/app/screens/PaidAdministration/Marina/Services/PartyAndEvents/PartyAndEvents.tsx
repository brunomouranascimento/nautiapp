import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function FestasEventosScreen() {
  const navigation: any = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  const goTo = (screen: string) => {
    navigation.navigate(screen)
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Festas & Eventos</Text>

        {/* Botão X transparente (mesma área, não aparece visualmente) */}
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>O que você gostaria de fazer?</Text>

        {/* Calendário de eventos */}
        <TouchableOpacity style={styles.card} onPress={() => goTo('Calendar')}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={26}
              color="#fff"
            />
          </View>
          <Text style={styles.cardText}>Ver calendário de eventos</Text>
          <Ionicons name="chevron-forward" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Orçamentos */}
        <TouchableOpacity style={styles.card} onPress={() => goTo('Budgets')}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={26}
              color="#fff"
            />
          </View>
          <Text style={styles.cardText}>Orçamentos</Text>
          <Ionicons name="chevron-forward" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Nossa estrutura */}
        <TouchableOpacity style={styles.card} onPress={() => goTo('Structure')}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="home-outline"
              size={26}
              color="#fff"
            />
          </View>
          <Text style={styles.cardText}>Nossa estrutura</Text>
          <Ionicons name="chevron-forward" size={22} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3545'
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginBottom: 16
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  cardText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  }
})

