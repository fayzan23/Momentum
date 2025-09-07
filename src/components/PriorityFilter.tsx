import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Priority } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

interface PriorityFilterProps {
  selectedPriority: Priority | 'all';
  onPriorityChange: (priority: Priority | 'all') => void;
}

const PriorityFilter: React.FC<PriorityFilterProps> = ({ selectedPriority, onPriorityChange }) => {
  const filterOptions = [
    { 
      key: 'all' as const, 
      label: 'All', 
      colors: ['#6B7280', '#9CA3AF'],
      icon: 'apps'
    },
    { 
      key: Priority.GOLD, 
      label: 'Gold', 
      colors: ['#8B5CF6', '#A855F7'],
      icon: 'diamond'
    },
    { 
      key: Priority.SILVER, 
      label: 'Silver', 
      colors: ['#EC4899', '#F472B6'],
      icon: 'star'
    },
    { 
      key: Priority.BRONZE, 
      label: 'Bronze', 
      colors: ['#F59E0B', '#FBBF24'],
      icon: 'medal'
    },
  ];

  return (
    <View style={styles.container}>
      {filterOptions.map((option) => {
        const isSelected = selectedPriority === option.key;
        
        return (
          <TouchableOpacity
            key={option.key}
            onPress={() => onPriorityChange(option.key)}
            style={styles.filterButton}
          >
            {isSelected ? (
              <LinearGradient
                colors={option.colors}
                style={styles.selectedButton}
              >
                <Text style={styles.selectedText}>{option.label}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.unselectedButton}>
                <Text style={styles.unselectedText}>{option.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  filterButton: {
    flex: 1,
  },
  selectedButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unselectedButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  unselectedText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PriorityFilter;
