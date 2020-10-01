import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { styles } from '../css';

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleBackBtn = () => {
    navigation.goBack();
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={styles.scannerContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={{flex:1, flexDirection:"column", justifyContent:"space-between"}}>
        <View style={{paddingTop:30,paddingLeft:10, paddingRight:10,flexDirection:"row",justifyContent:"space-between"}}>
          <TouchableOpacity onPress={handleBackBtn}>
            <MaterialCommunityIcons name="arrow-left-circle-outline" size={32} color="black" />
          </TouchableOpacity>
          <Text style={{ fontFamily:"sans-serif-thin", fontSize:20}}>Storage Location</Text>
          <MaterialCommunityIcons name="close-circle-outline" size={32} color="black" />
        </View>

        <View style={{padding:30}}>
        </View>

        <View style={{flexDirection: 'row', justifyContent:"center", backgroundColor:"#FAFAFA", height:100, padding:10}} >
          <View style={{width: 80, height: 80, borderColor:"#E6E6E6", borderWidth:5, borderRadius:50, justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity
                style={{ width: 60, height: 60, backgroundColor: '#E6E6E6', borderRadius:50, justifyContent:"center", alignItems:"center", margin:10}}
              >
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}