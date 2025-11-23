import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const paperSettings = {
  icon: (props: any) => <MaterialCommunityIcons {...props} />,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider settings={paperSettings}>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
