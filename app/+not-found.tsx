import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: true }} />
      <View style={styles.container}>
        <Text style={styles.title}>MobiSplit Navigation Redirection</Text>
        <Text style={styles.subtitle}>The requested view pattern could not be compiled locally.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Safe Authentication Engine</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0F172A', // Forced clean slate dark base fallback
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: '#000000',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
  },
});