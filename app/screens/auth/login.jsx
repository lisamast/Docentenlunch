import { View, Text, Pressable, ImageBackground, TextInput, StyleSheet, Image, Alert } from 'react-native'
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
            Alert.alert('Fout', 'Vul alle velden in');
            console.log("vul alle velden in")
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

                <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttontext}>
                        Login
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push('/../screens/auth/register')}>
                    <Text style={styles.text2}>
                        Nog geen account? Registreer
                    </Text>
                </Pressable>
            </View>


        </View>
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
        textAlign: 'center',
        fontWeight: 'semibold',
        marginTop: 10,
    }
})