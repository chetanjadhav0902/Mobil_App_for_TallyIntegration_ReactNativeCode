
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StatusBar, Platform } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// // Screens
// import HomeScreen from './HomeScreen';
// import ProfileScreen from './ProfileScreen';
// import LogoutScreen from './LogoutScreen';

// const Tab = createBottomTabNavigator();

// const EmployeeTabNavigator = () => {
//   return (
//     <>
//       <StatusBar 
//         barStyle="dark-content" 
//         backgroundColor="#ffffff" 
//         translucent={false}
//       />
      
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={({ route }) => ({
//           // headerShown: true,
//           // headerStyle: {
//           //   height: Platform.OS === 'ios' ? 100 : 80,
//           //   backgroundColor: '#ffffff',
//           //   elevation: 0,
//           //   shadowOpacity: 0,
//           //   borderBottomWidth: 0,
          
//           // },
//           // headerTitleStyle: {
//           //   fontSize: 20,
//           //   fontWeight: 'bold',
//           //   color: '#000000',
//           //   // Move title left
//           //   alignSelf: 'flex-start', // Align left
          
//           // },
//           // headerTitleAlign: 'left', // Align title to left
//           // tabBarActiveTintColor: '#007bff',
//           // tabBarInactiveTintColor: 'gray',
//           // tabBarStyle: {
//           //   height: 60,
//           //   paddingBottom: Platform.OS === 'ios' ? 0 : 5,
//           // },
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'Logout') {
//               iconName = focused ? 'log-out' : 'log-out-outline';
//             }

//             return <Icon name={iconName} size={22} color={color} />;
//           },
//         })}
//       >
//         <Tab.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ title: 'Home' }}
//         />
//         <Tab.Screen 
//           name="Profile" 
//           component={ProfileScreen} 
//           options={{ title: 'Profile' }}
//         />
//         <Tab.Screen 
//           name="Logout" 
//           component={LogoutScreen} 
//           options={{ title: 'Logout' }}
//         />
//       </Tab.Navigator>
//     </>
//   );
// };

// export default EmployeeTabNavigator;

// EmployeeTabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import LogoutScreen from './LogoutScreen';

const Tab = createBottomTabNavigator();

const EmployeeTabNavigator = () => {
  return (
    <>
      <StatusBar
         
        barStyle="dark-content" 
        backgroundColor="#ffffff" 
        translucent={false}
      />
      
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60,
            paddingBottom: Platform.OS === 'ios' ? 0 : 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }

            return <Icon name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home',
            headerStyle: {
           height: 90, // Set your desired height here
    }
           }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profile' }}
        />
        <Tab.Screen 
          name="Logout" 
          component={LogoutScreen} 
          options={{ title: 'Logout' }}
        />
      </Tab.Navigator>
    </>
  );
};

export default EmployeeTabNavigator;


