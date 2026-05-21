import { View, Text, Pressable, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: '',
        prefixes: '',
        lastname: '',
        password: ''
    });

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.firstname.trim() || !formData.lastname.trim() || !formData.password.trim()) {
            Alert.alert('Fout', 'Vul alle verplichte velden in');
            return;
        }

        try {
            const savedUser = await AsyncStorage.getItem('user');

            if (!savedUser) {
                Alert.alert('Fout', 'Onjuiste naam of wachtwoord');
                return;
            }

            const parsedUser = JSON.parse(savedUser);

            if (
                formData.firstname === parsedUser.firstname &&
                formData.prefixes === parsedUser.prefixes &&
                formData.lastname === parsedUser.lastname &&
                formData.password === parsedUser.password
            ) {
                router.replace('/../screens/tabs/home');
            } else {
                Alert.alert('Fout', 'Onjuiste naam of wachtwoord');
            }
        } catch (error) {
            console.error('Fout bij inloggen:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden bij het inloggen');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/images/lunch.png')}
                    style={styles.image}
                />

                <Text style={styles.title}>Docenten lunch app</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Inloggen</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Voornaam*"
                    value={formData.firstname}
                    onChangeText={(text) => handleChange('firstname', text)}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Tussenvoegsels"
                    value={formData.prefixes}
                    onChangeText={(text) => handleChange('prefixes', text)}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Achternaam*"
                    value={formData.lastname}
                    onChangeText={(text) => handleChange('lastname', text)}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Wachtwoord*"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />

                <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Inloggen</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/../screens/auth/register')}>
                    <Text style={styles.registerText}>
                        Nog geen account? <Text style={styles.registerLink}>Registreer</Text>
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F7F0',
        paddingHorizontal: 25,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
    },
    image: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#234F1E',
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 25,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#234F1E',
        textAlign: 'center',
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#DADADA',
        padding: 12,
        borderRadius: 15,
        marginBottom: 12,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#3F8F35',
        padding: 14,
        borderRadius: 15,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        textAlign: 'center',
        marginTop: 18,
        color: '#555',
    },
    registerLink: {
        color: '#3F8F35',
        fontWeight: 'bold',
    },
});