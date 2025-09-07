import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/taskSlice';
import { Priority } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>(Priority.BRONZE);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority: selectedPriority,
      estimatedTime: estimatedTime ? parseInt(estimatedTime) : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    dispatch(addTask(taskData));
    navigation.goBack();
  };

  const priorityOptions = [
    { 
      key: Priority.GOLD, 
      label: 'Gold', 
      colors: ['#8B5CF6', '#A855F7'], 
      description: 'High Priority',
      icon: 'diamond'
    },
    { 
      key: Priority.SILVER, 
      label: 'Silver', 
      colors: ['#EC4899', '#F472B6'], 
      description: 'Medium Priority',
      icon: 'star'
    },
    { 
      key: Priority.BRONZE, 
      label: 'Bronze', 
      colors: ['#F59E0B', '#FBBF24'], 
      description: 'Low Priority',
      icon: 'medal'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Task Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="What needs to be done?"
            placeholderTextColor="#666"
          />
        </View>

        {/* Task Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Add more details..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Priority Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {priorityOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.priorityOption}
                onPress={() => setSelectedPriority(option.key)}
              >
                {selectedPriority === option.key ? (
                  <LinearGradient
                    colors={option.colors}
                    style={styles.selectedPriority}
                  >
                    <Ionicons name={option.icon as any} size={20} color="#fff" />
                    <View style={styles.priorityInfo}>
                      <Text style={styles.selectedPriorityText}>
                        {option.label}
                      </Text>
                      <Text style={styles.selectedPriorityDescription}>
                        {option.description}
                      </Text>
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={styles.unselectedPriority}>
                    <View style={[styles.priorityIcon, { backgroundColor: option.colors[0] + '20' }]}>
                      <Ionicons name={option.icon as any} size={20} color={option.colors[0]} />
                    </View>
                    <View style={styles.priorityInfo}>
                      <Text style={styles.priorityLabel}>
                        {option.label}
                      </Text>
                      <Text style={styles.priorityDescription}>
                        {option.description}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Estimated Time */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Estimated Time (minutes)</Text>
          <TextInput
            style={styles.input}
            value={estimatedTime}
            onChangeText={setEstimatedTime}
            placeholder="e.g., 30"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        {/* Due Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#666"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={['#8B5CF6', '#A855F7']}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>Create Task</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    color: '#1F2937',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    gap: 12,
  },
  priorityOption: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedPriority: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  unselectedPriority: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  priorityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  priorityInfo: {
    flex: 1,
  },
  priorityLabel: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedPriorityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  priorityDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 2,
  },
  selectedPriorityDescription: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    opacity: 0.9,
  },
  saveButton: {
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonGradient: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTaskScreen;
