import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { completeTask, deleteTask } from '../store/slices/taskSlice';
import { Task, Priority } from '../types';
import TaskItem from '../components/TaskItem';
import PriorityFilter from '../components/PriorityFilter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');

  const filteredTasks = tasks.filter(task => 
    selectedPriority === 'all' || task.priority === selectedPriority
  );

  const handleCompleteTask = (taskId: string) => {
    Alert.prompt(
      'Task Completed!',
      'How long did this task actually take you? (in minutes)',
      [
        {
          text: 'Skip',
          onPress: () => dispatch(completeTask({ id: taskId })),
        },
        {
          text: 'Save',
          onPress: (actualTime) => {
            const time = actualTime ? parseInt(actualTime) : undefined;
            dispatch(completeTask({ id: taskId, actualTime: time }));
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteTask(taskId)) },
      ]
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onComplete={() => handleCompleteTask(item.id)}
      onDelete={() => handleDeleteTask(item.id)}
    />
  );

  const getPriorityCount = (priority: Priority) => {
    return tasks.filter(task => task.priority === priority && !task.completed).length;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.greetingText}>Hi, User!</Text>
              <Text style={styles.welcomeText}>Welcome Back</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Search Task...</Text>
        </View>

        {/* Priority Summary Cards */}
        <View style={styles.prioritySection}>
          <Text style={styles.sectionTitle}>Priority Overview</Text>
          <View style={styles.priorityCards}>
            <LinearGradient
              colors={['#8B5CF6', '#A855F7']}
              style={styles.priorityCard}
            >
              <Text style={styles.priorityNumber}>{getPriorityCount(Priority.GOLD)}</Text>
              <Text style={styles.priorityLabel}>Gold Tasks</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#EC4899', '#F472B6']}
              style={styles.priorityCard}
            >
              <Text style={styles.priorityNumber}>{getPriorityCount(Priority.SILVER)}</Text>
              <Text style={styles.priorityLabel}>Silver Tasks</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#F59E0B', '#FBBF24']}
              style={styles.priorityCard}
            >
              <Text style={styles.priorityNumber}>{getPriorityCount(Priority.BRONZE)}</Text>
              <Text style={styles.priorityLabel}>Bronze Tasks</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Priority Filter */}
        <PriorityFilter
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
        />

        {/* Task List */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {filteredTasks.length > 0 ? (
            <FlatList
              data={filteredTasks}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="checkmark-circle-outline" size={48} color="#8B5CF6" />
              </View>
              <Text style={styles.emptyText}>No tasks yet!</Text>
              <Text style={styles.emptySubtext}>Add your first task to get started</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask' as never)}
      >
        <LinearGradient
          colors={['#8B5CF6', '#A855F7']}
          style={styles.addButtonGradient}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    color: '#9CA3AF',
  },
  prioritySection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  priorityCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  priorityCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priorityNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  priorityLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  tasksSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
