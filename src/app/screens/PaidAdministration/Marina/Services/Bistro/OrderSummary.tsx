// OrderSummaryScreen.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

type OrderType = 'table' | 'delivery_now' | 'delivery_scheduled'

type SummaryItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  quantity: number
  total: number
}

type RouteParams = {
  orderType: OrderType
  local?: string
  tableNumber?: string
  scheduledDate?: string
  scheduledTime?: string
  items: SummaryItem[]
  totalAmount: number
}

export default function OrderSummaryScreen() {
  const navigation: any = useNavigation()
  const route = useRoute()
  const params = route.params as RouteParams

  const { items, totalAmount } = params

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleClose = () => {
    // volta para a tela inicial do bistrô
    navigation.navigate('BistroHome') // ajuste se o nome da rota for outro
  }

  const handleConfirmOrder = () => {
    // aqui entraria a chamada de API para criar o pedido
    // por enquanto apenas volta para a tela inicial de bistrô
    navigation.navigate('Bistro')
  }

  const formatCurrency = (value: number) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`

  const renderOrderContext = () => {
    if (params.orderType === 'table' && params.local && params.tableNumber) {
      return `Mesa ${params.tableNumber} · ${params.local}`
    }

    if (params.orderType === 'delivery_now') {
      return 'Delivery para embarcação · Agora'
    }

    if (
      params.orderType === 'delivery_scheduled' &&
      params.scheduledDate &&
      params.scheduledTime
    ) {
      return `Delivery agendado · ${params.scheduledDate} às ${params.scheduledTime}`
    }

    return 'Detalhes do pedido'
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Resumo do pedido</Text>

        <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
          {/* X invisível, mantendo área de clique */}
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* CONTEXTO */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Informações do pedido</Text>
          <Text style={styles.sectionText}>{renderOrderContext()}</Text>
        </View>

        {/* ITENS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Itens selecionados</Text>

          {items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>
                  {item.quantity} x {formatCurrency(item.price)}
                </Text>
              </View>

              <Text style={styles.itemTotal}>{formatCurrency(item.total)}</Text>
            </View>
          ))}

          {items.length === 0 && (
            <Text style={styles.emptyText}>
              Nenhum item selecionado. Volte e escolha os produtos.
            </Text>
          )}
        </View>

        {/* TOTAL */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total do pedido</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
        </View>
      </ScrollView>

      {/* BOTÃO CONFIRMAR */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, items.length === 0 && { opacity: 0.4 }]}
          onPress={items.length > 0 ? handleConfirmOrder : undefined}
          activeOpacity={items.length > 0 ? 0.7 : 1}
        >
          <Text style={styles.confirmButtonText}>CONCLUIR PEDIDO</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: 'space-between'
  },
  iconButton: {
    padding: 8
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    flex: 1,
    paddingHorizontal: 24
  },
  sectionCard: {
    backgroundColor: '#30384A',
    borderRadius: 16,
    padding: 16,
    marginTop: 16
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8
  },
  sectionText: {
    color: '#B0B5C3',
    fontSize: 13
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  itemDescription: {
    color: '#B0B5C3',
    fontSize: 12,
    marginTop: 2
  },
  itemTotal: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 8
  },
  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    alignItems: 'flex-start'
  },
  totalLabel: {
    color: '#1E2340',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4
  },
  totalValue: {
    color: '#1E2340',
    fontSize: 20,
    fontWeight: '700'
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8
  },
  confirmButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center'
  },
  confirmButtonText: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  }
})

