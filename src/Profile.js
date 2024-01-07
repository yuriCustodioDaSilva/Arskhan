import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, push, set, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import firebaseApp from './FirebaseDb';

const Profile = ({ navigation }) => {
  const [inputID, setInputID] = useState(0);
  const [inputName, setInputName] = useState('');
  const [inputTel, setInputTel] = useState('');
  const [inputArea, setInputArea] = useState('');
  const [inputCidade, setInputCidade] = useState('');
  const [inputMais, setInputMais] = useState('');
  const [inputDescricao, setInputDescricao] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const db = getDatabase(firebaseApp);

  useEffect(() => {
    const fetchNextUserId = async () => {
      const userRef = ref(db, 'Usuarios');
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const userIds = Object.keys(data);
          const maxId = Math.max(...userIds);
          setInputID(maxId + 1);
        } else {
          setInputID(1);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchNextUserId();
  }, []);

  const handleSendData = async () => {
    try {
      const userRef = ref(db, 'Usuarios');
      const newUserRef = push(userRef);

      const userData = {
        id: inputID,
        Name: inputName,
        tel: inputTel,
        Area: inputArea,
        Cidade: inputCidade,
        Mais: inputMais,
        Descricao: inputDescricao,
        Image: imageUri ? await convertToBase64(imageUri) : null,
      };

      await set(newUserRef, userData);

      console.log('Informação enviada com sucesso para a Realtime Database!');
      setInputID(0);
      setInputName('');
      setInputTel('');
      setInputArea('');
      setInputCidade('');
      setInputMais('');
      setInputDescricao('');
      setImageUri(null);

      alert("Dados adicionados com sucesso");

      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao enviar informação:', error);
      alert("Erro ao adicionar dados");
    }
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permissão de acesso à biblioteca de mídia negada.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      // Acesse a URI da imagem a partir do array de assets
      const selectedImage = result.assets && result.assets.length > 0 ? result.assets[0] : null;
      setImageUri(selectedImage ? selectedImage.uri : null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={inputName}
        onChangeText={(text) => setInputName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={inputTel}
        onChangeText={(text) => setInputTel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Área"
        value={inputArea}
        onChangeText={(text) => setInputArea(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={inputCidade}
        onChangeText={(text) => setInputCidade(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mais"
        value={inputMais}
        onChangeText={(text) => setInputMais(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={inputDescricao}
        onChangeText={(text) => setInputDescricao(text)}
      />
      <TouchableOpacity onPress={handleImageUpload}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSendData}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </View>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;