import { Redirect } from 'expo-router'
import {View} from 'react-native'

export default function App() {
  return (
    <Redirect href="/screens/auth/login" />
  )
}