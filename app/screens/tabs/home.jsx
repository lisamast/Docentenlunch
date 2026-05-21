import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [firstname, setFirstname] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setFirstname(parsedUser.firstname);
        }
      } catch (error) {
        console.error('Fout bij het ophalen van een gebruiker', error);
      }
    };

    loadUser();
  }, []);

  const handleBestelling = () => {
    router.push('/screens/tabs/add');
  };

  const handleBekijkBestellingen = () => {
    router.push('/screens/tabs/orders');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welkom {firstname}</Text>

      <Pressable onPress={handleBestelling} style={styles.button}>
        <Text style={styles.buttontext}>
          Plaats een bestelling
        </Text>
      </Pressable>

      <Pressable onPress={handleBekijkBestellingen} style={styles.button}>
        <Text style={styles.buttontext}>
          Bekijk alle bestellingen
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#234F1E',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttontext: {
    padding: 14,
    backgroundColor: '#3F8F35',
    color: 'white',
    width: '85%',
    textAlign: 'center',
    borderRadius: 18,
    marginTop: 15,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  }
});