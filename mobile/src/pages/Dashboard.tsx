import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackParamsList } from '../routes/app.routes';

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [number, setNumber] = useState('');

  async function openOrder() {
    if (number === '') {
      return;
    }

    navigation.navigate('Order', {
      number: number,
      order_id: '29a9235f-ee86-43c9-a901-bc97e7d84b2a',
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/splash-icon.png')}
      />

      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        style={styles.input}
        keyboardType={'number-pad'}
        placeholder="Número da mesa"
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir Mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    bottom: 10,
    width: '40%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 55,
    borderRadius: 4,
    backgroundColor: '#101026',
    paddingHorizontal: 14,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#e11138',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
