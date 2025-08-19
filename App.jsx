


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './screen/LoginScreen';
// import LedgerScreen from './screen/LedgerScreen';
// import EmployeeTabNavigator from './screen/EmployeeTabNavigator';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen 
//           name="EmployeeTabNaigator" 
//           component={EmployeeTabNavigator} 
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="LedgerForm" component={LedgerScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/LoginScreen';
import LedgerScreen from './screen/LedgerScreen';
import EmployeeTabNavigator from './screen/EmployeeTabNavigator';
import PayrollScreen from './screen/PayrollScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen 
          name="EmployeeTabNaigator" 
          component={EmployeeTabNavigator} 
          options={{ headerShown: false }} // ❌ Don't show Stack header here
        />

        <Stack.Screen 
          name="LedgerForm" 
          component={LedgerScreen} 
          options={{ headerShown: true, title: 'Sale Order Form' }}
        />

        <Stack.Screen
        name="Payroll"
        component={PayrollScreen}
        options={{ headerShown: true, title:'Payroll Voucher'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

