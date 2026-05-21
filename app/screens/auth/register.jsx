import { View, Text, Pressable, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: '',
        prefixes: '',
        lastname: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.firstname.trim() || !formData.lastname.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
            Alert.alert('Fout', 'Vul alle verplichte velden in');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Fout', 'Wachtwoorden komen niet overeen');
            return;
        }

        const user = {
            firstname: formData.firstname,
            prefixes: formData.prefixes,
            lastname: formData.lastname,
            password: formData.password,
        };

        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            router.replace('/screens/auth/login');
        } catch (error) {
            console.log('Register error:', error);
            Alert.alert('Fout', 'Er ging iets mis bij het registreren');
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
                <Text style={styles.cardTitle}>Registreren</Text>

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

                <TextInput
                    style={styles.textInput}
                    placeholder="Bevestig wachtwoord*"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                />

                <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Maak account</Text>
                </Pressable>

                <Pressable onPress={() => router.push('/../screens/auth/login')}>
                    <Text style={styles.loginText}>
                        Al een account? <Text style={styles.loginLink}>Login</Text>
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
        paddingTop: 45,
    },
    header: {
        alignItems: 'center',
        marginBottom: 15,
    },
    image: {
        width: 125,
        height: 125,
        resizeMode: 'contain',
        marginBottom: 5,
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
    loginText: {
        textAlign: 'center',
        marginTop: 18,
        color: '#555',
    },
    loginLink: {
        color: '#3F8F35',
        fontWeight: 'bold',
    },
});