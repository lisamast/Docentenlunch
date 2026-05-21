import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [lastOrder, setLastOrder] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const savedUser = await AsyncStorage.getItem('user');
            const savedOrders = await AsyncStorage.getItem('orders');

            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }

            if (savedOrders) {
                const orders = JSON.parse(savedOrders);
                if (orders.length > 0) {
                    setLastOrder(orders[orders.length - 1]);
                }
            }
        };

        getData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {user ? `${user.firstname} ${user.prefixes} ${user.lastname}` : '[Naam docent]'}
            </Text>

            <View style={styles.box}>
                {lastOrder ? (
                    <>
                        <Text style={styles.title}>Jouw bestelling</Text>
                        <Text style={styles.text}>De producten die je vandaag besteld hebt:</Text>

                        {lastOrder.products.map((product, index) => (
                            <Text key={index} style={styles.product}>
                                • {product}
                            </Text>
                        ))}
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Nog niks besteld</Text>
                        <Text style={styles.text}>Je hebt vandaag nog geen bestelling geplaatst.</Text>
                    </>
                )}

                <Pressable style={styles.button} onPress={() => router.push('/screens/tabs/home')}>
                    <Text style={styles.buttonText}>Terug naar home</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => router.push('/screens/tabs/place-order')}>
                    <Text style={styles.buttonText}>Plaats bestelling</Text>
                </Pressable>

                {lastOrder && (
                    <Pressable style={styles.button} onPress={() => router.push('/screens/tabs/orders')}>
                        <Text style={styles.buttonText}>Alle bestellingen bekijken</Text>
                    </Pressable>
                )}
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
  name: {
    width: 230,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#234F1E',
    marginBottom: 20,
  },
  box: {
    width: 230,
    backgroundColor: 'white',
    padding: 22,
    alignItems: 'center',
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
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 11,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  product: {
    fontSize: 11,
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#3F8F35',
    padding: 9,
    marginTop: 9,
    width: 150,
    borderRadius: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});