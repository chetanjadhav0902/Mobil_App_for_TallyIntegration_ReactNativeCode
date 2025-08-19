// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ProfileScreen = () => (
//   <View style={styles.container}>
//     <Text style={styles.text}>Employee Profile</Text>
//   </View>
// );

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 20, fontWeight: 'bold' },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator,  TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen = () => {
  const [salesLedgers, setSalesLedgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLedger, setSelectedLedger] = useState('');

  useEffect(() => {
    const fetchSalesLedgers = async () => {
      try {
        const response = await axios.get('https://52963f81a029.ngrok-free.app/api/salefetch/sale');
        setSalesLedgers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sales ledgers:', err);
        setError('Failed to load sales ledger data');
        setLoading(false);
      }
    };

    fetchSalesLedgers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            fetchSalesLedgers();
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sales Ledgers</Text>
      
      {/* Picker Dropdown */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select a Sales Ledger:</Text>
        <Picker
          selectedValue={selectedLedger}
          onValueChange={(itemValue) => setSelectedLedger(itemValue)}
          style={styles.picker}
          dropdownIconColor="#007bff"
        >
          <Picker.Item label="Select a ledger" value="" />
          {salesLedgers.map((ledger, index) => (
            <Picker.Item key={index} label={ledger} value={ledger} />
          ))}
        </Picker>
      </View>

      {/* Display selected ledger */}
      {selectedLedger ? (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected Ledger:</Text>
          <Text style={styles.selectedValue}>{selectedLedger}</Text>
        </View>
      ) : null}

      {/* Full List View */}
      <Text style={styles.listHeader}>All Sales Ledgers:</Text>
      <FlatList
        data={salesLedgers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
    fontWeight: '500',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#212529',
  },
  selectedContainer: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedLabel: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 5,
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#495057',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  itemText: {
    fontSize: 16,
    color: '#212529',
  },
  retryButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    width: 120,
  },
  retryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;