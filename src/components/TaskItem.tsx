import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Task, Priority } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface TaskItemProps {
  task: Task;
  onComplete: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const getPriorityColors = (priority: Priority) => {
    switch (priority) {
      case Priority.GOLD:
        return ['#8B5CF6', '#A855F7'];
      case Priority.SILVER:
        return ['#EC4899', '#F472B6'];
      case Priority.BRONZE:
        return ['#F59E0B', '#FBBF24'];
      default:
        return ['#6B7280', '#9CA3AF'];
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case Priority.GOLD:
        return 'diamond';
      case Priority.SILVER:
        return 'star';
      case Priority.BRONZE:
        return 'medal';
      default:
        return 'ellipse';
    }
  };

  const formatTime = (minutes?: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      {/* Priority Indicator */}
      <LinearGradient
        colors={getPriorityColors(task.priority)}
        style={styles.priorityIndicator}
      >
        <Ionicons name={getPriorityIcon(task.priority) as any} size={16} color="#fff" />
      </LinearGradient>

      {/* Task Content */}
      <View style={styles.content}>
        <View style={styles.taskHeader}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={onComplete}
            disabled={task.completed}
          >
            {task.completed ? (
              <View style={styles.completedCheck}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
            ) : (
              <View style={styles.incompleteCheck} />
            )}
          </TouchableOpacity>
        </View>
        
        {task.description && (
          <Text style={[styles.description, task.completed && styles.completedDescription]}>
            {task.description}
          </Text>
        )}
        
        {/* Task Meta Info */}
        <View style={styles.metaInfo}>
          {task.estimatedTime && (
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#8B5CF6" />
              <Text style={styles.metaText}>
                Est: {formatTime(task.estimatedTime)}
              </Text>
            </View>
          )}
          {task.actualTime && (
            <View style={styles.metaItem}>
              <Ionicons name="checkmark-circle-outline" size={14} color="#10B981" />
              <Text style={styles.metaText}>
                Actual: {formatTime(task.actualTime)}
              </Text>
            </View>
          )}
          {task.dueDate && (
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#8B5CF6" />
              <Text style={styles.metaText}>
                Due: {formatDate(task.dueDate)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  priorityIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  completeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incompleteCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  description: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  completedDescription: {
    opacity: 0.6,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default TaskItem;
