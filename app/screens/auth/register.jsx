import { View, Text, Pressable, ImageBackground, TextInput, StyleSheet, Image, Alert } from 'react-native'
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
            Alert.alert('Fout', 'Vul alle velden in');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Wachtwoorden komen niet overeen');
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
        <View style={{ flex: 1 }}>
            <View style={styles.title}>
                {<Text style={styles.text1}>Docenten lunch app</Text>}
            </View>

            <View style={styles.inputContainer}>

                <TextInput style={styles.textInput}
                    placeholder='Voornaam'
                    keyboardType="firstname"
                    required
                    value={formData.firstname}
                    onChangeText={(text) => handleChange('firstname', text)}
                />

                <TextInput style={styles.textInput}
                    placeholder='Tussenvoegsels'
                    keyboardType="prefixes"
                    value={formData.prefixes}
                    onChangeText={(text) => handleChange('prefixes', text)}
                />

                <TextInput style={styles.textInput}
                    placeholder='Achternaam'
                    keyboardType="lastname"
                    required
                    value={formData.lastname}
                    onChangeText={(text) => handleChange('lastname', text)}
                />

                <TextInput style={styles.textInput}
                    placeholder='Wachtwoord'
                    secureTextEntry
                    required
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />

                <TextInput style={styles.textInput}
                    placeholder='Bevestig wachtwoord'
                    secureTextEntry
                    required
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                />

                <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttontext}>
                        Maak account
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push('/../screens/auth/login')}>
                    <Text style={styles.text2}>
                        Al een account? Login
                    </Text>
                </Pressable>
            </View>


        </View >
    )
}
const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 80,
    },
    text1: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    textInput: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'black',
        fontFamily: 'arial',
        fontWeight: 'semibold',
        width: '80%',
        borderRadius: 25,
        marginBottom: 15,
    },
    inputContainer: {

        gap: '2%',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        flex: 1,
        paddingBottom: 50,
    },
    button: {
        gap: '2%',
        alignItems: 'center',
        width: '100%',
    },
    buttontext: {
        padding: 10,
        backgroundColor: 'black',
        color: 'white',
        width: '80%',
        fontFamily: 'arial',
        textAlign: 'center',
        borderRadius: 25,
        marginTop: 10,
    },
    text2: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'semibold',
        marginTop: 10,
    }
})