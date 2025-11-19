import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Login/Login'
import RoleSelection from '../screens/RoleSelection/RoleSelection'
import MarinaAdministration from '../screens/MarinaAdministration/MarinaAdministration'
import Profile from '../screens/Profile/Profile'
import Employees from '../screens/Employees/Employees'
import Employee from '../screens/Employee/Employee'
import Clients from '../screens/Clients/Clients'
import Client from '../screens/Client/Client'
import ClientProfile from '../screens/ClientProfile/ClientProfile'
import ClientNauticalQualification from '../screens/ClientNauticalQualification/ClientNauticalQualification'
import ClientEmergencyContact from '../screens/ClientEmergencyContact/ClientEmergencyContact'
import ClientVessel from '../screens/ClientVessel/ClientVessel'
import ClientMarina from '../screens/ClientMarina/ClientMarina'
import Trips from '../screens/Trips/Trips'
import Financial from '../screens/Financial/Financial'
import Support from '../screens/Support/Support'
import OperatorAdministration from '../screens/OperatorAdministration/OperatorAdministration'
import OperatorTrips from '../screens/OperatorAdministration/OperatorTrips'
import VesselDetails from '../screens/OperatorAdministration/VesselDetails'
import OperatorServices from '../screens/OperatorAdministration/OperatorServices'
import OperatorSupport from '../screens/OperatorAdministration/OperatorSupport'
import OperatorChat from '../screens/OperatorAdministration/OperatorChat'
import VesselScan from '../screens/OperatorAdministration/VesselScan'
import OperatorNotifications from '../screens/OperatorAdministration/OperatorNotifications'
import PaidAdministration from '../screens/PaidAdministration/PaidAdministration'
import PaidVessels from '../screens/PaidAdministration/Vessels/PaidVessels'
import PaidVessel from '../screens/PaidAdministration/Vessels/PaidVessel'
import PaidRevision from '../screens/PaidAdministration/Vessels/PaidRevision'
import PaidRevisions from '../screens/PaidAdministration/Vessels/PaidRevisions'
import PaidTracker from '../screens/PaidAdministration/Vessels/PaidTracker'
import PaidTrackerAccess from '../screens/PaidAdministration/Vessels/PaidTrackerAccess'
import CondominiumAdministration from '../screens/PaidAdministration/Condominium/CondominiumAdministration'
import CondominiumDataScreen from '../screens/PaidAdministration/Condominium/CondominiumData'
import AccessControlScreen from '../screens/PaidAdministration/Condominium/AccessControl'
import AccessForm from '../screens/PaidAdministration/Condominium/AcessForm'
import MaintenanceForm from '../screens/PaidAdministration/Condominium/MaintenanceForm'
import MaintenanceScreen from '../screens/PaidAdministration/Condominium/Maintenance'
import LostAndFoundForm from '../screens/PaidAdministration/Condominium/LostAndFoundForm'
import AdministrationScreen from '../screens/PaidAdministration/Condominium/Administration'
import PetsListScreen from '../screens/PaidAdministration/Condominium/PetsList'
import PetFormScreen from '../screens/PaidAdministration/Condominium/PetsForm'
import ReportLostPetScreen from '../screens/PaidAdministration/Condominium/ReportLotsPet'
import AccountStatementsScreen from '../screens/PaidAdministration/Condominium/AccountStatements'
import WeatherScreen from '../screens/PaidAdministration/Weather/Weather'
import PaidMarinaAdministrationScreen from '../screens/PaidAdministration/Marina/PaidMarinaAdministration'
import MyMarinaScreen from '../screens/PaidAdministration/Marina/MyMarina'
import NavigateToMarinaScreen from '../screens/PaidAdministration/Marina/NavigateToMarina'
import MarinaServicesScreen from '../screens/PaidAdministration/Marina/MarinaServices'
import FuelScreen from '../screens/PaidAdministration/Marina/Services/Fuel/Fuel'
import FuelDetailsScreen from '../screens/PaidAdministration/Marina/Services/Fuel/FuelDetails'
import BistroHomeScreen from '../screens/PaidAdministration/Marina/Services/Bistro/Bistro'
import OrderByTableScreen from '../screens/PaidAdministration/Marina/Services/Bistro/OrderByTable'
import OrderByVesselScreen from '../screens/PaidAdministration/Marina/Services/Bistro/OrderByVessel'
import ScheduleOrderScreen from '../screens/PaidAdministration/Marina/Services/Bistro/ScheduleOrder'
import SelectProductsScreen from '../screens/PaidAdministration/Marina/Services/Bistro/SelectProducts'
import OrderSummaryScreen from '../screens/PaidAdministration/Marina/Services/Bistro/OrderSummary'
import PartyAndEventsScreen from '../screens/PaidAdministration/Marina/Services/PartyAndEvents/PartyAndEvents'
import CalendarScreen from '../screens/PaidAdministration/Marina/Services/PartyAndEvents/Calendar'
import BudgetsScreen from '../screens/PaidAdministration/Marina/Services/PartyAndEvents/Budget'
import StructureScreen from '../screens/PaidAdministration/Marina/Services/PartyAndEvents/Structure'
import NavigationSchedulingScreen from '../screens/PaidAdministration/NavigationSchedule/NavigationScheduleScreen'
import NavigationPlanScreen from '../screens/PaidAdministration/NavigationSchedule/Schedule'
import CouponsScreen from '../screens/PaidAdministration/Coupons/Coupons'
import PaidFinancialScreen from '../screens/PaidAdministration/Financial/PaidFinancial'
import MonthlyScreen from '../screens/PaidAdministration/Financial/Monthly'
import PaidFuelScreen from '../screens/PaidAdministration/Financial/PaidFuel'
import CheckInScreen from '../screens/PaidAdministration/Checkin/Checkin'
import SosHelpScreen from '../screens/PaidAdministration/SOSHelp/SOSHelp'
import SosAuthoritiesScreen from '../screens/PaidAdministration/SOSHelp/Authorities'
import SosMarinaChatScreen from '../screens/PaidAdministration/SOSHelp/Marina'
import SosShareLocationScreen from '../screens/PaidAdministration/SOSHelp/ShareLocation'
import SosIncidentScreen from '../screens/PaidAdministration/SOSHelp/Incident'
import FreeAdministration from '../screens/FreeAdministration/FreeAdministration'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen
          name="MarinaAdministration"
          component={MarinaAdministration}
        />
        <Stack.Screen
          name="OperatorAdministration"
          component={OperatorAdministration}
        />
        <Stack.Screen name="OperatorTrips" component={OperatorTrips} />
        <Stack.Screen name="VesselDetails" component={VesselDetails} />
        <Stack.Screen name="OperatorServices" component={OperatorServices} />
        <Stack.Screen name="OperatorSupport" component={OperatorSupport} />
        <Stack.Screen name="OperatorChat" component={OperatorChat} />
        <Stack.Screen name="VesselScan" component={VesselScan} />
        <Stack.Screen
          name="OperatorNotifications"
          component={OperatorNotifications}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Employees" component={Employees} />
        <Stack.Screen name="EditEmployee" component={Employee} />
        <Stack.Screen name="Clients" component={Clients} />
        <Stack.Screen name="EditClient" component={Client} />
        <Stack.Screen name="ClientProfile" component={ClientProfile} />
        <Stack.Screen
          name="ClientNauticalQualification"
          component={ClientNauticalQualification}
        />
        <Stack.Screen
          name="ClientEmergencyContact"
          component={ClientEmergencyContact}
        />
        <Stack.Screen name="ClientVessel" component={ClientVessel} />
        <Stack.Screen name="ClientMarina" component={ClientMarina} />
        <Stack.Screen name="Trips" component={Trips} />
        <Stack.Screen name="Financial" component={Financial} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="PaidUser" component={PaidAdministration} />
        <Stack.Screen name="PaidVessels" component={PaidVessels} />
        <Stack.Screen name="PaidVessel" component={PaidVessel} />
        <Stack.Screen name="PaidRevisions" component={PaidRevisions} />
        <Stack.Screen name="PaidRevision" component={PaidRevision} />
        <Stack.Screen name="PaidTracker" component={PaidTracker} />
        <Stack.Screen name="PaidTrackerAccess" component={PaidTrackerAccess} />
        <Stack.Screen
          name="CondominiumAdministration"
          component={CondominiumAdministration}
        />
        <Stack.Screen
          name="CondominiumData"
          component={CondominiumDataScreen}
        />
        <Stack.Screen name="AccessControl" component={AccessControlScreen} />
        <Stack.Screen name="AccessForm" component={AccessForm} />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
        <Stack.Screen name="MaintenanceForm" component={MaintenanceForm} />
        <Stack.Screen name="LostAndFoundForm" component={LostAndFoundForm} />
        <Stack.Screen name="Administration" component={AdministrationScreen} />
        <Stack.Screen name="PetsList" component={PetsListScreen} />
        <Stack.Screen name="PetsForm" component={PetFormScreen} />
        <Stack.Screen name="ReportLostPet" component={ReportLostPetScreen} />
        <Stack.Screen
          name="AccountStatements"
          component={AccountStatementsScreen}
        />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen
          name="PaidMarinaAdministration"
          component={PaidMarinaAdministrationScreen}
        />
        <Stack.Screen name="MyMarina" component={MyMarinaScreen} />
        <Stack.Screen
          name="NavigateToMarina"
          component={NavigateToMarinaScreen}
        />
        <Stack.Screen name="MarinaServices" component={MarinaServicesScreen} />
        <Stack.Screen name="Fuel" component={FuelScreen} />
        <Stack.Screen name="FuelDetails" component={FuelDetailsScreen} />
        <Stack.Screen name="Bistro" component={BistroHomeScreen} />
        <Stack.Screen name="OrderByTable" component={OrderByTableScreen} />
        <Stack.Screen name="OrderByVessel" component={OrderByVesselScreen} />
        <Stack.Screen name="ScheduleOrder" component={ScheduleOrderScreen} />
        <Stack.Screen name="SelectProducts" component={SelectProductsScreen} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
        <Stack.Screen name="PartyAndEvents" component={PartyAndEventsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Budgets" component={BudgetsScreen} />
        <Stack.Screen name="Structure" component={StructureScreen} />
        <Stack.Screen
          name="NavigationScheduling"
          component={NavigationSchedulingScreen}
        />
        <Stack.Screen name="Schedule" component={NavigationPlanScreen} />
        <Stack.Screen name="Coupons" component={CouponsScreen} />
        <Stack.Screen name="PaidFinancial" component={PaidFinancialScreen} />
        <Stack.Screen name="Monthly" component={MonthlyScreen} />
        <Stack.Screen name="PaidFuel" component={PaidFuelScreen} />
        <Stack.Screen name="CheckIn" component={CheckInScreen} />
        <Stack.Screen name="SosHelp" component={SosHelpScreen} />
        <Stack.Screen name="SosAuthorities" component={SosAuthoritiesScreen} />
        <Stack.Screen name="SosMarina" component={SosMarinaChatScreen} />
        <Stack.Screen
          name="SosShareLocation"
          component={SosShareLocationScreen}
        />
        <Stack.Screen name="SosIncident" component={SosIncidentScreen} />
        <Stack.Screen name="FreeUser" component={FreeAdministration} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

