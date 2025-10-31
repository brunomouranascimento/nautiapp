import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Pet = { id: string; name: string; breed: string; photo?: string }

export default function PetsListScreen() {
  const navigation: any = useNavigation()

  const pets: Pet[] = [
    {
      id: '1',
      name: 'Thor',
      breed: 'Pinscher',
      photo: 'https://picsum.photos/seed/thor/120'
    },
    {
      id: '2',
      name: 'Thanos',
      breed: 'Yorkshire',
      photo: 'https://picsum.photos/seed/thanos/120'
    }
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Meus pets</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cardList}>
          {pets.map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.petCard}
              onPress={() => navigation.navigate('PetsForm', { pet: p })}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <Image
                  source={{
                    uri: p.photo || 'https://picsum.photos/seed/pet/120'
                  }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.petName}>{p.name}</Text>
                  <Text style={styles.petBreed}>{p.breed}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botão flutuante arredondado + barra de cadastro */}
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.roundedGhost}
          onPress={() => navigation.navigate('ReportLostPet')}
        >
          <Text style={styles.roundedGhostText}>REPORTAR PET PERDIDO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBar}
          onPress={() => navigation.navigate('PetsForm')}
        >
          <Text style={styles.primaryText}>CADASTRAR PET</Text>
        </TouchableOpacity>
      </View>
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
  content: { paddingHorizontal: 20 },
  cardList: { marginTop: 12, padding: 8, backgroundColor: 'transparent' },
  petCard: {
    backgroundColor: '#1F2738',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B4657'
  },
  petName: { color: '#FFFFFF', fontWeight: '700' },
  petBreed: { color: '#C9D1D9' },

  bottomArea: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  roundedGhost: {
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 26
  },
  roundedGhostText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 1 },
  primaryBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryText: { color: '#001A70', fontWeight: '800', letterSpacing: 1 }
})

