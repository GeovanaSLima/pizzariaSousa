import React from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { ActivityIndicator, View } from 'react-native';

function Routes() {
  const isAuthenticated = false;
  const isLoading = false;

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1d1d2e',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={50} color="#e11138" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
