
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DatePicker from "react-native-date-picker";

// const Payroll = () => {
//   const [ledgerNames, setLedgerNames] = useState([]);
//   const [particulars, setParticulars] = useState([]);
//   const [headsNames, setHeadsNames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLedger, setSelectedLedger] = useState("");
//   const [selectedParticular, setSelectedParticular] = useState("");
//   const [selectedHead, setSelectedHead] = useState("");
//   const [amount, setAmount] = useState("");
//   const [headAmount, setHeadAmount] = useState("");
//   const [narration, setNarration] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     fetchLedgerNames();
//     fetchParticulars();
//     fetchHeadsNames();
//   }, []);

//   const fetchLedgerNames = async () => {
//     try {
//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/account/accounts"
//       );
//       const json = await response.json();

//       if (json.success && Array.isArray(json.data)) {
//         setLedgerNames(json.data);
//       } else {
//         Alert.alert("No ledger data found");
//       }
//     } catch (error) {
//       Alert.alert("Error fetching ledger data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchParticulars = async () => {
//     try {
//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/particular/particulars"
//       );
//       const json = await response.json();

//       if (Array.isArray(json)) {
//         setParticulars(json);
//       } else {
//         Alert.alert("No particulars data found");
//       }
//     } catch (error) {
//       Alert.alert("Error fetching particulars data");
//     }
//   };

//   const fetchHeadsNames = async () => {
//     try {
//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/headsname/sale"
//       );
//       const json = await response.json();

//       if (Array.isArray(json)) {
//         setHeadsNames(json);
//       } else {
//         Alert.alert("No heads name data found");
//       }
//     } catch (error) {
//       Alert.alert("Error fetching heads name data");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedLedger) {
//       Alert.alert("Please select a Ledger");
//       return;
//     }
//     if (!selectedParticular) {
//       Alert.alert("Please select a Particular (Employee)");
//       return;
//     }
//     if (!selectedHead) {
//       Alert.alert("Please select a Head Name");
//       return;
//     }
//     if (!amount || isNaN(parseFloat(amount))) {
//       Alert.alert("Please enter a valid Amount");
//       return;
//     }
//     if (!headAmount || isNaN(parseFloat(headAmount))) {
//       Alert.alert("Please enter a valid Head Amount");
//       return;
//     }

//     try {
//       const payload = {
//         voucherDate: date.toISOString().split("T")[0], // YYYY-MM-DD
//         narration: narration || "Payroll Voucher",
//         partyLedger: selectedLedger,
//         employeeName: selectedParticular,
//         totalAmount: parseFloat(amount),
//         name: selectedHead,
            
//         amount: parseFloat(headAmount),
//       };

//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/payrollexport/api/export-to-tally",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         Alert.alert("Success", "Payroll voucher exported to Tally successfully!");
//       } else {
//         Alert.alert("Error", result.error || "Failed to export to Tally");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong while exporting to Tally");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.heading, { textAlign: "center" }]}>
//         Payroll Voucher Form
//       </Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : (
//         <>
//           {/* Date Picker */}
//           <TouchableOpacity
//             style={styles.dateBox}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               {date ? date.toLocaleDateString() : "Select Date"}
//             </Text>
//           </TouchableOpacity>

//           <DatePicker
//             modal
//             mode="date"
//             open={showDatePicker}
//             date={date}
//             onConfirm={(selectedDate) => {
//               setShowDatePicker(false);
//               setDate(selectedDate);
//             }}
//             onCancel={() => setShowDatePicker(false)}
//           />

//           {/* Ledger Dropdown */}
//           <Picker
//             selectedValue={selectedLedger}
//             onValueChange={(itemValue) => setSelectedLedger(itemValue)}
//             style={styles.picker}
//           >
//             <Picker.Item label="-- Select Ledger --" value="" />
//             {ledgerNames.map((name, index) => (
//               <Picker.Item key={index} label={name} value={name} />
//             ))}
//           </Picker>

