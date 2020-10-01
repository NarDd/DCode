import React, { useState } from 'react';
import { Text, View, StatusBar, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {styles} from '../css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen({ navigation }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [msgShow, setMsgShow] = useState(false);
  const [msg, setMsg] = useState("ERROR: No Data Found");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    setMsgShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.homeContainer}>
      <StatusBar hidden={true} />
      <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center", flex:8}}>
        <MaterialCommunityIcons name="qrcode-scan" size={150} color="#22181C" />
        <Text style={styles.brandTitle}>DCode v1.0</Text>

        <TouchableOpacity onPress={() => navigation.navigate('ScannerScreen')}>
        <MaterialCommunityIcons name="chevron-right-circle-outline" size={52} color="#a5ecd7" />
        </TouchableOpacity>
        <Text style={{ fontFamily:"sans-serif-thin", fontSize:13, fontStyle:"italic", textAlign:"center", paddingBottom:20}}>START</Text>
      </View>
     
      <View style={{flex:1}}>
      {msgShow &&(
        <Text style={{ fontFamily:"sans-serif-thin", fontSize:15, fontWeight:"bold", textAlign:"center", paddingBottom:20}}>{msg}</Text>
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      </View>

      <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flexDirection:"column", paddingRight:120}}>
          <TouchableOpacity onPress={showDatepicker}>
            <MaterialCommunityIcons name="progress-download" size={52} color="#712F79" />
          </TouchableOpacity>
          <Text style={{ fontFamily:"sans-serif-thin", fontSize:13, fontStyle:"italic", textAlign:"center", paddingBottom:20}}>Download</Text>
        </View>

        <View style={{flexDirection:"column"}}>
          <TouchableOpacity >
            <MaterialCommunityIcons name="information-outline" size={52} color="#F45B69" />
          </TouchableOpacity>
          <Text style={{ fontFamily:"sans-serif-thin", fontSize:13, fontStyle:"italic", textAlign:"center", paddingBottom:20}}>Info</Text>
        </View>
      </View>
  
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


