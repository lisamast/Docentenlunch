import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Orders() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const savedOrders = await AsyncStorage.getItem('orders');
            setOrders(savedOrders ? JSON.parse(savedOrders) : []);
        };

        getOrders();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alle bestellingen bekijken</Text>

            <FlatList
                data={orders}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                    <View style={styles.orderBox}>
                        <Text style={styles.orderTitle}>
                            {item.firstname} {item.prefixes} {item.lastname}
                        </Text>

                        {item.products.map((product, productIndex) => (
                            <Text key={productIndex} style={styles.productText}>
                                • {product}
                            </Text>
                        ))}
                    </View>
                )}
            />

            <Pressable style={styles.button} onPress={() => router.push('/screens/tabs/home')}>
                <Text style={styles.buttonText}>Terug naar home</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F0',
    alignItems: 'center',
    paddingTop: 70,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#234F1E',
    marginBottom: 20,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  orderBox: {
    backgroundColor: 'white',
    width: 135,
    minHeight: 130,
    margin: 8,
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  orderTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#234F1E',
    marginBottom: 10,
    textAlign: 'center',
  },
  productText: {
    fontSize: 10,
    color: '#333',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#3F8F35',
    padding: 10,
    borderRadius: 15,
    marginBottom: 55,
    width: 140,
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});