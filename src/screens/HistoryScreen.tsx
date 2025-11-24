import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, IconButton, Title, Divider } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { EcoLog } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HistoryScreen = () => {
  const { logs, deleteLog } = useApp();

  const renderItem = ({ item }: { item: EcoLog }) => (
    <View>
      <List.Item
        title={`${item.category}: ${item.description}`}
        description={`${new Date(item.date).toLocaleDateString()} - Saved: ${item.carbonSaved} kg`}
        left={props => <List.Icon {...props} icon="leaf" color="green" />}
        right={props => (
          <IconButton 
            {...props} 
            icon="delete" 
            onPress={() => deleteLog(item.id)} 
          />
        )}
      />
      <Divider />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.header}>History</Title>
      <FlatList
        data={logs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Title style={styles.empty}>No logs found.</Title>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  }
});
