
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

function HomeScreen( {navigation} ) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.box,{marginBottom:40}]} onPress={() =>navigation.navigate('LedgerForm') }>
        <Text style={styles.textStyle}>Sale Order Form</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.box} onPress={() =>navigation.navigate('Payroll') }>
        <Text style={styles.textStyle}>Payroll Voucher</Text>
      </TouchableOpacity>
    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        // horizontally center
    backgroundColor: '#fff',  // light background
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  box: {
    width: 'auto',         // 85% of screen width
    paddingVertical: 20,
    
    borderRadius: 10,
    borderColor: 'light black',
    borderWidth:0,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
    elevation: 2,                // for Android shadow
    alignItems: 'center',
    
  },


  //  box: {
  //   backgroundColor: '#ffffff',
  //   paddingVertical: 20,
  //   paddingHorizontal: 15,
  //   borderRadius: 10,
  //   elevation: 2,
  //   marginBottom: 20,
  //   alignItems: 'center',
  // },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
