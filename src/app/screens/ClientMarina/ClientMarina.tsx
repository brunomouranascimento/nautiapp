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

  const Field = ({ label, value, placeholder }: any) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        editable={false}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Marina</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.image}
        />

        <Field label="UF" value="" placeholder="UF" />
        <Field label="Cidade" value="" placeholder="Cidade" />
        <Field label="Marina" value="" placeholder="Nome da marina" />
        <Field label="Endereço" value="" placeholder="Endereço" />
        <Field label="Telefone" value="" placeholder="Telefone" />
        <Field label="Site" value="" placeholder="Site" />

        <View style={styles.row}>
          <View style={[styles.rowField, { marginRight: 8 }]}>
            <Field label="Latitude" value="" placeholder="Latitude" />
          </View>
          <View style={[styles.rowField, { marginLeft: 8 }]}>
            <Field label="Longitude" value="" placeholder="Longitude" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3A4D'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#2E3A4D'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  headerSpacer: {
    width: 22
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
    backgroundColor: '#4A5A72',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16
  },
  rowField: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})
