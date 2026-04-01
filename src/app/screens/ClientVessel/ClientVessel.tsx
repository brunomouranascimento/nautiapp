import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'

type VesselTab =
  | 'info'
  | 'protection'
  | 'maintenance'
  | 'equipment'
  | 'cleaning'
  | 'fuel'

type EquipmentGroupTab =
  | 'accessories'
  | 'additionalSafety'
  | 'required'
  | 'other'

const TABS: Array<{ key: VesselTab; label: string }> = [
  { key: 'info', label: 'Informações' },
  { key: 'protection', label: 'Proteção' },
  { key: 'maintenance', label: 'Manutenções' },
  { key: 'equipment', label: 'Equipamentos' },
  { key: 'cleaning', label: 'Limpeza' },
  { key: 'fuel', label: 'Abastecimentos' }
]

const getImageUri = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  return value.startsWith('data:') ? value : `data:image/jpeg;base64,${value}`
}

const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return '--'
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value
  }

  const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch

    return `${day}/${month}/${year}`
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '--'
  }

  return date.toLocaleDateString('pt-BR')
}

const formatCurrency = (value: string | number | null | undefined) => {
  const rawValue = String(value ?? '').trim()

  if (!rawValue) {
    return '--'
  }

  const normalizedValue = rawValue.includes(',')
    ? rawValue.replace(/\./g, '').replace(',', '.')
    : rawValue

  const numericValue = Number(normalizedValue)

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return '--'
  }

  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

const safeText = (value: unknown) => {
  const text = String(value ?? '').trim()

  return text ? text : '--'
}

const getLocationLabel = (bookcase: any) => {
  const shelf = bookcase?.shelves?.[0]
  const drawer = shelf?.drawers?.[0]
  const parts = [bookcase?.name, shelf?.name, drawer?.name].filter(Boolean)

  if (parts.length === 0) {
    return '--'
  }

  return parts.join(' | ')
}

const formatCnpj = (value: string | number | null | undefined) =>
  String(value || '')
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')

const formatCpf = (value: string | number | null | undefined) =>
  String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

const formatPhone = (value: string | number | null | undefined) => {
  const digits = String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11)

  if (!digits) {
    return ''
  }

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const getNauticalCategoryCode = (value: string | null | undefined) => {
  const normalizedValue = String(value || '').trim()

  if (!normalizedValue) {
    return '--'
  }

  const categoryMap: Record<string, string> = {
    '0': 'ARA',
    '1': 'CPA',
    '2': 'MSA',
    '3': 'MTA',
    '4': 'VLA'
  }

  if (categoryMap[normalizedValue]) {
    return categoryMap[normalizedValue]
  }

  if (normalizedValue.includes(' - ')) {
    return normalizedValue.split(' - ')[0].trim()
  }

  return normalizedValue
}

const getReferenceLabel = (
  value: string | number | null | undefined,
  labels: Record<string, string>,
  fallbackPrefix?: string
) => {
  const normalizedValue = String(value ?? '').trim()

  if (!normalizedValue) {
    return '--'
  }

  if (labels[normalizedValue]) {
    return labels[normalizedValue]
  }

  return fallbackPrefix
    ? `${fallbackPrefix} ${normalizedValue}`
    : normalizedValue
}

const getOwners = (responsibles: any[] | undefined) =>
  Array.isArray(responsibles)
    ? responsibles.map((owner, index) => ({
        id: String(owner?.ownerId || owner?.id || index),
        name: safeText(owner?.owner?.fullname),
        registration: safeText(
          formatCpf(owner?.owner?.registrationPf) ||
            formatCnpj(owner?.owner?.registrationPj)
        ),
        type: safeText(owner?.ownerType),
        principal: Boolean(owner?.principal),
        quota: Number(owner?.quota),
        percentage: `${Number(owner?.percentage) || 0}%`,
        phone: safeText(formatPhone(owner?.owner?.phones?.[0]?.connection))
      }))
    : []

