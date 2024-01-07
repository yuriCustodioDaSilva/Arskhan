import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  const sendMsg = () => {
    if (message.trim() !== '') {
      const newMessage = { id: new Date().getTime(), type: 'send', text: message };
      setMessages([...messages, newMessage]);
      setMessage('');
      // Role a `ScrollView` para a parte inferior após o envio de uma mensagem
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((item, index) => (
          <ChatItem key={item.id} item={item} />
        ))}
      </ScrollView>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          value={message}
          placeholder="Type your message"
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMsg} disabled={message.length === 0} />
      </View>
    </View>
  );
};

const ChatItem = ({ item }) => (
  <View style={[styles.chatItemCommon, item.type === 'send' ? styles.send : styles.receive]}>
    <Text style={styles.msgtxt}>{item.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 60, // Margem inferior para rolagem automática funcionar
  },
  bottom: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  chatItemCommon: {
    marginBottom: 10, // Espaçamento entre mensagens
    maxWidth: '75%',
  },
  send: {
    alignSelf: 'flex-end',
  },
  receive: {
    alignSelf: 'flex-start',
  },
  msgtxt: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
});

export default ChatScreen;
