import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { profile } = useSelector((state: RootState) => state.user);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>
            {profile.name || 'Anonymous User'}
          </Text>
          <Text style={styles.subtitle}>
            {profile.questionsAnswered} questions answered
          </Text>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          
          {profile.workHours && (
            <View style={styles.infoItem}>
              <Ionicons name="briefcase-outline" size={20} color="#007AFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Work Hours</Text>
                <Text style={styles.infoValue}>
                  {profile.workHours.start} - {profile.workHours.end}
                </Text>
              </View>
            </View>
          )}

          {profile.hasChildren && (
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={20} color="#007AFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Children</Text>
                <Text style={styles.infoValue}>Yes</Text>
              </View>
            </View>
          )}

          {profile.childrenPickupTime && (
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#007AFF" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Pickup Time</Text>
                <Text style={styles.infoValue}>{profile.childrenPickupTime}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Voice Input</Text>
              <Text style={styles.infoValue}>
                {profile.preferences.enableVoiceInput ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="notifications-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Notifications</Text>
              <Text style={styles.infoValue}>
                {profile.preferences.enableNotifications ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Daily Questions</Text>
              <Text style={styles.infoValue}>
                {profile.preferences.dailyQuestionLimit} per day
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Answer More Questions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 2,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});

export default ProfileScreen;
