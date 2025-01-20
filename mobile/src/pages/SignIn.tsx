import React, { useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function SignIn() {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (email === '' || password === '') {
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash-icon.png')}
        style={styles.logo}
      />

      <Text>{user?.name}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Digite seu email...'}
          style={styles.input}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder={'Sua senha...'}
          style={styles.input}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: '95%',
    height: 50,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 14,
    color: '#FFF',
  },
  button: {
    width: '95%',
    height: 45,
    backgroundColor: '#e11138',
    borderRadius: 4,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
