// SelectProductsScreen.tsx
import React, { useMemo, useState } from 'react'
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

type RouteParams = {
  orderType: OrderType
  local?: string
  tableNumber?: string
  scheduledDate?: string
  scheduledTime?: string
}

type ProductCategory = 'pratos' | 'petiscos' | 'bebidas' | 'sobremesas'

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Filé de peixe grelhado',
    description: 'Filé de peixe fresco com legumes salteados.',
    price: 69.9,
    category: 'pratos'
  },
  {
    id: '2',
    name: 'Risoto de camarão',
    description: 'Arroz arbóreo cremoso com camarões selecionados.',
    price: 79.9,
    category: 'pratos'
  },
  {
    id: '3',
    name: 'Isca de peixe',
    description: 'Iscas crocantes com molho tártaro.',
    price: 49.9,
    category: 'petiscos'
  },
  {
    id: '4',
    name: 'Batata rústica',
    description: 'Batatas com páprica e alecrim.',
    price: 34.9,
    category: 'petiscos'
  },
  {
    id: '5',
    name: 'Refrigerante lata',
    description: '350ml, sabores variados.',
    price: 7.5,
    category: 'bebidas'
  },
  {
    id: '6',
    name: 'Suco natural',
    description: 'Laranja, limão ou abacaxi.',
    price: 12.9,
    category: 'bebidas'
  },
  {
    id: '7',
    name: 'Petit gâteau',
    description: 'Bolo de chocolate com sorvete de creme.',
    price: 29.9,
    category: 'sobremesas'
  },
  {
    id: '8',
    name: 'Taça de frutas',
    description: 'Frutas da estação com calda leve.',
    price: 24.9,
    category: 'sobremesas'
  }
]

const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: 'pratos', label: 'Pratos' },
  { key: 'petiscos', label: 'Petiscos' },
  { key: 'bebidas', label: 'Bebidas' },
  { key: 'sobremesas', label: 'Sobremesas' }
]

export default function SelectProductsScreen() {
  const navigation: any = useNavigation()
  const route = useRoute()
  const params = route.params as RouteParams

  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>('pratos')
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const handleChangeQuantity = (productId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 0
      const next = current + delta
      if (next <= 0) {
        const clone = { ...prev }
        delete clone[productId]
        return clone
      }
      return { ...prev, [productId]: next }
    })
  }

  const filteredProducts = useMemo(
    () => PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  const selectedItems = useMemo(
    () =>
      PRODUCTS.filter(p => {
        const q = quantities[p.id]
        return q && q > 0
      }).map(p => ({
        ...p,
        quantity: quantities[p.id],
        total: (quantities[p.id] || 0) * p.price
      })),
    [quantities]
  )

  const totalAmount = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.total, 0),
    [selectedItems]
  )

  const hasItems = selectedItems.length > 0

  const handleFinishOrder = () => {
    if (!hasItems) return

    navigation.navigate('OrderSummary', {
      orderType: params.orderType,
      local: params.local,
      tableNumber: params.tableNumber,
      scheduledDate: params.scheduledDate,
      scheduledTime: params.scheduledTime,
      items: selectedItems,
      totalAmount
    })
  }

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

    return 'Selecione os itens do pedido'
  }

  const formatCurrency = (value: number) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cardápio</Text>

        <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
          {/* X invisível, mas clicável */}
          <Ionicons name="close" size={22} color="transparent" />
        </TouchableOpacity>
      </View>

      {/* CONTEXTO + TOTAL */}
      <View style={styles.topInfoWrapper}>
        <Text style={styles.orderContextText}>{renderOrderContext()}</Text>

        <View style={styles.totalBadge}>
          <Text style={styles.totalLabel}>Total do pedido</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
        </View>
      </View>

      {/* CATEGORIAS (chips baixos) */}
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map(cat => {
          const isActive = cat.key === activeCategory
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive
              ]}
              onPress={() => setActiveCategory(cat.key)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  isActive && styles.categoryChipTextActive
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* LISTA DE PRODUTOS */}
      <ScrollView
        style={styles.productsList}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {filteredProducts.map(product => {
          const quantity = quantities[product.id] || 0
          const isSelected = quantity > 0

          return (
            <View
              key={product.id}
              style={[
                styles.productCard,
                isSelected && styles.productCardSelected
              ]}
            >
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
                <Text style={styles.productPrice}>
                  {formatCurrency(product.price)}
                </Text>
              </View>

              <View style={styles.productActions}>
                <TouchableOpacity
                  style={[styles.qtyButton, quantity === 0 && { opacity: 0.4 }]}
                  onPress={() => {
                    if (quantity === 0) return
                    handleChangeQuantity(product.id, -1)
                  }}
                  activeOpacity={quantity > 0 ? 0.7 : 1}
                >
                  <Ionicons name="remove" size={18} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => handleChangeQuantity(product.id, 1)}
                >
                  <Ionicons name="add" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}

        {filteredProducts.length === 0 && (
          <Text style={styles.emptyText}>
            Nenhum item disponível nesta categoria.
          </Text>
        )}
      </ScrollView>

      {/* BOTÃO FINALIZAR */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.finishButton, !hasItems && { opacity: 0.4 }]}
          onPress={handleFinishOrder}
          activeOpacity={hasItems ? 0.7 : 1}
        >
          <Text style={styles.finishButtonText}>FINALIZAR PEDIDO</Text>
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
  topInfoWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 8
  },
  orderContextText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 8
  },
  totalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6
  },
  totalLabel: {
    color: '#1E2340',
    fontSize: 11,
    fontWeight: '600'
  },
  totalValue: {
    color: '#1E2340',
    fontSize: 16,
    fontWeight: '700'
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12
  },
  categoryChip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8
  },
  categoryChipActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF'
  },
  categoryChipText: {
    color: '#FFFFFF',
    fontSize: 13
  },
  categoryChipTextActive: {
    color: '#1E2340',
    fontWeight: '700'
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 16
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#30384A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12
  },
  productCardSelected: {
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  productInfo: {
    flex: 1,
    paddingRight: 12
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4
  },
  productDescription: {
    color: '#B0B5C3',
    fontSize: 12,
    marginBottom: 6
  },
  productPrice: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  productActions: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 4
  },
  emptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 13
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8
  },
  finishButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center'
  },
  finishButtonText: {
    color: '#1E2340',
    fontSize: 14,
    fontWeight: '700'
  }
})

