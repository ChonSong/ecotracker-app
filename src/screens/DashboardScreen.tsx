import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useApp } from '../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DashboardScreen = () => {
  const { logs } = useApp();
  const theme = useTheme();

  const totalCarbonSaved = logs.reduce((sum, log) => sum + log.carbonSaved, 0);

  // Group logs by date (last 7 days)
  const getLast7DaysData = () => {
    const today = new Date();
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      
      labels.push(dayLabel);

      const dayTotal = logs
        .filter(log => log.date.startsWith(dateStr))
        .reduce((sum, log) => sum + log.carbonSaved, 0);
      
      data.push(dayTotal);
    }
    return { labels, data };
  };

  const chartData = getLast7DaysData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Title style={styles.header}>Eco Impact Dashboard</Title>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Total Carbon Saved</Title>
            <Paragraph style={styles.bigNumber}>{totalCarbonSaved.toFixed(1)} kg</Paragraph>
          </Card.Content>
        </Card>

        <Title style={styles.subHeader}>Activity (Last 7 Days)</Title>
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{ data: chartData.data }]
          }}
          width={Dimensions.get('window').width - 32} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1} 
          chartConfig={{
            backgroundColor: theme.colors.background,
            backgroundGradientFrom: theme.colors.surface,
            backgroundGradientTo: theme.colors.surface,
            decimalPlaces: 1, 
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />

        <Card style={styles.card}>
            <Card.Content>
                <Title>Recent Activity</Title>
                {logs.slice(0, 3).map(log => (
                    <View key={log.id} style={styles.recentItem}>
                        <Text style={{fontWeight: 'bold'}}>{log.category}</Text>
                        <Text>{log.carbonSaved} kg - {new Date(log.date).toLocaleDateString()}</Text>
                    </View>
                ))}
                {logs.length === 0 && <Text>No activities logged yet.</Text>}
            </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
  bigNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32', // green
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
});
