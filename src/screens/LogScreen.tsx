import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons, Title, HelperText } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LogScreen = () => {
  const { addLog } = useApp();
  const navigation = useNavigation();
  
  const [category, setCategory] = useState<string>('Transport');
  const [description, setDescription] = useState('');
  const [carbonSaved, setCarbonSaved] = useState('');
  
  const handleSubmit = async () => {
    if (!description || !carbonSaved) {
        Alert.alert("Error", "Please fill in all fields");
        return;
    }

    const carbonValue = parseFloat(carbonSaved);
    if (isNaN(carbonValue) || carbonValue <= 0) {
        Alert.alert("Error", "Please enter a valid positive number for carbon saved");
        return;
    }

    await addLog({
      category: category as any,
      description,
      carbonSaved: carbonValue,
    });

    // Reset form
    setDescription('');
    setCarbonSaved('');
    setCategory('Transport');
    
    // Feedback and navigate back (or stay)
    Alert.alert("Success", "Activity logged!", [
        { text: "OK", onPress: () => navigation.goBack() } // goBack might not be right for a tab, usually just stay or go to dashboard
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Title style={styles.title}>Log Activity</Title>

        <Title style={styles.label}>Category</Title>
        <SegmentedButtons
          value={category}
          onValueChange={setCategory}
          buttons={[
            { value: 'Transport', label: 'Transport' },
            { value: 'Diet', label: 'Diet' },
            { value: 'Energy', label: 'Energy' },
            { value: 'Recycling', label: 'Recycle' },
          ]}
          style={styles.input}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          placeholder="e.g., Walked to work"
        />

        <TextInput
          label="Estimated Carbon Saved (kg)"
          value={carbonSaved}
          onChangeText={setCarbonSaved}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <HelperText type="info">
           Tip: 1km driving ≈ 0.2kg CO2
        </HelperText>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Save Log
        </Button>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  }
});
