import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    // Clear session, then navigate back to login
    setTimeout(() => {
      navigation.replace('Login');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
