import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import firebaseApp from './FirebaseDb';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const auth = getAuth(firebaseApp);

    // Verificar se o email já existe
    const existingMethods = await fetchSignInMethodsForEmail(auth, email);

    if (existingMethods && existingMethods.length > 0) {
      Alert.alert('Erro de Registro', 'Este email já está em uso. Por favor, escolha outro.');
      return;
    }

    // Verificar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Erro de Registro', 'Por favor, insira um email válido no formato exemplo@gmail.com.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Registro bem-sucedido!');
        navigation.navigate('Informacoes');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Código de erro: ${errorCode}, Mensagem de erro: ${errorMessage}`);
        Alert.alert('Erro de Registro', 'Ocorreu um erro durante o registro. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie uma conta</Text>
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
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Criar Conta</Text>
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
});

export default Register;
