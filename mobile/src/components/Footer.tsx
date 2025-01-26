import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/splash-icon.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#1d1d2e',
  },
  logo: {
    width: '40%',
    resizeMode: 'contain',
  },
});
