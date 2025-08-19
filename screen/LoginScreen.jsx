// // LoginScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (!username || !password) {
//       Alert.alert('Missing Fields', 'Please enter both username and password.');
//       return;
//     }

//     // Dummy login logic
//     if (username === 'admin' && password === '1234') {
//       navigation.navigate('Home');
//     } else {
//       Alert.alert('Login Failed', 'Invalid username or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         placeholder="Username"
//         style={styles.input}
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         placeholder="Password"
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>LOGIN</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     justifyContent: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 32,
//     marginBottom: 40,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   input: {
//     height: 50,
//     borderColor: '#aaa',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });






// LoginScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 New state

  const handleLogin = () => {
    setTimeout(() => {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      if (!trimmedUsername || !trimmedPassword) {
        Alert.alert('Missing Fields', 'Please enter both username and password.');
        return;
      }

      if (trimmedUsername === 'admin' && trimmedPassword === '1234') {
        navigation.navigate('EmployeeTabNaigator');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    marginBottom:30,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
