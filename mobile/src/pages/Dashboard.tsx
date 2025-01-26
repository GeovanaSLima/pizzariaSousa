import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackParamsList } from '../routes/app.routes';
import { Button } from '../components/Button';
import Footer from '../components/Footer';
import { api } from '../services/api';

export default function Dashboard() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  async function openOrder() {
    if (number.trim() === '') {
      Alert.alert('Erro', 'Por favor, informe o número da mesa.');
      return;
    }

    try {
      const response = await api.post('/order', {
        table: Number(number),
        ...(name.trim() && { name }),
      });

      navigation.navigate('Order', {
        number: number,
        order_id: response.data.id,
      });

      setNumber('');
      setName('');
    } catch (error) {
      console.error('Erro ao abrir pedido:', error);
      Alert.alert('Erro', 'Não foi possível abrir o pedido. Tente novamente.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Novo Pedido</Text>

        <TextInput
          style={styles.input}
          keyboardType={'number-pad'}
          placeholder="Número da mesa"
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          value={number}
          onChangeText={setNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome (Opcional)"
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          value={name}
          onChangeText={setName}
        />

        <Button marginTop={26} onPress={openOrder}>
          <Text style={styles.buttonText}>Abrir Mesa</Text>
        </Button>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    fontSize: 14,
    marginTop: 14,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