const getAuthorizations = (value: any) =>
  Array.isArray(value)
    ? value.map((item, index) => ({
        id: String(item?.id || item?.peopleId || index),
        name: safeText(item?.people?.fullname || item?.people?.name),
        category: safeText(
          getNauticalCategoryCode(
            item?.people?.documentsNautical?.[0]?.category ||
              item?.people?.documentsNautical?.[0]?.limits ||
              item?.category
          )
        ),
        registration: safeText(
          item?.people?.documentsNautical?.[0]?.enrollment ||
            item?.registration ||
            item?.document
        ),
        phone: safeText(
          formatPhone(
            item?.people?.phones?.[0]?.connection ||
              item?.people?.phones?.[0]?.number ||
              item?.phone ||
              item?.mobilePhone
          )
        )
      }))
    : []

const getMaintenanceHistory = (value: any) =>
  Array.isArray(value)
    ? value.map((item, index) => ({
        id: String(item?.id || index),
        title: safeText(item?.title || item?.name || item?.service),
        date: formatDate(item?.date || item?.created || item?.createdAt),
        notes: safeText(item?.comments || item?.description)
      }))
    : []

const getCleaningHistory = (value: any) =>
  Array.isArray(value)
    ? value.map((item, index) => ({
        id: String(item?.id || index),
        type: safeText(item?.type || item?.title || item?.service),
        date: formatDate(item?.date || item?.created || item?.createdAt),
        operator: safeText(item?.operator || item?.responsible),
        notes: safeText(item?.comments || item?.description)
      }))
    : []

const getFuelHistory = (value: any) =>
  Array.isArray(value)
    ? value.map((item, index) => ({
        id: String(item?.id || index),
        date: formatDate(item?.date || item?.created || item?.createdAt),
        fuel: safeText(item?.fuel || item?.fuelType || item?.combustible),
        liters: safeText(item?.liters || item?.amount),
        value: formatCurrency(item?.value || item?.totalValue),
        operator: safeText(item?.operator || item?.responsible)
      }))
    : []

const getEquipmentGroups = (vessel: any) => {
  const source = Array.isArray(vessel?.equipments) ? vessel.equipments : []

  const groupMap: Record<string, EquipmentGroupTab> = {
    '1': 'accessories',
    '2': 'additionalSafety',
    '3': 'required',
    '4': 'other'
  }

  return source.reduce(
    (acc: Record<EquipmentGroupTab, any[]>, item: any, index: number) => {
      const groupKey =
        groupMap[String(item?.group ?? '')] ||
        ({
          Acessórios: 'accessories',
          'Salvatagem Adicional': 'additionalSafety',
          Obrigatórios: 'required',
          Outro: 'other'
        }[
          String(item?.name ?? '').trim() as
            | 'Acessórios'
            | 'Salvatagem Adicional'
            | 'Obrigatórios'
            | 'Outro'
        ] as EquipmentGroupTab | undefined)

      if (!groupKey) {
        return acc
      }

      acc[groupKey].push({
        id: String(item?.id || index),
        description: safeText(item?.description || item?.label || item?.name),
        quantity: safeText(item?.quantity),
        checked: Boolean(item?.checked),
        brand: safeText(item?.brand),
        model: safeText(item?.model),
        origin: safeText(item?.origin),
        amount: formatCurrency(item?.amount)
      })

      return acc
    },
    {
      accessories: [],
      additionalSafety: [],
      required: [],
      other: []
    }
  )
}

const DetailField = ({
  label,
  value,
  fullWidth
}: {
  label: string
  value: string
  fullWidth?: boolean
}) => (
  <View style={[styles.fieldBlock, fullWidth && styles.fieldBlockFull]}>
    <View style={styles.fieldValueBox}>
      <Text style={styles.fieldLabelInside}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  </View>
)

const SectionCard = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
)

const EmptyState = ({ label }: { label: string }) => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyStateText}>{label}</Text>
  </View>
)

