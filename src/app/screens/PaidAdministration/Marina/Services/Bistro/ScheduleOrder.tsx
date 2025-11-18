// ScheduleDeliveryScreen.tsx
import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isBeforeToday(date: Date, today: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return d.getTime() < t.getTime()
}

function formatDateBR(date: Date) {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export default function ScheduleDeliveryScreen() {
  const navigation: any = useNavigation()

  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const canGoPrevMonth = useMemo(() => {
    // não permite voltar para mês anterior ao mês atual
    if (
      currentMonth.getFullYear() < now.getFullYear() ||
      (currentMonth.getFullYear() === now.getFullYear() &&
        currentMonth.getMonth() <= now.getMonth())
    ) {
      return false
    }
    return true
  }, [currentMonth, now])

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return
    setSelectedDate(null)
    setSelectedTime(null)
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
  }

  // Monta os dias do calendário
  const daysMatrix = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const startWeekDay = firstDayOfMonth.getDay() // 0 domingo, 6 sábado

    const daysArray: (Date | null)[] = []
    // preenchendo espaços em branco até o primeiro dia
    for (let i = 0; i < startWeekDay; i++) {
      daysArray.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day))
    }
    return daysArray
  }, [currentMonth])

  // Gera horários de 30 em 30 minutos filtrando passados quando a data é hoje
  const timeSlots = useMemo(() => {
    if (!selectedDate) return []

    const slots: string[] = []
    for (let hour = 6; hour < 22; hour++) {
      for (let minute of [0, 30]) {
        const dateTime = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          hour,
          minute,
          0,
          0
        )

        // não permitir data/hora no passado
        if (dateTime.getTime() >= now.getTime()) {
          const hh = String(hour).padStart(2, '0')
          const mm = String(minute).padStart(2, '0')
          slots.push(`${hh}:${mm}`)
        }
      }
    }
    return slots
  }, [selectedDate, now])

  const handleSelectDate = (date: Date | null) => {
    if (!date) return
    // não permite datas anteriores a hoje
    if (isBeforeToday(date, now)) return

    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
  }

  const canAdvance = !!selectedDate && !!selectedTime

  const handleAdvance = () => {
    if (!selectedDate || !selectedTime) return

    const formattedDate = formatDateBR(selectedDate)

    navigation.navigate('SelectProducts', {
      orderType: 'delivery_scheduled',
      scheduledDate: formattedDate,
      scheduledTime: selectedTime
    })
  }

  const monthLabel = useMemo(() => {
    const monthNames = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ]
    return `${monthNames[currentMonth.getMonth()]} de ${currentMonth.getFullYear()}`
  }, [currentMonth])

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Fazer pedido</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionText}>
          Pra quando você gostaria de agendar?
        </Text>

        {/* CALENDÁRIO */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={handlePrevMonth}
              disabled={!canGoPrevMonth}
              style={!canGoPrevMonth && { opacity: 0.3 }}
            >
              <Ionicons name="chevron-back" size={20} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.calendarMonthText}>{monthLabel}</Text>

            <TouchableOpacity onPress={handleNextMonth}>
              <Ionicons name="chevron-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysRow}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(letter => (
              <Text key={letter} style={styles.weekDayText}>
                {letter}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {daysMatrix.map((date, index) => {
              if (!date) {
                return <View key={index} style={styles.dayCellEmpty} />
              }

              const disabled = isBeforeToday(date, now)
              const selected = selectedDate && isSameDay(selectedDate, date)

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    selected && styles.dayCellSelected,
                    disabled && styles.dayCellDisabled
                  ]}
                  disabled={disabled}
                  onPress={() => handleSelectDate(date)}
                >
                  <Text
                    style={[
                      styles.dayCellText,
                      selected && styles.dayCellTextSelected,
                      disabled && styles.dayCellTextDisabled
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* HORÁRIOS */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.fieldLabel}>Horário</Text>
          {!selectedDate && (
            <Text style={styles.helperText}>
              Selecione uma data para ver os horários disponíveis.
            </Text>
          )}

          {selectedDate && timeSlots.length === 0 && (
            <Text style={styles.helperText}>
              Não há horários disponíveis para hoje. Selecione outra data.
            </Text>
          )}

          {selectedDate && timeSlots.length > 0 && (
            <View style={styles.timesContainer}>
              {timeSlots.map(time => {
                const isSelected = selectedTime === time
                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeBadge,
                      isSelected && styles.timeBadgeSelected
                    ]}
                    onPress={() => handleSelectTime(time)}
                  >
                    <Text
                      style={[
                        styles.timeBadgeText,
                        isSelected && styles.timeBadgeTextSelected
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* BOTÃO AVANÇAR */}
      <TouchableOpacity
        style={[styles.bottomButton, !canAdvance && { opacity: 0.5 }]}
        onPress={handleAdvance}
        activeOpacity={canAdvance ? 0.8 : 1}
      >
        <Text style={styles.bottomButtonText}>AVANÇAR</Text>
      </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16
  },
  // CALENDÁRIO
  calendarCard: {
    backgroundColor: '#30384A',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  calendarMonthText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#B0B5C3',
    fontSize: 12,
    fontWeight: '600'
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  dayCellEmpty: {
    width: `${100 / 7}%`,
    height: 36,
    marginVertical: 2
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 36,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18
  },
  dayCellSelected: {
    backgroundColor: '#FFFFFF'
  },
  dayCellDisabled: {
    opacity: 0.3
  },
  dayCellText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  dayCellTextSelected: {
    color: '#1E2340',
    fontWeight: '700'
  },
  dayCellTextDisabled: {
    color: '#B0B5C3'
  },
  // HORÁRIOS
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8
  },
  helperText: {
    color: '#B0B5C3',
    fontSize: 13
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  timeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF55',
    marginRight: 8,
    marginBottom: 8
  },
  timeBadgeSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF'
  },
  timeBadgeText: {
    color: '#FFFFFF',
    fontSize: 13
  },
  timeBadgeTextSelected: {
    color: '#1E2340',
    fontWeight: '700'
  },
  // BOTÃO
  bottomButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center'
  },
  bottomButtonText: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  }
})

