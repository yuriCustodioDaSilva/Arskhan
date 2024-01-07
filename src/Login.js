import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from './FirebaseDb';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Login bem-sucedido!');
        navigation.navigate('Empresa');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`Código de erro: ${errorCode}, Mensagem de erro: ${errorMessage}`);        
        Alert.alert('Erro no login', 'Email ou senha inválido. Por favor, verifique suas credenciais.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arskhan</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Endereço de E-mail"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View style={styles.underline}></View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <View style={styles.underline}></View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Não tem conta? Crie aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 150,
    marginBottom: 150,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '100%',
  },
  button: {
    backgroundColor: '#026992',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 10,
    fontSize: 14,
    color: '#026992',
    textDecorationLine: 'underline',
  },
});

export default Login;
