import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  id: string;
  alias: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      alias: "ShadowHacker",
      text: "مرحباً بالجميع في روم الأمن السيبراني",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: "2",
      alias: "CyberNinja",
      text: "هل هناك أحد يريد مساعدة في الكورس؟",
      timestamp: "10:32",
      isOwn: false,
    },
    {
      id: "3",
      alias: "NetSecure",
      text: "أنا هنا، لدي سؤال عن الدرس الثالث",
      timestamp: "10:35",
      isOwn: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [userAlias, setUserAlias] = useState("User");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const alias = await AsyncStorage.getItem("user_alias");
    if (alias) setUserAlias(alias);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      alias: userAlias,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`mb-3 flex-row ${item.isOwn ? "justify-end" : "justify-start"}`}
    >
      <View
        className={`max-w-xs rounded-lg p-3 ${
          item.isOwn
            ? "bg-primary"
            : "bg-surface border border-border"
        }`}
      >
        {!item.isOwn && (
          <Text className="text-primary text-xs font-semibold mb-1">
            {item.alias}
          </Text>
        )}
        <Text className={item.isOwn ? "text-background" : "text-foreground"}>
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            item.isOwn ? "text-background opacity-70" : "text-muted"
          }`}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="flex-1 bg-black" edges={["top", "left", "right", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 gap-4 p-4">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-primary">
              روم الدردشة
            </Text>
            <Text className="text-muted text-sm">
              مجتمع الأمن السيبراني
            </Text>
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
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="اكتب رسالتك..."
              placeholderTextColor="#666"
              multiline
              maxLength={500}
              className="flex-1 bg-surface border border-border rounded-lg p-3 text-foreground text-base"
              style={{ maxHeight: 100 }}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`bg-primary p-3 rounded-lg ${
                !newMessage.trim() ? "opacity-50" : "opacity-100"
              }`}
              style={{
                shadowColor: "#A020F0",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
              }}
            >
              <Text className="text-background font-bold">إرسال</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
