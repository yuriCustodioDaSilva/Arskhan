import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';  // Importando ref e get
import firebaseApp from './FirebaseDb';

const Chamar = () => {
  const [inputFolder, setInputFolder] = useState('');
  const [inputId, setInputId] = useState('');
  const [data, setData] = useState([]);

  const handleChamarData = async () => {
    console.log(1);
    const db = getDatabase(firebaseApp);
    console.log(db);
    console.log(2);
    if (inputFolder && inputId) {
      try {
        const dataRef = ref(db, `${inputFolder}/${inputId}`);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          setData([snapshot.val()]);
        } else {
          setData([]);
          console.log('Nenhum dado encontrado para o ID especificado.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Informações</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da pasta (ex: nomes)"
        value={inputFolder}
        onChangeText={setInputFolder}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o ID"
        value={inputId}
        onChangeText={setInputId}
      />
      <Button title="Buscar" onPress={handleChamarData} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.Name}</Text>
          </View>
        )}
      />
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
  itemContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default Chamar;
