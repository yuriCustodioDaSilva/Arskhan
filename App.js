//primeira tela: Login que leva pra Register or Teste
//Register leva para Profile, Profile volta para Login
//Entrar (Login) leva para o Teste(tela dos meet)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Register';
import Profile from './src/Profile';
import Chamar from './src/Chamar';
import ChatScreen from './src/ChatScreen';
import Curriculo from './src/Curriculo';
import Informacoes from './src/Informacoes';
import Empresa from './src/Empresa';
import Login from './src/Login';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Informacoes" component={Informacoes} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Login" component={Login} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Register" component={Register} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Profile" component={Profile} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name='Chamar' component={Chamar} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="ChatScreen" component={ChatScreen} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Curriculo" component={Curriculo} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name ="Empresa" component={Empresa}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;