export default function ClientVessel() {
  const navigation = useNavigation()
  const route = useRoute()
  const { session } = useAuth()
  const { id } = (route.params || {}) as any
  const [activeTab, setActiveTab] = React.useState<VesselTab>('info')
  const [activeEquipmentGroup, setActiveEquipmentGroup] =
    React.useState<EquipmentGroupTab>('accessories')
  const [vessel, setVessel] = React.useState<any>(null)
  const [vesselBookcase, setVesselBookcase] = React.useState<any>(null)
  const [vesselImage, setVesselImage] = React.useState<string | null>(null)
  const [isLoadingVessel, setIsLoadingVessel] = React.useState(false)
  const [hasLoadedVessel, setHasLoadedVessel] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if (!id) {
        setVessel(null)
        setVesselBookcase(null)
        setVesselImage(null)
        setIsLoadingVessel(false)
        setHasLoadedVessel(true)

        return
      }

      let isActive = true

      const loadVessel = async () => {
        setIsLoadingVessel(true)

        try {
          const headers = {
            Accept: 'application/json',
            'Accept-Language': 'pt-BR,pt;q=0.9',
            lang: 'pt-BR',
            locale: 'pt-BR',
            'x-access-token': session?.authorization || ''
          }

          const [vesselResponse, bookcaseResponse, imageResponse] =
            await Promise.all([
              fetch(`https://hml-ntslcl.nautisystem.com/vessel/${id}`, {
                headers
              }),
              fetch(
                `https://hml-ntslcl.nautisystem.com/bookcase/vessel/${id}`,
                {
                  headers
                }
              ),
              fetch(`https://hml-ntslcl.nautisystem.com/vessel/image/${id}`, {
                headers
              })
            ])

          if (vesselResponse.ok) {
            const responseText = await vesselResponse.text()
            const responseData = responseText ? JSON.parse(responseText) : null

            if (isActive && responseData?.object) {
              setVessel(responseData.object)
            }
          }

          if (bookcaseResponse.ok) {
            const responseText = await bookcaseResponse.text()
            const responseData = responseText ? JSON.parse(responseText) : null

            if (isActive && responseData?.object) {
              setVesselBookcase(responseData.object)
            }
          }

          if (imageResponse.ok) {
            const responseText = await imageResponse.text()
            let imageData: any = responseText

            if (responseText) {
              try {
                imageData = JSON.parse(responseText)
              } catch {
                imageData = responseText
              }
            }

            const resolvedImage =
              imageData?.object ||
              imageData?.object?.image ||
              imageData?.object?.document ||
              imageData?.object?.source ||
              imageData?.image ||
              imageData?.document ||
              imageData?.source ||
              (typeof imageData === 'string' ? imageData : null)

            if (isActive && resolvedImage) {
              setVesselImage(resolvedImage)
            }
          }
        } catch {
          // Mantém a tela funcional se a request falhar.
        } finally {
          if (!isActive) {
            return
          }

          setIsLoadingVessel(false)
          setHasLoadedVessel(true)
        }
      }

      loadVessel()

      return () => {
        isActive = false
      }
    }, [id, session?.authorization])
  )

  const imageUri = getImageUri(vesselImage || vessel?.image)
  const owners = getOwners(vessel?.responsibles)
  const authorizations = getAuthorizations(vessel?.conductors)
  const maintenanceHistory = getMaintenanceHistory(
    vessel?.maintenances || vessel?.maintenanceHistory
  )
  const cleaningHistory = getCleaningHistory(
    vessel?.cleaningHistory || vessel?.hygienizationHistory
  )
  const fuelHistory = getFuelHistory(vessel?.fuelHistory || vessel?.supplies)
  const equipmentGroups = getEquipmentGroups(vessel)
  const location = getLocationLabel(vesselBookcase || vessel?.bookcase)
  const slotInfo = [
    safeText((vesselBookcase || vessel?.bookcase)?.name),
    safeText((vesselBookcase || vessel?.bookcase)?.shelves?.[0]?.name),
    safeText(
      (vesselBookcase || vessel?.bookcase)?.shelves?.[0]?.drawers?.[0]?.name
    )
  ]
    .filter(item => item !== '--')
    .join('\n')

  const topSummaryFields = [
    { label: 'Chave ID', value: safeText(vessel?.identifyKey) },
    { label: 'Ano', value: safeText(vessel?.year || vessel?.ano) },
    { label: 'Reboque', value: vessel?.trailer ? 'Sim' : 'Não' },
    {
      label: 'Tipo de Reboque',
      value: safeText(vessel?.trailerType || vessel?.towType)
    },
    { label: 'Placa', value: safeText(vessel?.plate) },
    {
      label: 'Cotas',
      value: safeText(vessel?.quotasQuantity || vessel?.quotasAmount)
    },
    {
      label: 'Disponível',
      value: safeText(vessel?.quotasAvailable)
    },
    {
      label: 'Valor',
      value: formatCurrency(vessel?.quotasAmount || vessel?.value)
    }
  ]

  const infoFields = [
    {
      label: 'Registro',
      value: safeText(vessel?.enrollment || vessel?.registration)
    },
    {
      label: 'Estado',
      value: 'RS'
    },
    {
      label: 'Fabricante',
      value: safeText(vessel?.brand || vessel?.manufacturer)
    },
    { label: 'Marca', value: safeText(vessel?.brand || vessel?.manufacturer) },
    { label: 'Modelo', value: safeText(vessel?.model) },
    {
      label: 'Classificação',
      value: safeText(
        vessel?.classificationName ||
          getReferenceLabel(
            vessel?.classification,
            {
              '1': 'EC2 - Médio Porte'
            },
            'Classificação'
          )
      )
    },
    {
      label: 'Tipo de Casco',
      value: safeText(
        vessel?.hullMaterialName ||
          vessel?.helmet ||
          vessel?.hull ||
          getReferenceLabel(
            vessel?.hullMaterial,
            {
              '2': 'Fibra'
            },
            'Casco'
          )
      )
    },
    { label: 'Tamanho (pés)', value: safeText(vessel?.vesselSize) },
    {
      label: 'Capacidade',
      value: safeText(vessel?.capacity || vessel?.quantityPeople)
    },
    {
      label: 'Potência (HP)',
      value: safeText(vessel?.powerHp || vessel?.hp || vessel?.potency)
    },
    {
      label: 'Número TIE',
      value: safeText(vessel?.tieNumber || vessel?.tie || vessel?.numberTie)
    },
    {
      label: 'Validade TIE',
      value: formatDate(vessel?.tieValidity || vessel?.validityTie)
    },
    {
      label: 'Validade TR',
      value: formatDate(vessel?.trValidity || vessel?.validityTr)
    }
  ]

  const dpcValue = safeText(
    vessel?.dpc ||
      vessel?.captaincyAgency ||
      vessel?.harborName ||
      getReferenceLabel(vessel?.harbor, {}, 'DPC')
  )

  const insuranceFields = [
    { label: 'Seguradora', value: safeText(vessel?.insuranceName) },
    { label: 'Apólice', value: safeText(vessel?.insuranceNumber) },
    { label: 'Corretor', value: safeText(vessel?.insuranceContact) },
    { label: 'Validade', value: formatDate(vessel?.insuranceValidity) },
    {
      label: 'Valor Segurado',
      value: formatCurrency(vessel?.insuranceCost)
    },
    {
      label: 'Rastreador',
      value: safeText(vessel?.tracker || vessel?.trackerBrand)
    },
    { label: 'Modelo Tracker', value: safeText(vessel?.trackerModel) },
    {
      label: 'Situação Tracker',
      value: safeText(vessel?.trackerStatus || vessel?.trackerSituation)
    }
  ]

  const mockedMaintenanceHistory = [
    {
      id: 'mock-1',
      title: 'Limpeza',
      date: '17/03/2025',
      notes: 'teste'
    },
    {
      id: 'mock-2',
      title: 'Limpeza',
      date: '05/03/2025',
      notes: 'Efetuar limpeza geral e orçar polimento estético'
    },
    {
      id: 'mock-3',
      title: 'Limpeza',
      date: '05/03/2025',
      notes: 'Efetuar limpeza geral e orçar polimento estético'
    },
    {
      id: 'mock-4',
      title: '0009',
      date: '08/08/2023',
      notes: '--'
    },
    {
      id: 'mock-5',
      title: '0003',
      date: '07/03/2023',
      notes: '--'
    }
  ]

  const maintenanceSummary = [
    {
      label: 'Agendamentos',
      value: String(mockedMaintenanceHistory.length)
    },
    {
      label: 'Última manutenção',
      value: mockedMaintenanceHistory[0]?.date || '--'
    }
  ]

  const equipmentTabs: Array<{ key: EquipmentGroupTab; label: string }> = [
    { key: 'accessories', label: 'Acessórios' },
    { key: 'additionalSafety', label: 'Salvatagem Adicional' },
    { key: 'required', label: 'Obrigatórios' },
    { key: 'other', label: 'Outro' }
  ]

  const activeEquipmentItems: Array<{
    id: string
    description: string
    quantity: string
    checked: boolean
    brand: string
    model: string
    origin: string
    amount: string
  }> = equipmentGroups[activeEquipmentGroup] || []

  const cleaningSummary = [
    {
      label: 'Operações',
      value: String(cleaningHistory.length)
    },
    {
      label: 'Última operação',
      value: cleaningHistory[0]?.date || '--'
    }
  ]

  const fuelSummary = [
    {
      label: 'Abastecimentos',
      value: String(fuelHistory.length)
    },
    {
      label: 'Último abastecimento',
      value: fuelHistory[0]?.date || '--'
    }
  ]

  const renderInfoTab = () => (
    <>
      <SectionCard title="Dados Gerais">
        <View style={styles.fieldsGrid}>
          {infoFields.slice(0, 2).map(field => (
            <DetailField
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
          {infoFields.slice(2).map(field => (
            <DetailField
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Proprietários">
        {owners.length > 0 ? (
          owners.map(owner => (
            <View key={owner.id} style={styles.listCard}>
              <View style={styles.listCardHeader}>
                <Text style={styles.listTitle}>{owner.name}</Text>
                {owner.principal && (
                  <View style={styles.badgePrimary}>
                    <Text style={styles.badgePrimaryText}>Principal</Text>
                  </View>
                )}
              </View>
              <Text style={styles.listMeta}>
                <Text style={styles.listMetaStrong}>{owner.type}</Text>
                {' | '}
                <Text style={styles.listMetaStrong}>Registro:</Text>{' '}
                {owner.registration}
              </Text>
              <Text style={styles.listMeta}>
                <Text style={styles.listMetaStrong}>Cotas:</Text> {owner.quota}
                {' | '}
                <Text style={styles.listMetaStrong}>%</Text> {owner.percentage}
              </Text>
              <Text style={styles.listMeta}>
                <Text style={styles.listMetaStrong}>Telefone:</Text>{' '}
                {owner.phone}
              </Text>
            </View>
          ))
        ) : (
          <EmptyState label="Nenhum proprietário encontrado." />
        )}
      </SectionCard>

      <SectionCard title="Pessoas Pré-Autorizadas">
        {authorizations.length > 0 ? (
          authorizations.map(person => (
            <View key={person.id} style={styles.listCard}>
              <Text style={styles.listTitle}>{person.name}</Text>
              <Text style={styles.listMeta}>
                <Text style={styles.listMetaStrong}>Categoria:</Text>{' '}
                {person.category}
                {' | '}
                <Text style={styles.listMetaStrong}>Registro:</Text>{' '}
                {person.registration}
              </Text>
              <Text style={styles.listMeta}>
                <Text style={styles.listMetaStrong}>Telefone:</Text>{' '}
                {person.phone}
              </Text>
            </View>
          ))
        ) : (
          <EmptyState label="Nenhuma pessoa pré-autorizada cadastrada." />
        )}
      </SectionCard>
    </>
  )

  const renderProtectionTab = () => (
    <>
      <SectionCard title="Seguro e Rastreador">
        <View style={styles.fieldsGrid}>
          {insuranceFields.map(field => (
            <DetailField
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Valores da Embarcação">
        <View style={styles.valueRows}>
          <View style={styles.valueRow}>
            <Text style={styles.valueRowLabel}>Valor do casco</Text>
            <Text style={styles.valueRowValue}>
              {formatCurrency(vessel?.hullCost || vessel?.hullValue)}
            </Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={styles.valueRowLabel}>Motor(es) / Turbina(s)</Text>
            <Text style={styles.valueRowValue}>
              {formatCurrency(vessel?.engineCost || vessel?.engineValue)}
            </Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={styles.valueRowLabel}>Sonorização</Text>
            <Text style={styles.valueRowValue}>
              {formatCurrency(
                vessel?.soundsystemCost || vessel?.accessoriesValue
              )}
            </Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={styles.valueRowLabel}>Acessórios</Text>
            <Text style={styles.valueRowValue}>
              {formatCurrency(
                vessel?.accessoriesCost || vessel?.accessoriesValue
              )}
            </Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={styles.valueRowLabel}>Outros</Text>
            <Text style={styles.valueRowValue}>
              {formatCurrency(vessel?.othersCost || vessel?.otherValue)}
            </Text>
          </View>
        </View>
      </SectionCard>
    </>
  )

  const renderMaintenanceTab = () => (
    <>
      <SectionCard title="Resumo">
        <View style={styles.summaryRow}>
          {maintenanceSummary.map(item => (
            <View key={item.label} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Histórico de Serviços">
        {mockedMaintenanceHistory.length > 0 ? (
          mockedMaintenanceHistory.map(item => (
            <View key={item.id} style={styles.listCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listMeta}>{item.date}</Text>
              </View>
              <Text style={styles.listMeta}>{item.notes}</Text>
            </View>
          ))
        ) : (
          <EmptyState label="Nenhum histórico de manutenção disponível." />
        )}
      </SectionCard>
    </>
  )

  const renderEquipmentTab = () => (
    <SectionCard title="Equipamentos e Acessórios">
      {equipmentTabs.some(tab => equipmentGroups[tab.key]?.length > 0) ? (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.innerTabsRow}
          >
            {equipmentTabs.map(tab => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.innerTabButton,
                  activeEquipmentGroup === tab.key &&
                    styles.innerTabButtonActive
                ]}
                onPress={() => setActiveEquipmentGroup(tab.key)}
              >
                <Text
                  style={[
                    styles.innerTabButtonText,
                    activeEquipmentGroup === tab.key &&
                      styles.innerTabButtonTextActive
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {activeEquipmentGroup === 'other' ? (
            activeEquipmentItems.length > 0 ? (
              activeEquipmentItems.map(item => (
                <View key={item.id} style={styles.listCard}>
                  <Text style={styles.listTitle}>{item.description}</Text>
                  <Text style={styles.listMeta}>
                    <Text style={styles.listMetaStrong}>Quantidade:</Text>{' '}
                    {item.quantity}
                  </Text>
                  <Text style={styles.listMeta}>
                    <Text style={styles.listMetaStrong}>Marca:</Text>{' '}
                    {item.brand}
                    {' | '}
                    <Text style={styles.listMetaStrong}>Modelo:</Text>{' '}
                    {item.model}
                  </Text>
                  <Text style={styles.listMeta}>
                    <Text style={styles.listMetaStrong}>Origem:</Text>{' '}
                    {item.origin}
                    {' | '}
                    <Text style={styles.listMetaStrong}>
                      Valor Aprox.:
                    </Text>{' '}
                    {item.amount}
                  </Text>
                </View>
              ))
            ) : (
              <EmptyState label="Nenhum outro equipamento cadastrado." />
            )
          ) : activeEquipmentItems.length > 0 ? (
            activeEquipmentItems.map(item => (
              <View key={item.id} style={styles.equipmentItemRow}>
                <View
                  style={[
                    styles.equipmentIndicator,
                    item.checked && styles.equipmentIndicatorActive
                  ]}
                />
                <Text style={styles.equipmentItemLabel}>
                  {item.description}
                </Text>
                <Text style={styles.equipmentItemQuantity}>
                  {item.quantity}
                </Text>
              </View>
            ))
          ) : (
            <EmptyState label="Nenhum equipamento cadastrado nessa aba." />
          )}
        </>
      ) : (
        <EmptyState label="Nenhum equipamento ou acessório cadastrado." />
      )}
    </SectionCard>
  )

  const renderCleaningTab = () => (
    <>
      <SectionCard title="Resumo">
        <View style={styles.summaryRow}>
          {cleaningSummary.map(item => (
            <View key={item.label} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Histórico de Limpeza e Higienização">
        {cleaningHistory.length > 0 ? (
          cleaningHistory.map(item => (
            <View key={item.id} style={styles.listCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.listTitle}>{item.type}</Text>
                <Text style={styles.listMeta}>{item.date}</Text>
              </View>
              <Text style={styles.listMeta}>Operador: {item.operator}</Text>
              <Text style={styles.listMeta}>{item.notes}</Text>
            </View>
          ))
        ) : (
          <EmptyState label="Nenhum histórico de limpeza disponível." />
        )}
      </SectionCard>
    </>
  )

  const renderFuelTab = () => (
    <>
      <SectionCard title="Resumo">
        <View style={styles.summaryRow}>
          {fuelSummary.map(item => (
            <View key={item.label} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Histórico de Abastecimentos">
        {fuelHistory.length > 0 ? (
          fuelHistory.map(item => (
            <View key={item.id} style={styles.listCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.listTitle}>{item.fuel}</Text>
                <Text style={styles.listMeta}>{item.date}</Text>
              </View>
              <Text style={styles.listMeta}>Litros: {item.liters}</Text>
              <Text style={styles.listMeta}>Valor: {item.value}</Text>
              <Text style={styles.listMeta}>Operador: {item.operator}</Text>
            </View>
          ))
        ) : (
          <EmptyState label="Nenhum abastecimento disponível." />
        )}
      </SectionCard>
    </>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'info':
        return renderInfoTab()
      case 'protection':
        return renderProtectionTab()
      case 'maintenance':
        return renderMaintenanceTab()
      case 'equipment':
        return renderEquipmentTab()
      case 'cleaning':
        return renderCleaningTab()
      case 'fuel':
        return renderFuelTab()
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Embarcação</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            {isLoadingVessel ? (
              <View style={[styles.heroImage, styles.skeletonBlock]} />
            ) : (
              <Image
                source={
                  imageUri
                    ? { uri: imageUri }
                    : require('../../assets/splash-icon.png')
                }
                style={styles.heroImage}
              />
            )}

            <View style={styles.heroMain}>
              <Text style={styles.heroTitle}>
                {safeText(vessel?.name || vessel?.boatName)}
              </Text>
              <View style={styles.heroBadges}>
                <View style={styles.headerColorBadge}>
                  <Text style={styles.colorLabel}>Cor</Text>
                  <View
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: vessel?.color || '#5F6C86' }
                    ]}
                  />
                </View>
                <View style={styles.locationPill}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={14}
                    color="#E8F5FF"
                  />
                  <Text style={styles.locationPillText}>{location}</Text>
                </View>
              </View>
              <Text style={styles.heroSubtitle}>
                {safeText(vessel?.brand || vessel?.manufacturer)}{' '}
                {safeText(vessel?.model)}
              </Text>

              <View style={styles.heroMetaGrid}>
                {topSummaryFields.map(field => (
                  <DetailField
                    key={field.label}
                    label={field.label}
                    value={field.value}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.heroFooter}>
            <View style={styles.datesRow}>
              <Text style={styles.heroDate}>
                Criação: {formatDate(vessel?.created)}
              </Text>
              <Text style={[styles.heroDate, { textAlign: 'right' }]}>
                Atualização: {formatDate(vessel?.updated)}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab.key && styles.tabButtonTextActive
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {!isLoadingVessel && !vessel && hasLoadedVessel ? (
          <View style={styles.sectionCard}>
            <EmptyState label="Não foi possível carregar os dados da embarcação." />
          </View>
        ) : isLoadingVessel && !vessel ? (
          <View style={styles.sectionCard}>
            <View style={[styles.skeletonLine, styles.skeletonSectionTitle]} />
            <View style={styles.fieldsGrid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.fieldBlock}>
                  <View
                    style={[styles.skeletonLine, styles.skeletonFieldLabel]}
                  />
                  <View style={[styles.fieldValueBox, styles.skeletonBlock]} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          renderActiveTab()
        )}
      </ScrollView>
    </View>
  )
}

const BG = '#2E3A4D'
const CARD = '#253049'
const PANEL = '#36436A'
const PANEL_SOFT = '#3F4B63'
const TEXT = '#FFFFFF'
const MUTED = '#C6D0E0'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: BG
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT,
    flex: 1,
    textAlign: 'center'
  },
  headerSpacer: {
    width: 22
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  heroCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16
  },
  heroTop: {
    gap: 14
  },
  heroImage: {
    width: '100%',
    height: 210,
    borderRadius: 18,
    backgroundColor: PANEL
  },
  heroMain: {
    gap: 10
  },
  heroTitle: {
    color: TEXT,
    fontSize: 28,
    fontWeight: '800'
  },
  heroSubtitle: {
    color: MUTED,
    fontSize: 16,
    fontWeight: '600'
  },
  heroMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  fieldBlock: {
    width: '47%'
  },
  fieldBlockFull: {
    width: '100%',
    alignSelf: 'stretch'
  },
  fieldValueBox: {
    backgroundColor: PANEL,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 8,
    minHeight: 48,
    justifyContent: 'space-between'
  },
  fieldLabelInside: {
    color: MUTED,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4
  },
  fieldValue: {
    color: TEXT,
    fontSize: 13,
    fontWeight: '600'
  },
  heroBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 2
  },
  heroFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    marginTop: 16,
    paddingTop: 14,
    gap: 10
  },
  colorLabel: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700'
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.55)'
  },
  headerColorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PANEL,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1D86BF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    maxWidth: '72%'
  },
  locationPillText: {
    color: '#E8F5FF',
    fontSize: 11,
    fontWeight: '700',
    flexShrink: 1
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  heroDate: {
    color: MUTED,
    fontSize: 13,
    flex: 1
  },
  tabsRow: {
    paddingBottom: 12,
    gap: 10
  },
  tabButton: {
    backgroundColor: PANEL_SOFT,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999
  },
  tabButtonActive: {
    backgroundColor: '#DDE6F5'
  },
  tabButtonText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700'
  },
  tabButtonTextActive: {
    color: '#2E3A4D'
  },
  sectionCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14
  },
  fieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  listCard: {
    backgroundColor: PANEL,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10
  },
  listCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  listTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '700',
    flex: 1
  },
  listMeta: {
    color: MUTED,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18
  },
  listMetaStrong: {
    color: TEXT,
    fontWeight: '800'
  },
  badgePrimary: {
    backgroundColor: '#1D86BF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  badgePrimaryText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: '700'
  },
  emptyState: {
    backgroundColor: PANEL,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyStateText: {
    color: MUTED,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20
  },
  valueRows: {
    gap: 10
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PANEL,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12
  },
  valueRowLabel: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '600',
    flex: 1
  },
  valueRowValue: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right'
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12
  },
  summaryCard: {
    flex: 1,
    backgroundColor: PANEL,
    borderRadius: 14,
    padding: 14
  },
  summaryLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8
  },
  summaryValue: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '800'
  },
  groupBlock: {
    backgroundColor: PANEL,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12
  },
  innerTabsRow: {
    paddingBottom: 12,
    gap: 8
  },
  innerTabButton: {
    backgroundColor: PANEL_SOFT,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999
  },
  innerTabButtonActive: {
    backgroundColor: '#DDE6F5'
  },
  innerTabButtonText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '700'
  },
  innerTabButtonTextActive: {
    color: '#2E3A4D'
  },
  groupTitle: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'capitalize'
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  equipmentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PANEL,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    gap: 10
  },
  equipmentIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7A8496'
  },
  equipmentIndicatorActive: {
    backgroundColor: '#DDE6F5'
  },
  equipmentItemLabel: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '600',
    flex: 1
  },
  equipmentItemQuantity: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700'
  },
  skeletonBlock: {
    backgroundColor: '#617089'
  },
  skeletonLine: {
    backgroundColor: '#617089',
    borderRadius: 6
  },
  skeletonSectionTitle: {
    width: 180,
    height: 20,
    marginBottom: 16
  },
  skeletonFieldLabel: {
    width: '55%',
    height: 12,
    marginBottom: 6
  }
})

