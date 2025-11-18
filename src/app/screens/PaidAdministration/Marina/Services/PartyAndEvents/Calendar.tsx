import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function CalendarScreen() {
  const navigation: any = useNavigation()

  // Dados dos eventos do mês de novembro/2025
  const eventos = [
    { dia: 5, descricao: 'Evento Marina Sunset' },
    { dia: 11, descricao: 'Evento Corporativo XPTO' },
    { dia: 17, descricao: 'Celebração Náutica' },
    { dia: 22, descricao: 'Festa de Aniversário' },
    { dia: 25, descricao: 'Casamento na Marina' },
    { dia: 28, descricao: 'Show Acústico na Orla' }
  ]

  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null)

  const diasComEventos = eventos.map(e => e.dia)

  const handleDiaPress = (dia: number) => {
    setDiaSelecionado(dia)
  }

  const eventosFiltrados = diaSelecionado
    ? eventos.filter(e => e.dia === diaSelecionado)
    : eventos

  const goBack = () => navigation.goBack()

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Calendário de eventos</Text>

        {/* Botão invisível */}
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>
          Confira os eventos programados para os próximos meses.
        </Text>

        {/* CALENDÁRIO */}
        <View style={styles.calendarBox}>
          {/* Mês */}
          <View style={styles.monthRow}>
            <Ionicons name="chevron-back" size={20} color="#999" />
            <Text style={styles.monthText}>Novembro</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>

          {/* Cabeçalho dos dias */}
          <View style={styles.weekRow}>
            {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map(dia => (
              <Text key={dia} style={styles.weekText}>
                {dia}
              </Text>
            ))}
          </View>

          {/* Dias do mês (Novembro 2025 começa no sábado, dia 1) */}
          <View style={styles.daysGrid}>
            {/* Espaços antes do dia 1 (domingo a sexta) */}
            {Array.from({ length: 5 }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.dayCell} />
            ))}

            {/* Dias 1 a 30 */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dia = i + 1
              const temEvento = diasComEventos.includes(dia)
              const selecionado = diaSelecionado === dia

              return (
                <TouchableOpacity
                  key={dia}
                  style={[styles.dayCell, selecionado && styles.daySelected]}
                  onPress={() => handleDiaPress(dia)}
                >
                  <Text
                    style={[styles.dayText, temEvento && styles.dayWithEvent]}
                  >
                    {dia}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Lista de eventos */}
        <View style={styles.eventListBox}>
          {eventosFiltrados.map((e, index) => (
            <Text key={index} style={styles.eventItem}>
              {e.dia} — {e.descricao}
            </Text>
          ))}

          {eventosFiltrados.length === 0 && (
            <Text style={styles.noEventText}>Nenhum evento neste dia.</Text>
          )}
        </View>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
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
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 10
  },
  calendarBox: {
    backgroundColor: '#E7E6E6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  monthText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444'
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  weekText: {
    width: '14%',
    textAlign: 'center',
    color: '#666',
    fontWeight: '600'
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 2
  },
  dayText: {
    color: '#333',
    fontSize: 15
  },
  dayWithEvent: {
    color: '#D62828', // vermelho
    fontWeight: '700'
  },
  daySelected: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 8
  },
  eventListBox: {
    marginTop: 10
  },
  eventItem: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 6
  },
  noEventText: {
    color: '#AAA',
    fontSize: 15,
    marginTop: 10
  }
})

