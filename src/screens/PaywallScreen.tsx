import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Typography } from '../constants';
import { Button } from '../components';

interface PaywallScreenProps {
  navigation: any;
}

const features = [
  'Unlimited homework scans',
  'Clear step-by-step explanations',
  'Premium history management',
];

const TERMS_URL =
  'https://openloopstudios-a11y.github.io/ParentTutor/legal/terms-of-use.html';
const PRIVACY_URL =
  'https://openloopstudios-a11y.github.io/ParentTutor/legal/privacy-policy.html';

export const PaywallScreen: React.FC<PaywallScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const openLegalUrl = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert('Unable to open link', 'Please try again later.');
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening legal link:', error);
      Alert.alert('Unable to open link', 'Please try again later.');
    }
  };

  const handleSubscribe = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('hasCompletedOnboarding', 'true'),
        AsyncStorage.setItem('isSubscribed', 'true'),
      ]);
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleClose = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleTerms = () => {
    void openLegalUrl(TERMS_URL);
  };

  const handlePrivacy = () => {
    void openLegalUrl(PRIVACY_URL);
  };

  const handleRestore = () => {
    // Restore purchases
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Ionicons name="close" size={24} color={Colors.textSecondary} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/paywall-logo.png')}
            style={styles.appIcon}
          />
          <Text style={styles.title}>ParentTutor Pro</Text>
          <Text style={styles.subtitle}>
            Help your child faster with premium teaching tools.
          </Text>
        </View>

        <View style={styles.planCard}>
          <View>
            <Text style={styles.planName}>Monthly Plan</Text>
            <Text style={styles.planPrice}>$9.99/month</Text>
          </View>
        </View>

        <View style={styles.featuresSection}>
          {features.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.disclaimerText}>Cancel anytime in settings.</Text>
      </ScrollView>

      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="Subscribe for $9.99/month"
          onPress={handleSubscribe}
        />
        <Text style={styles.footerCaption}>
          Payment will be charged to your App Store account after confirmation.
        </Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleTerms}>
            <Text style={styles.linkText}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.linkDivider}>•</Text>
          <TouchableOpacity onPress={handlePrivacy}>
            <Text style={styles.linkText}>Privacy</Text>
          </TouchableOpacity>
          <Text style={styles.linkDivider}>•</Text>
          <TouchableOpacity onPress={handleRestore}>
            <Text style={styles.linkText}>Restore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 28,
  },
  appIcon: {
    width: 88,
    height: 88,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 18,
  },
  planName: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  planPrice: {
    ...Typography.h2,
    marginTop: 4,
    color: Colors.text,
  },
  featuresSection: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: 10,
  },
  disclaimerText: {
    ...Typography.bodySmall,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 6,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerCaption: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  linkText: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  linkDivider: {
    ...Typography.caption,
    color: Colors.textLight,
    marginHorizontal: 8,
  },
});
