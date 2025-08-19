
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

const LedgerScreen = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedSalesLedger, setSelectedSalesLedger] = useState('');
  const [ledgers, setLedgers] = useState([]);
  const [salesLedgers, setSalesLedgers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openDueDate, setOpenDueDate] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [addedItems, setAddedItems] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState('');
  const [deliveryTerms, setDeliveryTerms] = useState('');
  const [otherReference, setOtherReference] = useState('');
  const [narration, setNarration] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [state, setState] = useState(''); // New state for hidden state field

  const formatDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDates = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${year}${month}${day}`;
  };

  useEffect(() => {
    // Calculate amount whenever quantity or rate changes
    const calculatedAmount = parseFloat(quantity || 0) * parseFloat(rate || 0);
    setAmount(isNaN(calculatedAmount) ? '0' : calculatedAmount.toString());
  }, [quantity, rate]);

  useEffect(() => {
    // Fetch current order number
    axios.get('https://9f86dd65bc55.ngrok-free.app/api/salenumber/api/order-number')
      .then(response => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(error => {
        console.error('Error fetching order number:', error);
      });

    // Fetch ledger data for Party A/C Name
    axios.get('https://9f86dd65bc55.ngrok-free.app/api/ledgerfetch')
      .then(response => {
        setLedgers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching ledger data:', error);
        setLoading(false);
      });

    // Fetch sales ledger data
    axios.get('https://9f86dd65bc55.ngrok-free.app/api/saleLedger/sales')
      .then(response => {
        setSalesLedgers(response.data);
        setSalesLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sales ledger data:', error);
        
        setSalesLoading(false);
      });

    // Fetch item data for Name of Item dropdown
    axios.get('https://9f86dd65bc55.ngrok-free.app/api/salefetch/sale')
      .then(response => {
        setItems(response.data);
        setItemLoading(false);
      })
      .catch(error => {
        console.error('Error fetching item data:', error);
        setItemLoading(false);
      });
  }, []);

  // New useEffect to fetch state when party is selected
  // useEffect(() => {
  //   if (selectedParty) {
  //     axios.get(`https://8c1584287972.ngrok-free.app/api/statefetch/state?name=${encodeURIComponent(selectedParty)}`)
  //       .then(response => {
  //         if (response.data && response.data.length > 0) {
  //           setState(response.data[0]); // Set the first state returned
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching state:', error);
  //       });
  //   }
  // }, [selectedParty]);


