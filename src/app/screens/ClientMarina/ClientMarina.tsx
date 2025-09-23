import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function MarinaScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Header branco */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1C2431" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Marina</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color="#1C2431" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Foto da Marina */}
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.image}
        />

        {/* Campos */}
        <View style={styles.field}>
          <Text style={styles.label}>UF</Text>
          <TextInput style={styles.input} editable={false} value="RS" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="Porto Alegre"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Marina</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="Marina do Forte 123"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="Av. do Forte 281"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="(51) 3289-4523"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Site</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="http://www.marinadolago123.com.br"
          />
        </View>

        {/* Latitude e Longitude lado a lado */}
        <View style={styles.row}>
          <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput style={styles.input} editable={false} value="30°33'00" />
          </View>
          <View style={[styles.field, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput style={styles.input} editable={false} value="30°33'00" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2431'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2A44'
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24
  },
  field: {
    width: '100%',
    marginBottom: 16
  },
  label: {
    color: '#A0AEC0',
    marginBottom: 6
  },
  input: {
    backgroundColor: '#2D3748',
    borderRadius: 12,
    padding: 12,
    color: '#fff'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})