//           {/* Particular + Amount Row */}
//           <View style={styles.row}>
//             <View style={styles.particularContainer}>
//               <Picker
//                 selectedValue={selectedParticular}
//                 onValueChange={(itemValue) => setSelectedParticular(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="-- Select Particular --" value="" />
//                 {particulars.map((name, index) => (
//                   <Picker.Item key={index} label={name} value={name} />
//                 ))}
//               </Picker>
//             </View>

//             <TextInput
//               style={styles.amountInput}
//               placeholder="Amount"
//               value={amount}
//               onChangeText={setAmount}
//               keyboardType="numeric"
//             />
//           </View>

//           {/* HeadsName + Amount Row */}
//           <View style={styles.row}>
//             <View style={styles.particularContainer}>
//               <Picker
//                 selectedValue={selectedHead}
//                 onValueChange={(itemValue) => setSelectedHead(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="-- Select Head Name --" value="" />
//                 {headsNames.map((name, index) => (
//                   <Picker.Item key={index} label={name} value={name} />
//                 ))}
//               </Picker>
//             </View>

//             <TextInput
//               style={styles.amountInput}
//               placeholder="Amount"
//               value={headAmount}
//               onChangeText={setHeadAmount}
//               keyboardType="numeric"
//             />
//           </View>

//           <TextInput
//             style={styles.narrationInput}
//             placeholder="Enter Narration"
//             value={narration}
//             onChangeText={setNarration}
//             multiline
//           />

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitText}>Submit</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// export default Payroll;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f2f2f2",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   picker: {
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   particularContainer: {
//     flex: 2,
//     marginRight: 10,
//   },
//   amountInput: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: "#007bff",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   narrationInput: {
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 16,
//     marginTop: 15,
//     minHeight: 60,
//     textAlignVertical: "top",
//   },
//   dateBox: {
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 12,
//     marginBottom: 15,
//   },
//   dateText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });





// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DatePicker from "react-native-date-picker";

// const Payroll = () => {
//   const [ledgerNames, setLedgerNames] = useState([]);
//   const [particulars, setParticulars] = useState([]);
//   const [headsNames, setHeadsNames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLedger, setSelectedLedger] = useState("");
//   const [selectedParticular, setSelectedParticular] = useState("");
//   const [heads, setHeads] = useState([{ headName: "", amount: "" }]); // multiple heads here
//   const [amount, setAmount] = useState(""); // total amount
//   const [narration, setNarration] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     fetchLedgerNames();
//     fetchParticulars();
//     fetchHeadsNames();
//   }, []);

//   const fetchLedgerNames = async () => {
//     try {
//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/account/accounts"
//       );
//       const json = await response.json();

//       if (json.success && Array.isArray(json.data)) {
//         setLedgerNames(json.data);
//       } else {
//         Alert.alert("No ledger data found");
//       }
//     } catch (error) {
//       Alert.alert("Error fetching ledger data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchParticulars = async () => {
//     try {
//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/particular/particulars"
//       );
//       const json = await response.json();

//       if (Array.isArray(json)) {
//         setParticulars(json);
//       } else {
//         Alert.alert("No particulars data found");
//       }
//     } catch (error) {
//       Alert.alert("Error fetching particulars data");
//     }
//   };

//   const fetchHeadsNames = async () => {
//     try {
//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/headsname/sale"
//       );
//       const json = await response.json();

//       if (Array.isArray(json)) {
//         setHeadsNames(json);
//       } else {
//         Alert.alert("No heads name data found");
//       }
//     } catch (error) {
//       Alert.alert("Error fetching heads name data");
//     }
//   };

//   // Handle adding a new head entry
//   const addHeadEntry = () => {
//     setHeads([...heads, { headName: "", amount: "" }]);
//   };

//   // Handle removing a head entry by index
//   const removeHeadEntry = (index) => {
//     const newHeads = heads.filter((_, i) => i !== index);
//     setHeads(newHeads);
//   };

//   // Handle changing head name or amount in an entry
//   const updateHeadEntry = (index, key, value) => {
//     const newHeads = [...heads];
//     newHeads[index][key] = value;
//     setHeads(newHeads);
//   };

//   const handleSubmit = async () => {
//     if (!selectedLedger) {
//       Alert.alert("Please select a Ledger");
//       return;
//     }
//     if (!selectedParticular) {
//       Alert.alert("Please select a Particular (Employee)");
//       return;
//     }
//     if (!amount || isNaN(parseFloat(amount))) {
//       Alert.alert("Please enter a valid Total Amount");
//       return;
//     }
//     // Validate heads
//     for (let i = 0; i < heads.length; i++) {
//       const h = heads[i];
//       if (!h.headName) {
//         Alert.alert(`Please select Head Name for entry ${i + 1}`);
//         return;
//       }
//       if (!h.amount || isNaN(parseFloat(h.amount))) {
//         Alert.alert(`Please enter a valid amount for Head entry ${i + 1}`);
//         return;
//       }
//     }

//     try {
//       const payload = {
//         voucherDate: date.toISOString().split("T")[0], // YYYY-MM-DD
//         narration: narration || "Payroll Voucher",
//         partyLedger: selectedLedger,
//         employeeName: selectedParticular,
//         totalAmount: parseFloat(amount),
//         heads: heads.map((h) => ({
//           name: h.headName,
//           amount: parseFloat(h.amount),
//         })),
//       };

//       const response = await fetch(
//         "https://bbcfe7130d2e.ngrok-free.app/api/payrollexport/api/export-to-tally",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         Alert.alert("Success", "Payroll voucher exported to Tally successfully!");
//         // Reset form
//         setSelectedLedger("");
//         setSelectedParticular("");
//         setHeads([{ headName: "", amount: "" }]);
//         setAmount("");
//         setNarration("");
//         setDate(new Date());
//       } else {
//         Alert.alert("Error", result.error || "Failed to export to Tally");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong while exporting to Tally");
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={[styles.heading, { textAlign: "center" }]}>
//         Payroll Voucher Form
//       </Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : (
//         <>
//           {/* Date Picker */}
//           <TouchableOpacity
//             style={styles.dateBox}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               {date ? date.toLocaleDateString() : "Select Date"}
//             </Text>
//           </TouchableOpacity>

//           <DatePicker
//             modal
//             mode="date"
//             open={showDatePicker}
//             date={date}
//             onConfirm={(selectedDate) => {
//               setShowDatePicker(false);
//               setDate(selectedDate);
//             }}
//             onCancel={() => setShowDatePicker(false)}
//           />

//           {/* Ledger Dropdown */}
//           <Picker
//             selectedValue={selectedLedger}
//             onValueChange={(itemValue) => setSelectedLedger(itemValue)}
//             style={styles.picker}
//           >
//             <Picker.Item label="-- Select Ledger --" value="" />
//             {ledgerNames.map((name, index) => (
//               <Picker.Item key={index} label={name} value={name} />
//             ))}
//           </Picker>

//           {/* Particular Dropdown */}
//           <Picker
//             selectedValue={selectedParticular}
//             onValueChange={(itemValue) => setSelectedParticular(itemValue)}
//             style={[styles.picker, { marginTop: 15 }]}
//           >
//             <Picker.Item label="-- Select Particular --" value="" />
//             {particulars.map((name, index) => (
//               <Picker.Item key={index} label={name} value={name} />
//             ))}
//           </Picker>

//           {/* Total Amount Input */}
//           <TextInput
//             style={[styles.amountInput, { marginTop: 15 }]}
//             placeholder="Total Amount"
//             value={amount}
//             onChangeText={setAmount}
//             keyboardType="numeric"
//           />

//           {/* Multiple Heads + Amount Inputs */}
//           <Text style={{ marginTop: 20, fontWeight: "bold" }}>
//             Heads and Amounts
//           </Text>
//           {heads.map((headEntry, index) => (
//             <View key={index} style={styles.row}>
//               <View style={styles.particularContainer}>
//                 <Picker
//                   selectedValue={headEntry.headName}
//                   onValueChange={(itemValue) =>
//                     updateHeadEntry(index, "headName", itemValue)
//                   }
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="-- Select Head Name --" value="" />
//                   {headsNames.map((name, i) => (
//                     <Picker.Item key={i} label={name} value={name} />
//                   ))}
//                 </Picker>
//               </View>
//               <TextInput
//                 style={styles.amountInput}
//                 placeholder="Amount"
//                 value={headEntry.amount}
//                 onChangeText={(text) => updateHeadEntry(index, "amount", text)}
//                 keyboardType="numeric"
//               />
//               {heads.length > 1 && (
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removeHeadEntry(index)}
//                 >
//                   <Text style={{ color: "white" }}>X</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}

