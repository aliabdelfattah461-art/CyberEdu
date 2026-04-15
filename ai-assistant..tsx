import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, KeyboardAvoidingView, Platform } from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا مساعدك الذكي في الأمن السيبراني. كيف يمكنني مساعدتك؟',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'هذا سؤال رائع! دعني أساعدك بالمعلومات الصحيحة حول هذا الموضوع...',
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`mb-3 flex-row ${item.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <View
        className={`max-w-xs rounded-lg p-3 ${
          item.isUser
            ? 'bg-primary'
            : 'bg-surface border border-border'
        }`}
      >
        <Text className={item.isUser ? 'text-background' : 'text-foreground'}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      {/* Floating Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="absolute bottom-20 right-4 w-14 h-14 rounded-full items-center justify-center z-50"
        style={{
          backgroundColor: '#A020F0',
          shadowColor: '#A020F0',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 10,
        }}
      >
        <Text className="text-2xl">🤖</Text>
      </TouchableOpacity>

      {/* Chat Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 bg-black bg-opacity-50">
            <View className="flex-1 bg-black rounded-t-3xl mt-12 gap-4 p-4">
              {/* Header */}
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-primary">
                  مساعد الأمن السيبراني
                </Text>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Text className="text-foreground text-2xl">✕</Text>
                </TouchableOpacity>
              </View>

              {/* Messages */}
              <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 8 }}
                scrollEnabled={true}
              />

              {/* Input */}
              <View className="flex-row gap-2 items-end">
                <TextInput
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="اسأل سؤالك..."
                  placeholderTextColor="#666"
                  multiline
                  maxLength={500}
                  className="flex-1 bg-surface border border-border rounded-lg p-3 text-foreground text-base"
                  style={{ maxHeight: 100 }}
                />
                <TouchableOpacity
                  onPress={handleSendMessage}
                  disabled={loading || !inputText.trim()}
                  className={`bg-primary p-3 rounded-lg ${
                    loading || !inputText.trim() ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <Text className="text-background font-bold">إرسال</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
