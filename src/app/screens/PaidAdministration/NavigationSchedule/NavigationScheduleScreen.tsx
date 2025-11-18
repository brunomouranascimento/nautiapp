import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons'

type TabKey = 'AGENDADOS' | 'HISTORICO' | 'PLANOS'

const LOCATOR_CODE = 'RT6H87'

export default function NavigationSchedulingScreen() {
  const navigation: any = useNavigation()
  const [activeTab, setActiveTab] = useState<TabKey>('AGENDADOS')

  const [checkInConfirmVisible, setCheckInConfirmVisible] = useState(false)
  const [checkInSuccessVisible, setCheckInSuccessVisible] = useState(false)

  const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false)
  const [cancelSuccessVisible, setCancelSuccessVisible] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const handleCheckInPress = () => {
    setCheckInConfirmVisible(true)
  }

  const handleConfirmCheckIn = () => {
    setCheckInConfirmVisible(false)
    setCheckInSuccessVisible(true)
  }

  const handleCancelReservationPress = () => {
    setCancelConfirmVisible(true)
  }

  const handleConfirmCancelReservation = () => {
    setCancelConfirmVisible(false)
    setCancelSuccessVisible(true)
  }

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {(['AGENDADOS', 'HISTORICO', 'PLANOS'] as TabKey[]).map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab && styles.tabButtonActive
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
          >
            {tab === 'HISTORICO' ? 'HISTÓRICO' : tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  const renderAgendados = () => (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          {/* Status */}
          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>AGUARDANDO OPERADOR</Text>
            </View>
            <MaterialCommunityIcons
              name="swap-vertical"
              size={18}
              color="#F3B23A"
            />
          </View>

          {/* Embarcação */}
          <TouchableOpacity style={styles.boatCard} activeOpacity={0.8}>
            <View>
              <Text style={styles.boatName}>Tormenta dos Mares II</Text>
              <Text style={styles.boatSubTitle}>Yamaha XC 700</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Posição */}
          <Text style={styles.positionTitle}>Posição 2</Text>

          {/* Info rows */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="swap-vertical"
              size={18}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Movimento</Text>
            <Text style={styles.infoValue}>Descida</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5
              name="user-friends"
              size={16}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Adultos</Text>
            <Text style={styles.infoValue}>8</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="happy-outline"
              size={18}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Crianças</Text>
            <Text style={styles.infoValue}>2</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValue}>01/03/2023</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={18}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValue}>12:00</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={18}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Tempo médio de espera</Text>
            <Text style={styles.infoValue}>20 min</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="search-outline"
              size={18}
              color="#FFFFFF"
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Localizador</Text>
            <Text style={[styles.infoValue, styles.locatorValue]}>
              {LOCATOR_CODE}
            </Text>
          </View>

          {/* Ações */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.primaryButton, styles.checkInButton]}
              activeOpacity={0.9}
              onPress={handleCheckInPress}
            >
              <Text style={styles.primaryButtonText}>EFETUAR CHECK-IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryButton, styles.cancelButton]}
              activeOpacity={0.9}
              onPress={handleCancelReservationPress}
            >
              <Text style={styles.primaryButtonText}>CANCELAR RESERVA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarButton}
          activeOpacity={0.9}
          onPress={() => {
            // navegação para fluxo de agendar navegação
            navigation.navigate('Schedule')
          }}
        >
          <Text style={styles.bottomBarButtonText}>AGENDAR NAVEGAÇÃO</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  const renderHistorico = () => (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.card}>
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, styles.statusFinishedBadge]}>
            <Text style={styles.statusText}>FINALIZADO</Text>
          </View>
          <MaterialCommunityIcons
            name="swap-vertical"
            size={18}
            color="#F3B23A"
          />
        </View>

        <TouchableOpacity style={styles.boatCard} activeOpacity={0.8}>
          <View>
            <Text style={styles.boatName}>Tormenta dos Mares II</Text>
            <Text style={styles.boatSubTitle}>Yamaha XC 700</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.positionTitle}>Posição 2</Text>

        <View style={styles.infoRow}>
          <FontAwesome5
            name="user-friends"
            size={16}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Adultos</Text>
          <Text style={styles.infoValue}>8</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="happy-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Crianças</Text>
          <Text style={styles.infoValue}>2</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="swap-vertical"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Movimento</Text>
          <Text style={styles.infoValue}>Descida</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Data</Text>
          <Text style={styles.infoValue}>01/03/2023</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Horário</Text>
          <Text style={styles.infoValue}>12:00</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="person-circle-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Operado por</Text>
          <Text style={styles.infoValue}>Julio de Castilhos</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#FFFFFF"
            style={styles.infoIcon}
          />
          <Text style={styles.infoLabel}>Localizador</Text>
          <Text style={[styles.infoValue, styles.locatorValue]}>
            {LOCATOR_CODE}
          </Text>
        </View>
      </View>
    </ScrollView>
  )

  const renderPlanos = () => (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Card expandido */}
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <Text style={styles.boatName}>Tormenta dos Mares</Text>
          <View style={styles.planHeaderRight}>
            <Text style={styles.planHeaderDate}>01/03/2023</Text>
            <Text style={styles.planHeaderTime}>10:40</Text>
          </View>
        </View>
        <View style={styles.planDescriptionRow}>
          <MaterialCommunityIcons
            name="chat-processing-outline"
            size={18}
            color="#FFFFFF"
            style={styles.planIcon}
          />
          <Text style={styles.planDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius
            magna id eros ornare semper.
          </Text>
        </View>
      </View>

      {/* Card colapsado */}
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <Text style={styles.boatName}>Tormenta dos Mares</Text>
          <View style={styles.planHeaderRight}>
            <Text style={styles.planHeaderDate}>01/03/2023</Text>
            <Text style={styles.planHeaderTime}>10:40</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )

  const renderContent = () => {
    if (activeTab === 'AGENDADOS') return renderAgendados()
    if (activeTab === 'HISTORICO') return renderHistorico()
    return renderPlanos()
  }

  return (
    <View style={styles.container}>
      {/* Header padrão NautiApp */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Navegação</Text>

        {/* X transparente (não aparece, mas mantém alinhamento) */}
        <Ionicons name="close" size={24} color="transparent" />
      </View>

      {renderTabs()}
      {renderContent()}

      {/* MODAIS CHECK-IN */}
      <Modal
        transparent
        visible={checkInConfirmVisible}
        animationType="fade"
        onRequestClose={() => setCheckInConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Efetuar check-in</Text>
              <TouchableOpacity onPress={() => setCheckInConfirmVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Confirma o check-in para o localizador {LOCATOR_CODE}?
            </Text>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalOutlineButton]}
              onPress={handleConfirmCheckIn}
              activeOpacity={0.9}
            >
              <Text style={styles.modalPrimaryButtonText}>
                CONFIRMAR CHECK-IN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCheckInConfirmVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={checkInSuccessVisible}
        animationType="fade"
        onRequestClose={() => setCheckInSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Check-in efetuado</Text>
              <TouchableOpacity onPress={() => setCheckInSuccessVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              O check-in do localizador {LOCATOR_CODE} foi efetuado com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCheckInSuccessVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAIS CANCELAMENTO (texto corrigido) */}
      <Modal
        transparent
        visible={cancelConfirmVisible}
        animationType="fade"
        onRequestClose={() => setCancelConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cancelar reserva</Text>
              <TouchableOpacity onPress={() => setCancelConfirmVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              Tem certeza que deseja cancelar a reserva do localizador{' '}
              {LOCATOR_CODE}?
            </Text>

            <TouchableOpacity
              style={[styles.modalPrimaryButton, styles.modalOutlineButton]}
              onPress={handleConfirmCancelReservation}
              activeOpacity={0.9}
            >
              <Text style={styles.modalPrimaryButtonText}>
                CANCELAR RESERVA
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCancelConfirmVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={cancelSuccessVisible}
        animationType="fade"
        onRequestClose={() => setCancelSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reserva cancelada</Text>
              <TouchableOpacity onPress={() => setCancelSuccessVisible(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              A reserva do localizador {LOCATOR_CODE} foi cancelada com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => setCancelSuccessVisible(false)}
              activeOpacity={0.9}
            >
              <Text style={styles.modalSecondaryButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const DARK_BG = '#1F2633'
const CARD_BG = '#262F4A'
const STATUS_BG = '#3A4461'
const GREEN = '#00B140'
const RED = '#E53935'
const WHITE = '#FFFFFF'
const ACCENT = '#223A7A'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600'
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333B4A'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: WHITE
  },
  tabText: {
    color: '#9FA6C0',
    fontSize: 13,
    fontWeight: '600'
  },
  tabTextActive: {
    color: WHITE
  },
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginTop: 16
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  statusBadge: {
    backgroundColor: STATUS_BG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  statusFinishedBadge: {
    backgroundColor: '#4A5568'
  },
  statusText: {
    color: '#E1E6FF',
    fontSize: 11,
    fontWeight: '600'
  },
  boatCard: {
    backgroundColor: '#2E3758',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boatName: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600'
  },
  boatSubTitle: {
    color: '#C0C6E0',
    fontSize: 12,
    marginTop: 2
  },
  positionTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 16
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  infoIcon: {
    width: 22,
    marginRight: 6
  },
  infoLabel: {
    flex: 1,
    color: '#C0C6E0',
    fontSize: 13
  },
  infoValue: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600'
  },
  locatorValue: {
    letterSpacing: 0.5
  },
  actionsContainer: {
    marginTop: 24
  },
  primaryButton: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  checkInButton: {
    backgroundColor: GREEN
  },
  cancelButton: {
    backgroundColor: RED
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700'
  },
  bottomBar: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  bottomBarButton: {
    alignItems: 'center'
  },
  bottomBarButtonText: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  // Planos
  planCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginTop: 16
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  planHeaderRight: {
    alignItems: 'flex-end'
  },
  planHeaderDate: {
    color: '#C0C6E0',
    fontSize: 12
  },
  planHeaderTime: {
    color: '#C0C6E0',
    fontSize: 12,
    marginTop: 2
  },
  planDescriptionRow: {
    flexDirection: 'row',
    marginTop: 12
  },
  planIcon: {
    marginRight: 8,
    marginTop: 2
  },
  planDescription: {
    flex: 1,
    color: '#E1E6FF',
    fontSize: 13,
    lineHeight: 18
  },
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    width: '82%',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 22
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  modalTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700'
  },
  modalMessage: {
    color: '#E1E6FF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20
  },
  modalPrimaryButton: {
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  modalOutlineButton: {
    borderWidth: 1,
    borderColor: WHITE
  },
  modalPrimaryButtonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700'
  },
  modalSecondaryButton: {
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE
  },
  modalSecondaryButtonText: {
    color: DARK_BG,
    fontSize: 13,
    fontWeight: '700'
  }
})