useEffect(() => {
  if (selectedParty) {
    axios.get(`https://9f86dd65bc55.ngrok-free.app/api/statefetch/state?name=${encodeURIComponent(selectedParty)}`)
      .then(response => {
        if (response.data && response.data.PriorStateName) {
          setState(response.data.PriorStateName); // assign the string, not the object
        } else {
          setState(''); // fallback
        }
      })
      .catch(err => {
        console.error('Failed to fetch state:', err);
        setState(''); // fallback
      });
  }
}, [selectedParty]);



  const handleAddItem = () => {
    if (!selectedItem || !quantity || !rate) {
      alert('Please fill all required fields');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      itemName: selectedItem,
      dueDate: formatDates(dueDate),
      quantity: quantity,
      rate: rate,
      amount: amount,
      description: description
    };

    setAddedItems([...addedItems, newItem]);
    
    // Reset form fields
    setSelectedItem('');
    setRate('');
    setQuantity('1');
    setAmount('0');
    setDescription('');
  };

  const handleSaveOrder = async () => {
    if (!selectedParty || !selectedSalesLedger || addedItems.length === 0) {
      Alert.alert('Error', 'Please fill all required fields and add at least one item');
      return;
    }

    setIsSaving(true);

    try {
      const orderData = {
        orderNumber: orderNumber,
        voucherDate: formatDates(date),
        partyName: selectedParty,
        salesLedger: selectedSalesLedger,
        paymentTerms: paymentTerms,
        deliveryTerms: deliveryTerms,
        otherReference: otherReference,
        items: addedItems,
        narration: narration,
        state: state // Include the state in the order data
      };

      // Step 1: Save the order to your database
      const saveResponse = await axios.post('https://9f86dd65bc55.ngrok-free.app/api/salenumber/api/save-order', orderData);
      
      if (!saveResponse.data.success) {
        throw new Error('Failed to save order to database');
      }

      // Step 2: Export to Tally
      const tallyResponse = await axios.post('https://9f86dd65bc55.ngrok-free.app/api/exportdata/api/export-to-tally', orderData);
      
      if (!tallyResponse.data.success) {
        throw new Error('Order saved but Tally export failed');
      }

      // Step 3: Increment the order number
      const incrementResponse = await axios.post('https://9f86dd65bc55.ngrok-free.app/api/salenumber/api/increment-order');
      
      if (!incrementResponse.data.success) {
        throw new Error('Order processed but failed to increment order number');
      }

      // Step 4: Get the new order number
      const orderNumberResponse = await axios.get('https://9f86dd65bc55.ngrok-free.app/api/salenumber/api/order-number');
      
      // Update UI with new order number
      setOrderNumber(orderNumberResponse.data.orderNumber);
      
      // Reset form
      setAddedItems([]);
      setSelectedParty('');
      setSelectedSalesLedger('');
      setPaymentTerms('');
      setDeliveryTerms('');
      setOtherReference('');
      setNarration('');
      setState('');
      
      Alert.alert('Success', 'Order saved into database');
    } catch (error) {
      console.error('Error in save order process:', error);
      Alert.alert('Error', error.message || 'Failed to process order');
    } finally {
      setIsSaving(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.itemName}</Text>
      <Text style={styles.tableCell}>{item.dueDate}</Text>
      <Text style={styles.tableCell}>{item.quantity}</Text>
      <Text style={styles.tableCell}>{item.rate}</Text>
      <Text style={styles.tableCell}>{item.amount}</Text>
      <Text style={styles.tableCell}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SALES ORDER CREATION</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Voucher Date</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setOpenDate(true)}
        >
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={openDate}
          date={date}
          mode="date"
          onConfirm={(selectedDate) => {
            setOpenDate(false);
            setDate(selectedDate);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Order No</Text>
        <Text style={styles.value}>{orderNumber || 'Loading...'}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Party A/C Name</Text>
            {loading ? (
              <Text style={styles.value}>Loading parties...</Text>
            ) : (
              <Picker
                selectedValue={selectedParty}
                onValueChange={(itemValue) => setSelectedParty(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="--Select--" value="" />
                {ledgers.map((ledger, index) => (
                  <Picker.Item key={index} label={ledger} value={ledger} />
                ))}
              </Picker>
            )}
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Sales Ledger</Text>
            {salesLoading ? (
              <Text style={styles.value}>Loading sales ledgers...</Text>
            ) : (
              <Picker
                selectedValue={selectedSalesLedger}
                onValueChange={(itemValue) => setSelectedSalesLedger(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="--Select--" value="" />
                {salesLedgers.map((ledger, index) => (
                  <Picker.Item key={index} label={ledger} value={ledger} />
                ))}
              </Picker>
            )}
          </View>
        </View>
      </View>

      {/* Hidden state field - not visible but included in data */}
      {state ? (
        <View style={{ display: 'none' }}>
          <Text style={styles.label}>State</Text>
          <TextInput
            value={state}
            editable={false}
          />
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.subHeader}>Order Details</Text>
        <Text style={styles.label}>Mode/Terms of Payment</Text>
        <TextInput
          style={styles.input}
          placeholder="Mode/Terms of Payment"
          value={paymentTerms}
          onChangeText={setPaymentTerms}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Terms of Delivery</Text>
            <TextInput
              style={styles.input}
              placeholder="Terms of Delivery"
              value={deliveryTerms}
              onChangeText={setDeliveryTerms}
            />
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Other Reference</Text>
            <TextInput
              style={styles.input}
              placeholder="Other Reference"
              value={otherReference}
              onChangeText={(text) => setOtherReference(text)}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Item Details</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Name of Item</Text>
          {itemLoading ? (
            <Text style={styles.value}>Loading items...</Text>
          ) : (
            <Picker
              selectedValue={selectedItem}
              onValueChange={(itemValue) => setSelectedItem(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="--Select--" value="" />
              {items.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description for Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Description for Item"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Due On</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setOpenDueDate(true)}
            >
              <Text style={styles.dateText}>{formatDate(dueDate)}</Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={openDueDate}
              date={dueDate}
              mode="date"
              onConfirm={(selectedDate) => {
                setOpenDueDate(false);
                setDueDate(selectedDate);
              }}
              onCancel={() => {
                setOpenDueDate(false);
              }}
            />
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Rate</Text>
            <TextInput
              style={styles.input}
              placeholder="Rate"
              keyboardType="numeric"
              value={rate}
              onChangeText={(text) => setRate(text)}
            />
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              editable={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Added Items Table */}
      {addedItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Item Details</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Item Name</Text>
              <Text style={styles.headerCell}>Due On</Text>
              <Text style={styles.headerCell}>Qty</Text>
              <Text style={styles.headerCell}>Rate</Text>
              <Text style={styles.headerCell}>Amount</Text>
              <Text style={styles.headerCell}>Description</Text>
            </View>
            <FlatList
              data={addedItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>
      )}

      {addedItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Narration</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Enter Narration"
            multiline
            value={narration}
            onChangeText={(text) => setNarration(text)}
          />
        </View>
      )}

      {addedItems.length > 0 && (
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && styles.disabledButton]} 
            onPress={handleSaveOrder}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Processing...' : 'Save Order'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.divider} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  halfSection: {
    flex: 1,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 14,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  dateText: {
    fontSize: 14,
  },
  // Table styles
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});

export default LedgerScreen;


//Alert.alert('Success', 'Order saved and exported to Tally successfully!');