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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

