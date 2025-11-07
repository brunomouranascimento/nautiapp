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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

