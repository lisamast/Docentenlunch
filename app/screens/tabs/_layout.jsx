import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarLabel: () => null,
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 5,
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: () => (
                        <Ionicons name="home-outline" size={24} color="black" />
                    ),
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title: 'Add',
                    tabBarIcon: () => (
                        <Ionicons name="add-outline" size={24} color="black" />
                    ),
                }}
            />

            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: () => (
                        <Ionicons name="search-outline" size={24} color="black" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: () => (
                        <Ionicons name="person-outline" size={24} color="black" />
                    ),
                }}
            />
        </Tabs>
    );
}