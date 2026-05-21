import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Add() {
  const router = useRouter();

  const [products, setProducts] = useState({
    aardbeien: false,
    slagroom: false,
    banaan: false,
    appel: false,
    komkommer: false,
  });

  const [otherProduct, setOtherProduct] = useState('');
  const [description, setDescription] = useState('');

  const toggleProduct = (name) => {
    setProducts({
      ...products,
      [name]: !products[name],
    });
  };

  const handleSubmit = async () => {
    const chosenProducts = Object.keys(products).filter((key) => products[key]);

    if (otherProduct.trim()) {
      chosenProducts.push(otherProduct);
    }

    if (chosenProducts.length === 0) {
      Alert.alert('Fout', 'Kies minimaal één product');
      return;
    }

    const savedUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(savedUser);

    const newOrder = {
      id: Date.now(),
      firstname: user.firstname,
      prefixes: user.prefixes,
      lastname: user.lastname,
      products: chosenProducts,
      description: description,
    };

    const savedOrders = await AsyncStorage.getItem('orders');
    const orders = savedOrders ? JSON.parse(savedOrders) : [];

    orders.push(newOrder);

    await AsyncStorage.setItem('orders', JSON.stringify(orders));

    router.push(`/screens/confirmation?orderId=${newOrder.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bestelling plaatsen</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Veel gekozen producten:</Text>

        <CheckBox label="Aardbeien" value={products.aardbeien} onPress={() => toggleProduct('aardbeien')} />
        <CheckBox label="Slagroom" value={products.slagroom} onPress={() => toggleProduct('slagroom')} />
        <CheckBox label="Banaan" value={products.banaan} onPress={() => toggleProduct('banaan')} />
        <CheckBox label="Appel" value={products.appel} onPress={() => toggleProduct('appel')} />
        <CheckBox label="Komkommer" value={products.komkommer} onPress={() => toggleProduct('komkommer')} />

        <TextInput
          style={styles.input}
          placeholder="Ander product"
          value={otherProduct}
          onChangeText={setOtherProduct}
        />

        <TextInput
          style={styles.input}
          placeholder="Omschrijving"
          value={description}
          onChangeText={setDescription}
        />

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Plaats bestelling</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CheckBox({ label, value, onPress }) {
  return (
    <Pressable style={styles.checkRow} onPress={onPress}>
      <View style={styles.checkBox}>
        {value && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={styles.checkText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F7F0',
    paddingTop: 70,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#234F1E',
    marginBottom: 25,
  },
  box: {
    backgroundColor: 'white',
    width: 230,
    padding: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  checkBox: {
    width: 13,
    height: 13,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#3F8F35',
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 9,
    color: '#234F1E',
    fontWeight: 'bold',
  },
  checkText: {
    fontSize: 12,
    color: '#333',
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#DADADA',
    height: 30,
    fontSize: 12,
    paddingHorizontal: 8,
    marginTop: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#3F8F35',
    padding: 10,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});