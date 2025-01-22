import React, { ReactNode, useContext, useState } from 'react';
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

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/splash-icon.png')}
      />

      {children}
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
