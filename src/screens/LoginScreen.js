import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Styles from '../core/Styles'
import { AuthContext } from '../components/context'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function LoginScreen({ navigation }) {
  // const [email, setEmail] = useState({ value: '', error: '' });
  // const [password, setPassword] = useState({ value: '', error: '' });
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const { signIn , setInfo } = React.useContext(AuthContext);

  const loginHandle= (email,password) => {
    const emailError = emailValidator(email)
    const passwordError = passwordValidator(password)
    // console.log(emailError, passwordError);
    if (emailError || passwordError) {
      setEmailError(emailError)
      setPasswordError(passwordError)
      return
    }
      signIn(email, password);
  };


  return (
    <ScrollView>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Text style={Styles.header}>Welcome back.</Text >
      <Text style={Styles.header}>Sign in.</Text >


      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={!!emailError}
        errorText={emailError}
        // value={email.value}
        // onChangeText={(text) => setEmail({ value: text, error: '' })}
        // error={!!email.error}
        // errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={!!passwordError}
        errorText={passwordError}
        // value={password.value}
        // onChangeText={(text) => setPassword({ value: text, error: '' })}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>


      <Button mode="contained" onPress={() => {loginHandle(email, password)}}>
        Login
      </Button>
      
    </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  PasswordInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderColor: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  textInput: {
    width : '100%',
    backgroundColor: theme.colors.surface,
    fontSize: 16,
    color: theme.colors.secondary,
    paddingTop: 8,
  }
})
