import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderConfirmation() {
    const router = useRouter();
    const { orderId } = useLocalSearchParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            const savedOrders = await AsyncStorage.getItem('orders');
            const orders = savedOrders ? JSON.parse(savedOrders) : [];

            const foundOrder = orders.find((item) => item.id.toString() === orderId);
            setOrder(foundOrder);
        };

        getOrder();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Bestelling opgeslagen</Text>

                <Text style={styles.text}>Je bestelling is opgeslagen!</Text>

                <Pressable style={styles.button} onPress={() => router.push('/screens/tabs/home')}>
                    <Text style={styles.buttonText}>Terug naar home</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F0',
    paddingTop: 70,
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    width: 230,
    padding: 22,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234F1E',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  listItem: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#555',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#3F8F35',
    padding: 10,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});