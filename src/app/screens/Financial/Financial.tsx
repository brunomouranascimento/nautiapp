import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const screenWidth = Dimensions.get('window').width

const MOCK_DATA = [
  {
    mes: 'Jan',
    movimentacoes: 20,
    categoria: 'Em atraso',
    quantidade: 10,
    cor: '#FF6384'
  },
  {
    mes: 'Fev',
    movimentacoes: 35,
    categoria: 'Parcelas',
    quantidade: 20,
    cor: '#36A2EB'
  },
  {
    mes: 'Mar',
    movimentacoes: 25,
    categoria: 'Valores',
    quantidade: 15,
    cor: '#FFCE56'
  },
  {
    mes: 'Abr',
    movimentacoes: 40,
    categoria: 'Boletos',
    quantidade: 30,
    cor: 'lightgreen'
  }
]

const FILTROS = ['Todos', 'Em atraso', 'Parcelas', 'Valores', 'Boletos']

const Financial = () => {
  const [filtro, setFiltro] = useState('Todos')
  const navigation = useNavigation()

  const dadosFiltrados =
    filtro === 'Todos'
      ? MOCK_DATA
      : MOCK_DATA.filter(item => item.categoria === filtro)

  const dadosLinha = {
    labels: dadosFiltrados.map(item => item.mes),
    datasets: [{ data: dadosFiltrados.map(item => item.movimentacoes) }]
  }

  const dadosPizza = dadosFiltrados.map(item => ({
    name: item.categoria,
    population: item.quantidade,
    color: item.cor,
    legendFontColor: '#000',
    legendFontSize: 12
  }))

  const totalMovimentacoes = dadosFiltrados.reduce(
    (acc, cur) => acc + cur.movimentacoes,
    0
  )
  const tempoMedio = (totalMovimentacoes * 2).toFixed(1)

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitle}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleName}>Financeiro</Text>
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {/* Filtros */}
      <View style={styles.filtros}>
        {FILTROS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filtroBtn, filtro === f && styles.filtroAtivo]}
            onPress={() => setFiltro(f)}
          >
            <Text
              style={[
                styles.filtroText,
                filtro === f && styles.filtroTextAtivo
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gráfico de Linhas em card */}
      <View style={styles.graficoCard}>
        <Text style={styles.graficoTitle}>Movimentações por mês</Text>
        <LineChart
          data={dadosLinha}
          width={screenWidth - 48}
          height={220}
          chartConfig={chartConfig}
          style={styles.grafico}
          bezier
          withInnerLines={false}
          withOuterLines={false}
        />
      </View>

      {/* Gráfico de Pizza em card */}
      <View style={styles.graficoCard}>
        <Text style={styles.graficoTitle}>Distribuição por categoria</Text>
        <PieChart
          data={dadosPizza}
          width={screenWidth - 48}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </ScrollView>
  )
}

const chartConfig = {
  backgroundGradientFrom: '#4E5F78',
  backgroundGradientTo: '#4E5F78',
  color: () => `rgba(0, 123, 255)`,
  strokeWidth: 2,
  decimalPlaces: 0,
  labelColor: () => '#FFFFFF'
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#2C3545' },

  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 50
  },
  headerTitleName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  },

  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  card: {
    flex: 1,
    backgroundColor: '#3A4258',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center'
  },
  cardTitle: { fontSize: 14, color: '#fff', textAlign: 'center' },
  cardValue: { fontSize: 18, fontWeight: 'bold', marginTop: 4, color: '#fff' },

  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16
  },
  filtroBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#3A4258',
    marginBottom: 15,
    marginRight: 2
  },
  filtroAtivo: { backgroundColor: '#007BFF' },
  filtroText: { color: '#fff', fontWeight: 'bold' },
  filtroTextAtivo: { color: '#fff' },

  graficoCard: {
    backgroundColor: '#4E5F78',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center'
  },
  graficoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff'
  },
  grafico: { borderRadius: 16, backgroundColor: '#4E5F78' }
})

export default Financial

