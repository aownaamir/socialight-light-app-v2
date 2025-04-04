import { colors } from '../theme';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Pressable,
} from 'react-native';

const ContactSection=()=>{

    const handleEmailPress = () => {
        Linking.openURL('mailto:info@socialight.vip');
      };
    
      const handleWebsitePress = () => {
        Linking.openURL('https://www.socialight.vip');
      };

    return (<View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Contact us</Text>
                <View style={styles.contactCardContainer}>
                  <View intensity={60} tint="dark" style={styles.contactCard}>
                    <View style={styles.contactContent}>
                      <View style={styles.logoSide}>
                        {/* Replace with your logo image */}
                        <Image
                          source={require('../../assets/images/logo-text.png')}
                          style={styles.contactLogo}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Contact information</Text>
                        
                        <Pressable onPress={handleEmailPress}>
                          <Text style={styles.contactText}>info@socialight.vip</Text>
                        </Pressable>
                        
                        <Pressable onPress={handleWebsitePress}>
                          <Text style={styles.contactText}>www.socialight.vip</Text>
                        </Pressable>
                        
                        <Text style={styles.contactText}>Athens, Greece</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.tagline}>Unlock Exclusive Experiences with Socialight</Text>
              </View>)
}

const styles=StyleSheet.create({
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: '600',
      },
      contactSection: {
        paddingHorizontal: 20,
        marginBottom: 0,
      },
      contactCardContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.24)'
        
      },
      contactCard: {
        padding: 15,
        // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fallback in case BlurView doesn't work
      },
      contactContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      logoSide: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      },
      contactLogo: {
        width: '100%',
        height: '100%',
      },
      contactInfo: {
        flex: 1,
      },
      contactLabel: {
        color: colors.textPrimary,
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5,
      },
      contactText: {
        color: colors.textSecondary,
        fontSize: 13,
        marginBottom: 3,
      },
      tagline: {
        color: colors.textSecondary,
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 25,
        textAlign: 'center',
      },
})

export default ContactSection;