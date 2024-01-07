import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ref, get, getDatabase, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './FirebaseDb';

const Teste = () => {
  const [empresaData, setEmpresaData] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [showAllInfo, setShowAllInfo] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const buscarProximaEmpresa = async () => {
    try {
      const db = getDatabase(firebaseApp);
      const empresasRef = ref(db, 'Empresas');
      const empresaSnapshot = await get(ref(empresasRef, String(currentId)));
  
      if (empresaSnapshot.exists()) {
        setEmpresaData(empresaSnapshot.val());
      } else {
        console.log(`Nenhuma empresa encontrada com o ID ${currentId}.`);
      }
    } catch (error) {
      console.error('Erro ao buscar informações da empresa:', error);
    }
  };

  const toggleInfoDisplay = () => {
    setShowAllInfo(!showAllInfo);
  };

  const darLike = async () => {
    try {
      if (empresaData) {
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;

        if (user) {
          const db = getDatabase(firebaseApp);
          const empresaRef = ref(db, `Empresas/${currentId}/UII`);
          await update(empresaRef, { Email: user.email });

          buscarProximaEmpresa();
        }
      }
    } catch (error) {
      console.error('Erro ao dar like à empresa:', error);
    }
  };

  useEffect(() => {
    buscarProximaEmpresa();

    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, [currentId]);

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={require('./chad.png')} style={{ width: 350, height: 500 }}
        />
      </View>
      <View style={styles.centeredContent}>
        {empresaData ? (
          <View style={styles.informacoesEmpresa}>
            <Text>Nome: {empresaData.Nome}</Text>
            {showAllInfo && (
              <>
                <Text>Email: {empresaData.Email}</Text>
                <Text>Endereço: {empresaData.Endereco}</Text>
              </>
            )}
          </View>
        ) : (
          <Text>Nenhuma informação disponível para a empresa com o ID {currentId}.</Text>
        )}
      </View>
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, styles.mostrarInfoButton]}
          onPress={toggleInfoDisplay}
        >
          <Text style={styles.textoBotao}>
            {showAllInfo ? 'Mostrar menos' : 'Mais informações'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.like]}
          onPress={darLike}
        >
          <Text style={styles.textoBotao}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.nextUser]}
          onPress={() => {
            setCurrentId(currentId + 1);
          }}
        >
          <Text style={styles.textoBotao}>Próximo</Text>
        </TouchableOpacity>
      </View>
      {userEmail && (
        <Text style={styles.userEmail}>Usuário logado: {userEmail}</Text>
      )}
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
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informacoesEmpresa: {
    alignItems: 'center',
    marginBottom: 20,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    padding: 10,
  },
  botao: {
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 50,
    marginRight: 10,
  },
  mostrarInfoButton: {
    backgroundColor: 'blue',
  },
  like: {
    backgroundColor: 'red',
  },
  nextUser: {
    backgroundColor: 'green',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  userEmail: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Teste;