//           <TouchableOpacity style={styles.addButton} onPress={addHeadEntry}>
//             <Text style={{ color: "white", fontWeight: "bold" }}>
//               + Add Another Head
//             </Text>
//           </TouchableOpacity>

//           {/* Narration Input */}
//           <TextInput
//             style={styles.narrationInput}
//             placeholder="Enter Narration"
//             value={narration}
//             onChangeText={setNarration}
//             multiline
//           />

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitText}>Submit</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default Payroll;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f2f2f2",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   picker: {
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   particularContainer: {
//     flex: 2,
//     marginRight: 10,
//   },
//   amountInput: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: "#007bff",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   narrationInput: {
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 16,
//     marginTop: 15,
//     minHeight: 60,
//     textAlignVertical: "top",
//   },
//   dateBox: {
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 12,
//     marginBottom: 15,
//   },
//   dateText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   addButton: {
//     backgroundColor: "#28a745",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   removeButton: {
//     backgroundColor: "#dc3545",
//     padding: 8,
//     borderRadius: 5,
//     marginLeft: 5,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";

const Payroll = () => {
  const [ledgerNames, setLedgerNames] = useState([]);
  const [particulars, setParticulars] = useState([]);
  const [headsNames, setHeadsNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLedger, setSelectedLedger] = useState("");
  const [selectedParticular, setSelectedParticular] = useState("");
  const [heads, setHeads] = useState([{ headName: "", amount: "" }]); // multiple heads here
  const [amount, setAmount] = useState(""); // total amount
  const [narration, setNarration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchLedgerNames();
    fetchParticulars();
    fetchHeadsNames();
  }, []);

  // const fetchLedgerNames = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://745e5f496666.ngrok-free.app/api/account/accounts"
  //     );
  //     const json = await response.json();
  //         console.log("API Response:", json);

  //     if (json.success && Array.isArray(json.data)) {
  //       setLedgerNames(json.data);
  //     } else {
  //       Alert.alert("No ledger data found");
  //     }
  //   } catch (error) {
  //     Alert.alert("Error fetching ledger data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const fetchLedgerNames = async () => {
  try {
    const response = await fetch(
      "https://9f86dd65bc55.ngrok-free.app/api/account/accounts"
    );
    const json = await response.json();

    if (Array.isArray(json) && json.length > 0) {
      setLedgerNames(json);   // directly set the array
    } else {
      Alert.alert("No ledger data found");
    }
  } catch (error) {
    Alert.alert("Error fetching ledger data");
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};





  const fetchParticulars = async () => {
    try {
      const response = await fetch(
        "https://9f86dd65bc55.ngrok-free.app/api/particular/particulars"
      );
      const json = await response.json();

      if (Array.isArray(json)) {
        setParticulars(json);
      } else {
        Alert.alert("No particulars data found");
      }
    } catch (error) {
      Alert.alert("Error fetching particulars data");
    }
  };

  const fetchHeadsNames = async () => {
    try {
      const response = await fetch(
        "https://9f86dd65bc55.ngrok-free.app/api/headsname/sale"
      );
      const json = await response.json();

      if (Array.isArray(json)) {
        setHeadsNames(json);
      } else {
        Alert.alert("No heads name data found");
      }
    } catch (error) {
      Alert.alert("Error fetching heads name data");
    }
  };

  const addHeadEntry = () => {
    setHeads([...heads, { headName: "", amount: "" }]);
  };

  const removeHeadEntry = (index) => {
    const newHeads = heads.filter((_, i) => i !== index);
    setHeads(newHeads);
  };

  const updateHeadEntry = (index, key, value) => {
    const newHeads = [...heads];
    newHeads[index][key] = value;
    setHeads(newHeads);
  };

  const handleSubmit = async () => {
    if (!selectedLedger) {
      Alert.alert("Please select a Ledger");
      return;
    }
    if (!selectedParticular) {
      Alert.alert("Please select a Particular (Employee)");
      return;
    }
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Please enter a valid Total Amount");
      return;
    }
    for (let i = 0; i < heads.length; i++) {
      const h = heads[i];
      if (!h.headName) {
        Alert.alert(`Please select Head Name for entry ${i + 1}`);
        return;
      }
      if (!h.amount || isNaN(parseFloat(h.amount))) {
        Alert.alert(`Please enter a valid amount for Head entry ${i + 1}`);
        return;
      }
    }

    try {
      const payload = {
        voucherDate: date.toISOString().split("T")[0],
        narration: narration || "Payroll Voucher",
        partyLedger: selectedLedger,
        employeeName: selectedParticular,
        totalAmount: parseFloat(amount),
        heads: heads.map((h) => ({
          name: h.headName,
          amount: parseFloat(h.amount),
        })),
      };

      const response = await fetch(
        "https://9f86dd65bc55.ngrok-free.app/api/payrollexport/api/export-to-tally",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        Alert.alert("Success", "Payroll voucher exported to Tally successfully!");
        setSelectedLedger("");
        setSelectedParticular("");
        setHeads([{ headName: "", amount: "" }]);
        setAmount("");
        setNarration("");
        setDate(new Date());
      } else {
        Alert.alert("Error", result.error || "Failed to export to Tally");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while exporting to Tally");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.heading, { textAlign: "center" }]}>
          Payroll Voucher Form
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Text style={styles.label}>Voucher Date</Text>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {date ? date.toLocaleDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              mode="date"
              open={showDatePicker}
              date={date}
              onConfirm={(selectedDate) => {
                setShowDatePicker(false);
                setDate(selectedDate);
              }}
              onCancel={() => setShowDatePicker(false)}
            />

            <Text style={styles.label}>Select Ledger</Text>
            <Picker
              selectedValue={selectedLedger}
              onValueChange={(itemValue) => setSelectedLedger(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select Ledger --" value="" />
              {ledgerNames.map((name, index) => (
                <Picker.Item key={index} label={name} value={name} />
              ))}
            </Picker>

            <Text style={styles.label}>Select Particular (Employee)</Text>
            <Picker
              selectedValue={selectedParticular}
              onValueChange={(itemValue) => setSelectedParticular(itemValue)}
              style={[styles.picker, { marginTop: 5 }]}
            >
              <Picker.Item label="-- Select Particular --" value="" />
              {particulars.map((name, index) => (
                <Picker.Item key={index} label={name} value={name} />
              ))}
            </Picker>

            <Text style={styles.label}>Total Amount</Text>
            <TextInput
              style={[styles.amountInput, { marginTop: 5 }]}
              placeholder="Total Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            <Text style={[styles.label, { marginTop: 20 }]}>
              Heads and Amounts
            </Text>
            {heads.map((headEntry, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.particularContainer}>
                  <Picker
                    selectedValue={headEntry.headName}
                    onValueChange={(itemValue) =>
                      updateHeadEntry(index, "headName", itemValue)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="-- Select Head Name --" value="" />
                    {headsNames.map((name, i) => (
                      <Picker.Item key={i} label={name} value={name} />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Amount"
                  value={headEntry.amount}
                  onChangeText={(text) => updateHeadEntry(index, "amount", text)}
                  keyboardType="numeric"
                />
                {heads.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeHeadEntry(index)}
                  >
                    <Text style={{ color: "white" }}>X</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addHeadEntry}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                + Add Another Head
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Narration</Text>
            <TextInput
              style={styles.narrationInput}
              placeholder="Enter Narration"
              value={narration}
              onChangeText={setNarration}
              multiline
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Payroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    fontSize: 15,
    color: "#333",
  },
  picker: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  particularContainer: {
    flex: 2,
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  narrationInput: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginTop: 5,
    minHeight: 60,
    textAlignVertical: "top",
  },
  dateBox: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
});
